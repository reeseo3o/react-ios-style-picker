import { forwardRef } from "react";
import { CSSProperties } from "react";
import "../styles/List.css";

interface ListProps {
  children: React.ReactNode;
  onScroll: () => void;
  itemStyle?: CSSProperties;
  itemClassName?: string;
}

const List = forwardRef<HTMLUListElement, ListProps>(
  ({ children, onScroll, itemStyle }, ref) => {
    return (
      <ul ref={ref} onScroll={onScroll} className="list" style={itemStyle}>
        {children}
      </ul>
    );
  }
);

List.displayName = "List";

export default List;
