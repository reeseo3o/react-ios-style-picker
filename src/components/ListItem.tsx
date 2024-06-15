import { forwardRef } from "react";
import "../styles/ListItem.css";

interface ListItemProps {
  children: React.ReactNode;
  isSelected: boolean;
  className?: string;
}

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, isSelected, className }, ref) => (
    <li
      ref={ref}
      className={`list-item ${className} ${isSelected ? "selected" : ""}`}
    >
      {children}
    </li>
  )
);

ListItem.displayName = "ListItem";

export default ListItem;
