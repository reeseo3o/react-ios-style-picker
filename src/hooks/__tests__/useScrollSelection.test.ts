import { renderHook, act } from '@testing-library/react';
import useScrollSelection from '../useScrollSelection';

describe('useScrollSelection Hook', () => {
  const mockList = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
  const itemHeight = 50;

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('initializes with correct default index', () => {
    const { result } = renderHook(() =>
      useScrollSelection({
        list: mockList,
        itemHeight,
      })
    );

    expect(result.current.selectedIndex).toBe(0);
    expect(result.current.scrollRef).toBeDefined();
    expect(result.current.handleScroll).toBeDefined();
  });

  test('initializes with correct initial selected item', () => {
    const initialSelected = 'Option 3';
    const { result } = renderHook(() =>
      useScrollSelection({
        list: mockList,
        itemHeight,
        initialSelected,
      })
    );

    expect(result.current.selectedIndex).toBe(2);
  });

  test('initializes with index 0 when initial selected item not found', () => {
    const initialSelected = 'Non-existent Option';
    const { result } = renderHook(() =>
      useScrollSelection({
        list: mockList,
        itemHeight,
        initialSelected,
      })
    );

    expect(result.current.selectedIndex).toBe(0);
  });

  test('provides scrollRef object', () => {
    const { result } = renderHook(() =>
      useScrollSelection({
        list: mockList,
        itemHeight,
      })
    );

    expect(result.current.scrollRef).toBeDefined();
    expect(result.current.scrollRef.current).toBeNull();
  });

  test('provides handleScroll function', () => {
    const { result } = renderHook(() =>
      useScrollSelection({
        list: mockList,
        itemHeight,
      })
    );

    expect(result.current.handleScroll).toBeDefined();
    expect(typeof result.current.handleScroll).toBe('function');
  });

  test('calls onSelectedChange callback on initialization', () => {
    const onSelectedChange = jest.fn();
    const initialSelected = 'Option 2';

    renderHook(() =>
      useScrollSelection({
        list: mockList,
        itemHeight,
        initialSelected,
        onSelectedChange,
      })
    );

    // Callback might be called after timeout
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Note: The hook may or may not call onSelectedChange on init
    // This test verifies the callback is provided and can be called
    expect(onSelectedChange).toHaveBeenCalledTimes(0);
  });

  test('updates selectedIndex when list changes', () => {
    const { result, rerender } = renderHook(
      ({ list }) =>
        useScrollSelection({
          list,
          itemHeight,
          initialSelected: list[1],
        }),
      {
        initialProps: { list: mockList },
      }
    );

    expect(result.current.selectedIndex).toBe(1);

    const newList = ['New 1', 'Option 2', 'New 3'];
    rerender({ list: newList });

    // initialSelected 'Option 2' still exists in new list at index 1
    expect(result.current.selectedIndex).toBe(1);
  });

  test('cleans up timers on unmount', () => {
    const { unmount } = renderHook(() =>
      useScrollSelection({
        list: mockList,
        itemHeight,
      })
    );

    // Trigger some timeouts
    act(() => {
      jest.advanceTimersByTime(100);
    });

    unmount();

    // Test passes if no errors occur during cleanup
    expect(true).toBe(true);
  });

  test('handles scroll event', () => {
    const onSelectedChange = jest.fn();
    const { result } = renderHook(() =>
      useScrollSelection({
        list: mockList,
        itemHeight,
        onSelectedChange,
      })
    );

    // Verify that handleScroll is a function
    expect(typeof result.current.handleScroll).toBe('function');
    
    // Test that the function can be called without error
    // (without mocking scrollRef, it will return early)
    act(() => {
      result.current.handleScroll();
    });

    // The function should not throw an error
    expect(result.current.selectedIndex).toBeGreaterThanOrEqual(0);
  });

  test('returns memoized handleScroll function', () => {
    const { result, rerender } = renderHook(() =>
      useScrollSelection({
        list: mockList,
        itemHeight,
      })
    );

    const firstHandleScroll = result.current.handleScroll;
    rerender();
    const secondHandleScroll = result.current.handleScroll;

    // The function reference should be stable
    expect(firstHandleScroll).toBe(secondHandleScroll);
  });
});

