"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import List from "./components/List";
import ListItem from "./components/ListItem";
import ListCenter from "./components/ListCenter";
import "./styles/index.css";

interface ScrollPickerProps {
  list: (string | number)[];
  itemHeight?: number;
  onSelectedChange?: (selected: string | number) => void;
  initialSelected?: string | number;
  className?: string;
  itemClassName?: string;
}

const Picker = ({
  list,
  onSelectedChange,
  initialSelected,
  itemHeight = 50,
  className,
  itemClassName,
}: ScrollPickerProps) => {
  const SCROLL_DEBOUNCE_TIME = 100;
  const newList = ["", ...list, ""];
  const ref = useRef<HTMLUListElement>(null);
  const initialIndex =
    initialSelected !== undefined ? newList.indexOf(initialSelected) : -1;
  const [selected, setSelected] = useState(
    initialIndex !== -1 ? initialIndex : 1
  );
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const ITEM_HEIGHT = itemHeight;

  const handleScroll = useCallback(() => {
    if (ref.current) {
      clearTimeout(timerRef.current!);

      if (ref.current.scrollTop < ITEM_HEIGHT) {
        ref.current.scrollTop = ITEM_HEIGHT;
      }

      timerRef.current = setTimeout(() => {
        const index = Math.floor(
          (ref.current!.scrollTop + ITEM_HEIGHT / 2) / ITEM_HEIGHT
        );

        if (newList[index] !== "") {
          setSelected(index);
          onSelectedChange && onSelectedChange(newList[index]);
        }
      }, SCROLL_DEBOUNCE_TIME);
    }
  }, [onSelectedChange, newList, ITEM_HEIGHT]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = selected * ITEM_HEIGHT;
    }
  }, [selected, ITEM_HEIGHT]);

  useEffect(() => {
    if (ref.current && initialIndex !== -1) {
      ref.current.scrollTop = initialIndex * ITEM_HEIGHT;
    }
  }, [initialIndex, ITEM_HEIGHT]);

  return (
    <List ref={ref} onScroll={handleScroll} className={className}>
      <ListCenter />
      {newList.map((item, index) => (
        <ListItem
          key={index}
          isSelected={index === selected}
          ref={(el) => (itemRefs.current[index] = el)}
          className={`${itemClassName} ${index === selected ? "selected" : ""}`}
        >
          {item}
        </ListItem>
      ))}
    </List>
  );
};

export default Picker;
