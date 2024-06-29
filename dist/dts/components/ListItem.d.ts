/// <reference types="react" />
import "../styles/ListItem.css";
interface ListItemProps {
    children: React.ReactNode;
    isSelected: boolean;
}
declare const ListItem: import("react").ForwardRefExoticComponent<ListItemProps & import("react").RefAttributes<HTMLLIElement>>;
export default ListItem;
