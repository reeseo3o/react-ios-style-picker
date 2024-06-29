import { CSSProperties } from "react";
import "../styles/List.css";
interface ListProps {
    children: React.ReactNode;
    onScroll: () => void;
    itemStyle?: CSSProperties;
    itemClassName?: string;
}
declare const List: import("react").ForwardRefExoticComponent<ListProps & import("react").RefAttributes<HTMLUListElement>>;
export default List;
