import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";

interface UseScrollSelectionProps {
  list: React.ReactNode[];
  itemHeight?: number;
  initialSelected?: React.ReactNode;
  onSelectedChange?: (selected: React.ReactNode) => void;
}

const useScrollSelection = ({
  list,
  itemHeight,
  initialSelected,
  onSelectedChange,
}: UseScrollSelectionProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [measuredItemHeight, setMeasuredItemHeight] = useState(
    itemHeight || 50
  );
  const scrollRef = useRef<HTMLUListElement>(null);
  const itemRef = useRef<HTMLLIElement>(null);

  useLayoutEffect(() => {
    if (initialSelected && scrollRef.current) {
      const index = list.findIndex((item) =>
        React.isValidElement(item) && React.isValidElement(initialSelected)
          ? item.key === initialSelected.key ||
            item.props.children === initialSelected.props.children
          : item === initialSelected
      );

      if (index !== -1) {
        setSelectedIndex(index);
        scrollRef.current.scrollTop = index * measuredItemHeight;
      }
    }
  }, [initialSelected, measuredItemHeight, list]);

  useEffect(() => {
    if (itemRef.current && !itemHeight) {
      setMeasuredItemHeight(itemRef.current.clientHeight);
    }
  }, [itemHeight]);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop;
      const index = Math.round(scrollTop / measuredItemHeight);
      console.log("Scroll top:", scrollTop);
      console.log("Measured item height:", measuredItemHeight);
      console.log("Calculated index:", index);

      if (index >= 0 && index < list.length && index !== selectedIndex) {
        setSelectedIndex(index);
        onSelectedChange?.(list[index]);
      }
    }
  }, [selectedIndex, measuredItemHeight, list, onSelectedChange]);

  return {
    selectedIndex,
    scrollRef,
    handleScroll,
    itemRef, // ref를 반환하여 각 ListItem에 적용
  };
};

export default useScrollSelection;
