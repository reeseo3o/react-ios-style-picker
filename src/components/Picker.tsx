import React from "react";
import List from "./List";
import ListItem from "./ListItem";
import ListCenter from "./ListCenter";
import useScrollSelection from "../hooks/useScrollSelection";
interface ScrollPickerProps {
  list: React.ReactNode[];
  itemHeight?: number;
  initialSelected?: React.ReactNode;
  onSelectedChange?: (selected: React.ReactNode) => void;
}
const Picker: React.FC<ScrollPickerProps> = ({
  list,
  itemHeight,
  initialSelected,
  onSelectedChange,
}: ScrollPickerProps) => {
  const { selectedIndex, scrollRef, handleScroll, itemRef } =
    useScrollSelection({
      list,
      itemHeight,
      initialSelected,
      onSelectedChange,
    });

  return (
    <List ref={scrollRef} onScroll={handleScroll}>
      <ListCenter />
      {list.map((item, index) => (
        <ListItem
          key={index}
          ref={index === 0 ? itemRef : null} // 첫 번째 아이템의 높이를 측정
          isSelected={index === selectedIndex}
        >
          {item}
        </ListItem>
      ))}
    </List>
  );
};

export default Picker;
