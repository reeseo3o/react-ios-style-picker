/// <reference types="react" />
import "../styles/BottomSheet.css";
interface BottomSheetProps {
    children: React.ReactNode | React.ReactNode[];
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    style?: React.CSSProperties;
    button?: React.ReactNode;
}
declare const BottomSheet: React.FC<BottomSheetProps>;
export default BottomSheet;
