import { forwardRef, HTMLAttributes } from "react";
import { CSSProperties } from "react";
import "../styles/List.css";

interface ListProps extends Omit<HTMLAttributes<HTMLUListElement>, 'onScroll'> {
  children: React.ReactNode;
  onScroll: () => void;
  itemStyle?: CSSProperties;
  itemClassName?: string;
  className?: string;
  showGradientMask?: boolean;
  "data-theme"?: "light" | "dark";
}

const List = forwardRef<HTMLUListElement, ListProps>(
  ({ children, onScroll, itemStyle, className, showGradientMask = true, "data-theme": dataTheme, ...rest }, ref) => {
    return (
      <ul 
        ref={ref} 
        onScroll={onScroll} 
        className={`list ${className || ""}`.trim()} 
        style={itemStyle}
        data-gradient-mask={showGradientMask}
        data-theme={dataTheme}
        {...rest}
      >
        {children}
      </ul>
    );
  }
);

List.displayName = "List";

export default List;
