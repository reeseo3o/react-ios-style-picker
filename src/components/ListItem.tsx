import { forwardRef, HTMLAttributes } from "react";
import "../styles/ListItem.css";

interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  isSelected: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, isSelected, className = "", style, ...rest }, ref) => (
    <li
      ref={ref}
      className={`list-item ${className} ${isSelected ? "selected" : ""}`.trim()}
      style={style}
      {...rest}
    >
      {children}
    </li>
  )
);

ListItem.displayName = "ListItem";

export default ListItem;
