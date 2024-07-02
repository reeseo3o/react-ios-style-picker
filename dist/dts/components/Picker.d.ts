import React from "react";
interface PickerProps {
    list: React.ReactNode[];
    initialSelected?: React.ReactNode;
    onSelectedChange?: (selected: React.ReactNode) => void;
}
declare const Picker: React.FC<PickerProps>;
export default Picker;
