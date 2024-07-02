import React from "react";
import List from "./List";
import ListItem from "./ListItem";
import ListCenter from "./ListCenter";
import useScrollSelection from "../hooks/useScrollSelection";
interface PickerProps {
  list: React.ReactNode[];
  initialSelected?: React.ReactNode;
  onSelectedChange?: (selected: React.ReactNode) => void;
}

const Picker: React.FC<PickerProps> = ({
  list,
  initialSelected,
  onSelectedChange = () => {},
}) => {
  const { selectedIndex, scrollRef, handleScroll, itemRef } =
    useScrollSelection({
      list,
      initialSelected,
      onSelectedChange,
    });

  return (
    <List ref={scrollRef} onScroll={handleScroll}>
      <ListCenter />
      {list.map((item, index) => (
        <ListItem
          key={index}
          ref={index === 0 ? itemRef : null}
          isSelected={index === selectedIndex}
        >
          {item}
        </ListItem>
      ))}
    </List>
  );
};

export default Picker;
