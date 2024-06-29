import React from "react";
interface UseScrollSelectionProps {
    list: React.ReactNode[];
    itemHeight?: number;
    initialSelected?: React.ReactNode;
    onSelectedChange?: (selected: React.ReactNode) => void;
}
declare const useScrollSelection: ({ list, itemHeight, initialSelected, onSelectedChange, }: UseScrollSelectionProps) => {
    selectedIndex: number;
    scrollRef: React.RefObject<HTMLUListElement>;
    handleScroll: () => void;
    itemRef: React.RefObject<HTMLLIElement>;
};
export default useScrollSelection;
