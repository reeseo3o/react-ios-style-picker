import { useEffect, useLayoutEffect, useRef, useState } from "react";

type UseScrollSelectionProps = {
  list: React.ReactNode[];
  initialSelected: React.ReactNode;
  onSelectedChange: (selected: React.ReactNode) => void;
};

const useScrollSelection = ({
  list,
  initialSelected,
  onSelectedChange,
}: UseScrollSelectionProps) => {
  const [selectedIndex, setSelectedIndex] = useState(() =>
    list.indexOf(initialSelected)
  );
  const [itemHeight, setItemHeight] = useState(50);
  const scrollRef = useRef<HTMLUListElement>(null);
  const itemRef = useRef<HTMLLIElement>(null);

  useLayoutEffect(() => {
    if (itemRef.current) {
      setItemHeight(itemRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = selectedIndex * itemHeight;
    }
  }, [selectedIndex, itemHeight]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.floor(scrollRef.current.scrollTop / itemHeight);
      setSelectedIndex(index);
      onSelectedChange(list[index]);
    }
  };

  return {
    selectedIndex,
    scrollRef,
    handleScroll,
    itemRef,
  };
};

export default useScrollSelection;
