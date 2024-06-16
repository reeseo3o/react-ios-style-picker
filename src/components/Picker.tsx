import { CSSProperties } from "react";
import List from "./List";
import ListItem from "./ListItem";
import ListCenter from "./ListCenter";
import useScrollSelection from "../hooks/useScrollSelection";

interface ScrollPickerProps {
  list: (string | number)[];
  itemHeight?: number;
  initialSelected?: string | number;
  onSelectedChange?: (selected: string | number) => void;
  className?: string;
  itemClassName?: string;
  itemStyle?: CSSProperties;
}

const Picker: React.FC<ScrollPickerProps> = ({
  list,
  itemHeight = 50,
  initialSelected,
  onSelectedChange,
  className,
  itemClassName,
  itemStyle,
}: ScrollPickerProps) => {
  const { selectedIndex, scrollRef, handleScroll } = useScrollSelection({
    list,
    itemHeight,
    initialSelected,
    onSelectedChange,
  });

  return (
    <List
      ref={scrollRef}
      onScroll={handleScroll}
      className={className}
      itemStyle={itemStyle}
    >
      <ListCenter />
      {list.map((item, index) => (
        <ListItem
          key={index}
          isSelected={index === selectedIndex}
          className={`${itemClassName} ${index === selectedIndex ? "selected" : ""}`}
        >
          {item}
        </ListItem>
      ))}
    </List>
  );
};

export default Picker;
