import List from "./List";
import ListItem from "./ListItem";
import ListCenter from "./ListCenter";
import useScrollSelection from "../hooks/useScrollSelection";

interface ScrollPickerProps {
  list: (string | number)[];
  itemHeight?: number;
  initialSelected?: string | number;
  onSelectedChange?: (selected: string | number) => void;
  itemClassName?: string;
  itemStyle?: { [key: string]: string };
}

const Picker: React.FC<ScrollPickerProps> = ({
  list,
  itemHeight = 50,
  initialSelected,
  onSelectedChange,
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
    <List ref={scrollRef} onScroll={handleScroll} itemStyle={itemStyle}>
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
