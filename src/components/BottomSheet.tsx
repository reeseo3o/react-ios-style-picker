import { useEffect, useRef } from "react";
import "../styles/BottomSheet.css";

export interface BottomSheetProps {
  children: React.ReactNode | React.ReactNode[];
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
  button?: React.ReactNode;
  theme?: "light" | "dark" | "auto";
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  isOpen,
  onClose,
  className = "",
  style = {},
  button,
  theme = "auto",
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Focus management
    const previousActiveElement = document.activeElement as HTMLElement;
    if (contentRef.current) {
      contentRef.current.focus();
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      // Restore focus
      if (previousActiveElement) {
        previousActiveElement.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const themeAttr = theme !== "auto" ? { "data-theme": theme } : {};

  return (
    <div 
      className={`bottom-sheet-overlay ${className}`} 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      {...themeAttr}
    >
      <div
        ref={contentRef}
        style={style}
        className="bottom-sheet-content"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {children}
        {button && <div className="bottom-sheet-button">{button}</div>}
      </div>
    </div>
  );
};

export default BottomSheet;
