import { useRef, useState, useCallback, useEffect } from "react";

interface UseScrollSelectionProps {
  list: (string | number)[];
  itemHeight: number;
  initialSelected?: string | number;
  onSelectedChange?: (selected: string | number) => void;
}

function useScrollSelection({
  list,
  itemHeight,
  initialSelected,
  onSelectedChange,
}: UseScrollSelectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(() => {
    if (initialSelected !== undefined) {
      const foundIndex = list.indexOf(initialSelected);
      return foundIndex >= 0 ? foundIndex : 0;
    }
    return 0;
  });
  const scrollRef = useRef<HTMLUListElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitializedRef = useRef<boolean>(false);
  const isUserScrollingRef = useRef<boolean>(false);
  const initialIndexRef = useRef<number>(0);
  const lastScrollHeightRef = useRef<number>(0);

  // 스크롤 위치에서 선택된 인덱스 계산
  const calculateSelectedIndex = useCallback((scrollTop: number): number => {
    const index = Math.round(scrollTop / itemHeight);
    return Math.max(0, Math.min(index, list.length - 1));
  }, [itemHeight, list.length]);

  // 특정 인덱스로 스크롤 (애니메이션 없이 즉시)
  const scrollToIndex = useCallback((targetIndex: number, smooth = false) => {
    if (!scrollRef.current) return;
    
    const clampedIndex = Math.max(0, Math.min(targetIndex, list.length - 1));
    const targetScrollTop = clampedIndex * itemHeight;
    
    if (smooth) {
      scrollRef.current.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    } else {
      scrollRef.current.scrollTop = targetScrollTop;
    }
  }, [itemHeight, list.length]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    
    // 초기화 중에는 스크롤 핸들러 무시
    if (!isInitializedRef.current) return;
    
    isUserScrollingRef.current = true;
    
    const scrollTop = scrollRef.current.scrollTop;
    const newSelectedIndex = calculateSelectedIndex(scrollTop);
    
    // 선택 인덱스 업데이트
    if (newSelectedIndex >= 0 && newSelectedIndex < list.length) {
      setSelectedIndex((prevIndex) => {
        if (prevIndex !== newSelectedIndex) {
          // 콜백은 스크롤이 완전히 멈춘 후에 호출
          clearTimeout(callbackTimerRef.current!);
          return newSelectedIndex;
        }
        return prevIndex;
      });
    }
    
    // 스크롤이 멈췄는지 확인 (디바운스)
    clearTimeout(timerRef.current!);
    timerRef.current = setTimeout(() => {
      if (!scrollRef.current) return;
      
      isUserScrollingRef.current = false;
      
      const finalScrollTop = scrollRef.current.scrollTop;
      const finalSelectedIndex = calculateSelectedIndex(finalScrollTop);
      const targetScrollTop = finalSelectedIndex * itemHeight;
      const scrollDiff = Math.abs(finalScrollTop - targetScrollTop);
      
      // 스냅이 필요하면 스냅
      if (scrollDiff > 1) {
        scrollToIndex(finalSelectedIndex, true);
      }
      
      // 최종 선택 상태 업데이트 및 콜백 호출
      setSelectedIndex((prevIndex) => {
        if (prevIndex !== finalSelectedIndex) {
          onSelectedChange?.(list[finalSelectedIndex]);
          return finalSelectedIndex;
        } else {
          // 인덱스가 같아도 콜백은 호출해야 할 수 있음
          callbackTimerRef.current = setTimeout(() => {
            onSelectedChange?.(list[finalSelectedIndex]);
          }, 50);
        }
        return prevIndex;
      });
    }, 120);
  }, [itemHeight, list, onSelectedChange, calculateSelectedIndex, scrollToIndex]);

  // 초기 스크롤 위치 설정
  useEffect(() => {
    let initialIndex = 0;
    if (initialSelected !== undefined) {
      const foundIndex = list.indexOf(initialSelected);
      initialIndex = foundIndex >= 0 ? foundIndex : 0;
    }
    initialIndexRef.current = initialIndex;
    
    if (isInitializedRef.current) return;
    
    let retryCount = 0;
    const maxRetries = 30;
    
    const setScrollPosition = () => {
      if (scrollRef.current) {
        const listClientHeight = scrollRef.current.clientHeight;
        const scrollHeight = scrollRef.current.scrollHeight;
        
        // 스크롤 가능한 영역이 준비되었는지 확인
        if (listClientHeight > 0 && scrollHeight > listClientHeight) {
          const targetScrollTop = initialIndex * itemHeight;
          // 최대 스크롤 위치 계산
          const maxScrollTop = scrollHeight - listClientHeight;
          // 목표 스크롤 위치가 최대값을 초과하지 않도록 제한
          const clampedScrollTop = Math.min(targetScrollTop, maxScrollTop);
          
          scrollRef.current.scrollTop = clampedScrollTop;
          lastScrollHeightRef.current = scrollHeight;
          
          // 스크롤 위치가 제대로 설정되었는지 확인
          const actualScrollTop = scrollRef.current.scrollTop;
          if (Math.abs(actualScrollTop - clampedScrollTop) > 1) {
            // 스크롤 위치가 제대로 설정되지 않았으면 재시도
            if (retryCount < maxRetries) {
              retryCount++;
              requestAnimationFrame(setScrollPosition);
              return;
            }
          }
          
          // 초기화 완료 표시 (약간의 지연 후)
          setTimeout(() => {
            // 최종 확인 및 보정
            if (scrollRef.current) {
              const finalMaxScrollTop = scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
              const finalTargetScrollTop = Math.min(initialIndex * itemHeight, finalMaxScrollTop);
              if (Math.abs(scrollRef.current.scrollTop - finalTargetScrollTop) > 1) {
                scrollRef.current.scrollTop = finalTargetScrollTop;
              }
            }
            isInitializedRef.current = true;
          }, 100);
        } else if (retryCount < maxRetries) {
          retryCount++;
          requestAnimationFrame(setScrollPosition);
        }
      } else if (retryCount < maxRetries) {
        retryCount++;
        requestAnimationFrame(setScrollPosition);
      }
    };
    
    // 약간의 지연 후 스크롤 위치 설정 시작
    // BottomSheet 등 애니메이션(~250ms)이 있는 컨테이너에서 열릴 때를 위해 지연 추가
    const initialDelay = 50;
    setTimeout(() => {
      requestAnimationFrame(setScrollPosition);
    }, initialDelay);
    
    // 애니메이션 완료 후 추가 보정 (300ms 후)
    const animationDelay = 300;
    setTimeout(() => {
      if (scrollRef.current && !isUserScrollingRef.current) {
        const scrollHeight = scrollRef.current.scrollHeight;
        const clientHeight = scrollRef.current.clientHeight;
        if (scrollHeight > clientHeight) {
          const maxScrollTop = scrollHeight - clientHeight;
          const targetScrollTop = Math.min(initialIndex * itemHeight, maxScrollTop);
          if (Math.abs(scrollRef.current.scrollTop - targetScrollTop) > 1) {
            scrollRef.current.scrollTop = targetScrollTop;
          }
        }
      }
    }, animationDelay);
  }, [initialSelected, itemHeight, list]);

  // ResizeObserver로 스크롤 영역 크기 변경 감지 및 스크롤 위치 재조정
  useEffect(() => {
    if (!scrollRef.current) return;
    
    const resizeObserver = new ResizeObserver(() => {
      if (!scrollRef.current || !isInitializedRef.current || isUserScrollingRef.current) return;
      
      const currentScrollHeight = scrollRef.current.scrollHeight;
      // 스크롤 높이가 변경되었으면 스크롤 위치 재조정
      if (currentScrollHeight !== lastScrollHeightRef.current && currentScrollHeight > 0) {
        lastScrollHeightRef.current = currentScrollHeight;
        const maxScrollTop = currentScrollHeight - scrollRef.current.clientHeight;
        const targetScrollTop = Math.min(initialIndexRef.current * itemHeight, maxScrollTop);
        
        if (Math.abs(scrollRef.current.scrollTop - targetScrollTop) > 1) {
          scrollRef.current.scrollTop = targetScrollTop;
        }
      }
    });
    
    resizeObserver.observe(scrollRef.current);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [itemHeight]);

  // 클린업
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (callbackTimerRef.current) {
        clearTimeout(callbackTimerRef.current);
      }
    };
  }, []);

  return { selectedIndex, scrollRef, handleScroll };
}

export default useScrollSelection;
