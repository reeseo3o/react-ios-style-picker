/// <reference types="react" />
import React$1 from 'react';

interface PickerProps {
    list: React$1.ReactNode[];
    initialSelected?: React$1.ReactNode;
    onSelectedChange?: (selected: React$1.ReactNode) => void;
}
declare const Picker: React$1.FC<PickerProps>;

interface BottomSheetProps {
    children: React.ReactNode | React.ReactNode[];
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    style?: React.CSSProperties;
    button?: React.ReactNode;
}
declare const BottomSheet: React.FC<BottomSheetProps>;

export { BottomSheet, Picker };
