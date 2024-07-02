/// <reference types="react" />
type UseScrollSelectionProps = {
    list: React.ReactNode[];
    initialSelected: React.ReactNode;
    onSelectedChange: (selected: React.ReactNode) => void;
};
declare const useScrollSelection: ({ list, initialSelected, onSelectedChange, }: UseScrollSelectionProps) => {
    selectedIndex: number;
    scrollRef: import("react").RefObject<HTMLUListElement>;
    handleScroll: () => void;
    itemRef: import("react").RefObject<HTMLLIElement>;
};
export default useScrollSelection;
