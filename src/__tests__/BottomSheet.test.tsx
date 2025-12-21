import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';
import BottomSheet from '../components/BottomSheet';

describe('BottomSheet Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  
  test('renders when isOpen is true', () => {
    const { container } = render(
      <BottomSheet isOpen={true} onClose={mockOnClose}>
        <div>Test Content</div>
      </BottomSheet>
    );
    
    expect(container.textContent).toContain('Test Content');
  });

  test('does not render when isOpen is false', () => {
    const { container } = render(
      <BottomSheet isOpen={false} onClose={mockOnClose}>
        <div>Test Content</div>
      </BottomSheet>
    );
    
    expect(container.firstChild).toBeNull();
  });

  test('calls onClose when overlay is clicked', () => {
    const { container } = render(
      <BottomSheet isOpen={true} onClose={mockOnClose}>
        <div>Test Content</div>
      </BottomSheet>
    );
    
    const overlay = container.querySelector('.bottom-sheet-overlay');
    expect(overlay).toBeInTheDocument();
    
    fireEvent.click(overlay!);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when content is clicked', () => {
    const { container } = render(
      <BottomSheet isOpen={true} onClose={mockOnClose}>
        <div>Test Content</div>
      </BottomSheet>
    );
    
    const content = container.querySelector('.bottom-sheet-content');
    expect(content).toBeInTheDocument();
    
    fireEvent.click(content!);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('closes on ESC key press', () => {
    render(
      <BottomSheet isOpen={true} onClose={mockOnClose}>
        <div>Test Content</div>
      </BottomSheet>
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('renders button when provided', () => {
    const { container } = render(
      <BottomSheet 
        isOpen={true} 
        onClose={mockOnClose}
        button={<button>Action Button</button>}
      >
        <div>Test Content</div>
      </BottomSheet>
    );
    
    expect(container.textContent).toContain('Action Button');
  });

  test('does not render button when not provided', () => {
    const { container } = render(
      <BottomSheet isOpen={true} onClose={mockOnClose}>
        <div>Test Content</div>
      </BottomSheet>
    );
    
    const buttonContainer = container.querySelector('.bottom-sheet-button');
    expect(buttonContainer).not.toBeInTheDocument();
  });

  test('applies custom className to overlay', () => {
    const customClass = 'custom-overlay';
    const { container } = render(
      <BottomSheet isOpen={true} onClose={mockOnClose} className={customClass}>
        <div>Test Content</div>
      </BottomSheet>
    );
    
    const overlay = container.querySelector('.bottom-sheet-overlay');
    expect(overlay).toHaveClass('bottom-sheet-overlay', customClass);
  });

  test('applies custom style to content', () => {
    const customStyle = { padding: '20px' };
    const { container } = render(
      <BottomSheet isOpen={true} onClose={mockOnClose} style={customStyle}>
        <div>Test Content</div>
      </BottomSheet>
    );
    
    const content = container.querySelector('.bottom-sheet-content');
    expect(content).toHaveStyle({ padding: '20px' });
  });

  test('renders with theme attribute', () => {
    const { container: lightContainer } = render(
      <BottomSheet isOpen={true} onClose={mockOnClose} theme="light">
        <div>Test Content</div>
      </BottomSheet>
    );
    const lightOverlay = lightContainer.querySelector('.bottom-sheet-overlay');
    expect(lightOverlay).toHaveAttribute('data-theme', 'light');

    const { container: darkContainer } = render(
      <BottomSheet isOpen={true} onClose={mockOnClose} theme="dark">
        <div>Test Content</div>
      </BottomSheet>
    );
    const darkOverlay = darkContainer.querySelector('.bottom-sheet-overlay');
    expect(darkOverlay).toHaveAttribute('data-theme', 'dark');
  });

  test('renders with accessibility attributes', () => {
    const { container } = render(
      <BottomSheet isOpen={true} onClose={mockOnClose}>
        <div>Test Content</div>
      </BottomSheet>
    );
    
    const overlay = container.querySelector('.bottom-sheet-overlay');
    expect(overlay).toHaveAttribute('role', 'dialog');
    expect(overlay).toHaveAttribute('aria-modal', 'true');
  });

  test('renders multiple children', () => {
    const { container } = render(
      <BottomSheet isOpen={true} onClose={mockOnClose}>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </BottomSheet>
    );
    
    expect(container.textContent).toContain('Child 1');
    expect(container.textContent).toContain('Child 2');
    expect(container.textContent).toContain('Child 3');
  });
});

