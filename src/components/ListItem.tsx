import { forwardRef } from "react";
import "../styles/ListItem.css";

interface ListItemProps {
  children: React.ReactNode;
  isSelected: boolean;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  role?: string;
  "aria-selected"?: boolean;
}

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, isSelected, className = "", style, id, role, "aria-selected": ariaSelected }, ref) => (
    <li
      ref={ref}
      id={id}
      role={role}
      aria-selected={ariaSelected}
      className={`list-item ${className} ${isSelected ? "selected" : ""}`.trim()}
      style={style}
    >
      {children}
    </li>
  )
);

ListItem.displayName = "ListItem";

export default ListItem;
