import { forwardRef } from "react";
import "../styles/List.css";

interface ListProps {
  children: React.ReactNode;
  onScroll: () => void;
  className?: string;
}

const List = forwardRef<HTMLUListElement, ListProps>(
  ({ children, onScroll, className }, ref) => {
    return (
      <ul ref={ref} onScroll={onScroll} className={`list ${className}`}>
        {children}
      </ul>
    );
  }
);

List.displayName = "List";

export default List;
