import { forwardRef } from "react";
import { CSSProperties } from "react";
import "../styles/List.css";

interface ListProps {
  children: React.ReactNode;
  onScroll: () => void;
  itemStyle?: CSSProperties;
  className?: string;
  showGradientMask?: boolean;
  "data-theme"?: "light" | "dark";
  role?: string;
  "aria-label"?: string;
  "aria-activedescendant"?: string;
}

const List = forwardRef<HTMLUListElement, ListProps>(
  ({ children, onScroll, itemStyle, className, showGradientMask = true, "data-theme": dataTheme, role, "aria-label": ariaLabel, "aria-activedescendant": ariaActiveDescendant }, ref) => {
    return (
      <ul 
        ref={ref} 
        onScroll={onScroll} 
        className={`list ${className || ""}`.trim()} 
        style={itemStyle}
        data-gradient-mask={showGradientMask}
        data-theme={dataTheme}
        role={role}
        aria-label={ariaLabel}
        aria-activedescendant={ariaActiveDescendant}
      >
        {children}
      </ul>
    );
  }
);

List.displayName = "List";

export default List;
