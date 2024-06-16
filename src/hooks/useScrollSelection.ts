import { useRef, useState, useCallback, useEffect } from "react";

interface UseScrollSelectionProps {
  list: (string | number)[];
  itemHeight: number;
  initialSelected?: string | number;
  onSelectedChange?: (selected: string | number) => void;
}

function useScrollSelection({
  list,
  itemHeight,
  initialSelected,
  onSelectedChange,
}: UseScrollSelectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const scrollRef = useRef<HTMLUListElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      clearTimeout(timerRef.current!);
      timerRef.current = setTimeout(() => {
        const newSelectedIndex = Math.floor(
          (scrollRef.current!.scrollTop + itemHeight / 2) / itemHeight
        );
        if (
          selectedIndex !== newSelectedIndex &&
          list[newSelectedIndex] !== ""
        ) {
          setSelectedIndex(newSelectedIndex);
          onSelectedChange?.(list[newSelectedIndex]);
        }
      }, 100); // 100ms 간격으로 스크롤 이벤트를 체크
    }
  }, [itemHeight, selectedIndex, list, onSelectedChange]);

  useEffect(() => {
    const initialIndex =
      initialSelected !== undefined ? list.indexOf(initialSelected) : 1;
    setSelectedIndex(initialIndex);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = initialIndex * itemHeight;
    }
  }, [initialSelected, itemHeight, list]);

  return { selectedIndex, scrollRef, handleScroll };
}

export default useScrollSelection;
