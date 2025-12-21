import { useState, useCallback, useEffect, useMemo } from "react";
import List from "./List";
import ListItem from "./ListItem";
import ListCenter from "./ListCenter";
import useScrollSelection from "../hooks/useScrollSelection";

export interface ScrollPickerProps {
  list: (string | number)[];
  itemHeight?: number;
  initialSelected?: string | number;
  onSelectedChange?: (selected: string | number) => void;
  itemClassName?: string;
  itemStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
  listClassName?: string;
  listStyle?: React.CSSProperties;
  showGradientMask?: boolean;
  showCenterIndicator?: boolean;
  theme?: "light" | "dark" | "auto";
}

const Picker: React.FC<ScrollPickerProps> = ({
  list,
  itemHeight = 50,
  initialSelected,
  onSelectedChange,
  itemClassName,
  itemStyle,
  className,
  style,
  listClassName,
  listStyle,
  showGradientMask = true,
  showCenterIndicator = true,
  theme = "auto",
}: ScrollPickerProps) => {
  const { selectedIndex, scrollRef, handleScroll } = useScrollSelection({
    list,
    itemHeight,
    initialSelected,
    onSelectedChange,
  });

  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    if (scrollRef.current) {
      setScrollTop(scrollRef.current.scrollTop);
    }
  }, [scrollRef]);

  const handleScrollWithPosition = useCallback(() => {
    if (scrollRef.current) {
      setScrollTop(scrollRef.current.scrollTop);
    }
    handleScroll();
  }, [handleScroll]);

  // Memoize computed style values to avoid repeated getComputedStyle calls
  const listDimensions = useMemo(() => {
    if (!scrollRef.current) return null;
    const listHeight = scrollRef.current.clientHeight;
    const paddingTop = parseFloat(getComputedStyle(scrollRef.current).paddingTop) || 0;
    const centerY = listHeight / 2;
    return { listHeight, paddingTop, centerY };
  }, [scrollRef.current?.clientHeight, scrollTop]);

  const getItemOpacity = useCallback((index: number) => {
    if (!scrollRef.current) {
      const distance = Math.abs(index - selectedIndex);
      if (distance === 0) return 1;
      if (distance === 1) return 0.4;
      return 0.2;
    }

    const dims = listDimensions;
    if (!dims) {
      const distance = Math.abs(index - selectedIndex);
      if (distance === 0) return 1;
      if (distance === 1) return 0.4;
      return 0.2;
    }

    const { centerY, paddingTop } = dims;
    const currentScrollTop = scrollRef.current.scrollTop || scrollTop;
    
    const itemTop = index * itemHeight + paddingTop;
    const itemCenterY = itemTop + itemHeight / 2;
    
    const viewportCenterY = currentScrollTop + centerY;
    
    const distanceFromCenter = Math.abs(itemCenterY - viewportCenterY);
    
    if (index === selectedIndex) {
      return 1;
    }
    
    if (distanceFromCenter < itemHeight * 0.3) {
      return 1;
    } else if (distanceFromCenter < itemHeight * 0.8) {
      return 0.8;
    } else if (distanceFromCenter < itemHeight * 1.3) {
      return 0.5;
    } else if (distanceFromCenter < itemHeight * 2) {
      return 0.3;
    } else {
      return 0.2;
    }
  }, [scrollRef, selectedIndex, scrollTop, itemHeight, listDimensions]);

  // List 높이를 itemHeight에 맞춰 계산 (항상 3개 항목이 보이도록)
  const listHeight = itemHeight * 3;
  // 첫 번째와 마지막 항목도 중앙에 올 수 있도록 상하 패딩 추가
  const paddingTop = listHeight / 2 - itemHeight / 2;
  const paddingBottom = listHeight / 2 - itemHeight / 2;

  // 테마에 따른 data-theme 속성 설정
  const themeAttr = theme !== "auto" ? { "data-theme": theme } : {};

  return (
    <div className={className} style={{ ...style, position: 'relative', height: `${listHeight}px`, minHeight: `${listHeight}px`, flexShrink: 0 }}>
      {showCenterIndicator && <ListCenter itemHeight={itemHeight} />}
      <List 
        ref={scrollRef} 
        onScroll={handleScrollWithPosition} 
        className={listClassName}
        itemStyle={{ 
          ...listStyle,
          height: `${listHeight}px`,
          paddingTop: `${paddingTop}px`,
          paddingBottom: `${paddingBottom}px`
        }}
        showGradientMask={showGradientMask}
        role="listbox"
        aria-label="Picker options"
        aria-activedescendant={`picker-option-${selectedIndex}`}
        {...themeAttr}
      >
        {list.map((item, index) => {
          const opacity = getItemOpacity(index);
          return (
            <ListItem
              key={`${item}-${index}`}
              id={`picker-option-${index}`}
              role="option"
              aria-selected={index === selectedIndex}
              isSelected={index === selectedIndex}
              className={`${itemClassName || ""} ${index === selectedIndex ? "selected" : ""}`.trim()}
              style={{ 
                height: `${itemHeight}px`,
                opacity,
                ...itemStyle, 
              }}
            >
              {item}
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Picker;
