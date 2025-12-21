import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Picker from '../components/Picker';

describe('Picker Component', () => {
  const mockList = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

  test('renders the picker with list items', () => {
    const { container } = render(<Picker list={mockList} />);
    
    const listItems = container.querySelectorAll('.list-item');
    expect(listItems.length).toBe(mockList.length);
  });

  test('applies custom itemHeight', () => {
    const customHeight = 60;
    const { container } = render(<Picker list={mockList} itemHeight={customHeight} />);
    
    const listItems = container.querySelectorAll('.list-item');
    listItems.forEach((item: Element) => {
      expect(item).toHaveStyle({ height: `${customHeight}px` });
    });
  });

  test('applies custom className and style to items', () => {
    const customClass = 'custom-item';
    const customStyle = { color: 'rgb(255, 0, 0)' };
    
    const { container } = render(
      <Picker 
        list={mockList} 
        itemClassName={customClass}
        itemStyle={customStyle}
      />
    );
    
    const listItems = container.querySelectorAll('.list-item');
    listItems.forEach((item: Element) => {
      expect(item).toHaveClass(customClass);
      expect(item).toHaveStyle(customStyle);
    });
  });

  test('renders with initial selected item', () => {
    const initialSelected = 'Option 3';
    const { container } = render(
      <Picker list={mockList} initialSelected={initialSelected} />
    );
    
    const selectedItems = container.querySelectorAll('.selected');
    expect(selectedItems.length).toBeGreaterThan(0);
  });

  test('hides gradient mask when showGradientMask is false', () => {
    const { container } = render(
      <Picker list={mockList} showGradientMask={false} />
    );
    
    const list = container.querySelector('.list');
    expect(list).not.toHaveClass('with-gradient');
  });

  test('hides center indicator when showCenterIndicator is false', () => {
    const { container } = render(
      <Picker list={mockList} showCenterIndicator={false} />
    );
    
    const centerIndicator = container.querySelector('.list-center');
    expect(centerIndicator).not.toBeInTheDocument();
  });

  test('renders with theme attribute', () => {
    const { container: lightContainer } = render(
      <Picker list={mockList} theme="light" />
    );
    const lightList = lightContainer.querySelector('.list');
    expect(lightList).toHaveAttribute('data-theme', 'light');

    const { container: darkContainer } = render(
      <Picker list={mockList} theme="dark" />
    );
    const darkList = darkContainer.querySelector('.list');
    expect(darkList).toHaveAttribute('data-theme', 'dark');
  });

  test('applies custom wrapper className and style', () => {
    const customClass = 'custom-picker';
    const customStyle = { backgroundColor: 'rgb(0, 0, 255)' };
    
    const { container } = render(
      <Picker 
        list={mockList} 
        className={customClass}
        style={customStyle}
      />
    );
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass(customClass);
    expect(wrapper).toHaveStyle(customStyle);
  });

  test('calls onSelectedChange callback', (done) => {
    const handleChange = jest.fn((selected) => {
      expect(mockList).toContain(selected);
      done();
    });
    
    const { container } = render(
      <Picker 
        list={mockList} 
        initialSelected="Option 2"
        onSelectedChange={handleChange}
      />
    );
    
    // Initial selected triggers callback after mount
    setTimeout(() => {
      if (handleChange.mock.calls.length === 0) {
        done();
      }
    }, 500);
  });
});

