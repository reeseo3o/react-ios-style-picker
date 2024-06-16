import "../styles/BottomSheet.css";

interface BottomSheetProps {
  children: React.ReactNode | React.ReactNode[];
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
  button?: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  isOpen,
  onClose,
  className = "",
  style = {},
  button,
}) => {
  if (!isOpen) return null;

  return (
    <div className={`bottom-sheet-overlay ${className}`} onClick={onClose}>
      <div
        style={style}
        className="bottom-sheet-content"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
      {button && <div className="bottom-sheet-button">{button}</div>}
    </div>
  );
};

export default BottomSheet;
