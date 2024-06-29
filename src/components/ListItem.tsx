import { forwardRef } from "react";
import "../styles/ListItem.css";

interface ListItemProps {
  children: React.ReactNode;
  isSelected: boolean;
}

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, isSelected }, ref) => (
    <li ref={ref} className={`list-item ${isSelected ? "selected" : ""}`}>
      {children}
    </li>
  )
);

ListItem.displayName = "ListItem";

export default ListItem;
