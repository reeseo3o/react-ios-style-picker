import React from "react";
interface ScrollPickerProps {
    list: React.ReactNode[];
    itemHeight?: number;
    initialSelected?: React.ReactNode;
    onSelectedChange?: (selected: React.ReactNode) => void;
}
declare const Picker: React.FC<ScrollPickerProps>;
export default Picker;
