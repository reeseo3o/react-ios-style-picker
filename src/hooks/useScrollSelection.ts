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
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const scrollRef = useRef<HTMLUListElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const callbackTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastScrollTopRef = useRef<number>(0);
  const lastScrollTimeRef = useRef<number>(Date.now());
  const isScrollingRef = useRef<boolean>(false);
  const snapAnimationRef = useRef<number | null>(null);

  const calculateSelectedIndex = useCallback((scrollTop: number): number => {
    if (!scrollRef.current) return 0;
    
    const listHeight = scrollRef.current.clientHeight;
    const paddingTop = parseFloat(getComputedStyle(scrollRef.current).paddingTop) || 0;
    const centerY = listHeight / 2;
    const centerScrollPosition = scrollTop + centerY - paddingTop - itemHeight / 2;
    const index = Math.round(centerScrollPosition / itemHeight);
    
    return Math.max(0, Math.min(index, list.length - 1));
  }, [itemHeight, list.length]);

  const snapToIndex = useCallback((targetIndex: number) => {
    if (!scrollRef.current) return;
    
    const targetScrollTop = targetIndex * itemHeight;
    const startScrollTop = scrollRef.current.scrollTop;
    const distance = targetScrollTop - startScrollTop;
    const startTime = Date.now();
    const duration = Math.min(300, Math.abs(distance) * 0.5);
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      const currentScrollTop = startScrollTop + distance * easeOutCubic;
      scrollRef.current!.scrollTop = currentScrollTop;
      
      if (progress < 1) {
        snapAnimationRef.current = requestAnimationFrame(animate);
      } else {
        scrollRef.current!.scrollTop = targetScrollTop;
        snapAnimationRef.current = null;
      }
    };
    
    if (snapAnimationRef.current) {
      cancelAnimationFrame(snapAnimationRef.current);
    }
    snapAnimationRef.current = requestAnimationFrame(animate);
  }, [itemHeight]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    
    const scrollTop = scrollRef.current.scrollTop;
    
    lastScrollTopRef.current = scrollTop;
    lastScrollTimeRef.current = Date.now();
    isScrollingRef.current = true;
    
    const newSelectedIndex = calculateSelectedIndex(scrollTop);
    
    if (newSelectedIndex >= 0 && newSelectedIndex < list.length) {
      setSelectedIndex((prevIndex) => {
        if (prevIndex !== newSelectedIndex) {
          clearTimeout(callbackTimerRef.current!);
          callbackTimerRef.current = setTimeout(() => {
            onSelectedChange?.(list[newSelectedIndex]);
          }, 150); 
          return newSelectedIndex;
        }
        return prevIndex;
      });
    }
    
    // 스크롤이 멈췄는지 확인 (타임아웃 사용)
    clearTimeout(timerRef.current!);
    timerRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      
      // 스크롤이 멈췄을 때 정확히 중앙에 맞추기
      const finalScrollTop = scrollRef.current!.scrollTop;
      const finalSelectedIndex = calculateSelectedIndex(finalScrollTop);
      
      if (finalSelectedIndex >= 0 && finalSelectedIndex < list.length) {
        const targetScrollTop = finalSelectedIndex * itemHeight;
        const scrollDiff = Math.abs(finalScrollTop - targetScrollTop);
        
        // 작은 차이만 있을 때만 스냅
        if (scrollDiff > 0.5) {
          snapToIndex(finalSelectedIndex);
        }
        
        setSelectedIndex((prevIndex) => {
          if (prevIndex !== finalSelectedIndex) {
            onSelectedChange?.(list[finalSelectedIndex]);
            return finalSelectedIndex;
          }
          return prevIndex;
        });
      }
    }, 100);
  }, [itemHeight, list, onSelectedChange, calculateSelectedIndex, snapToIndex]);

  useEffect(() => {
    let initialIndex = 0;
    if (initialSelected !== undefined) {
      const foundIndex = list.indexOf(initialSelected);
      initialIndex = foundIndex >= 0 ? foundIndex : 0;
    }
    setSelectedIndex(initialIndex);
    
    // DOM이 렌더링된 후 스크롤 위치 설정
    const setScrollPosition = () => {
      if (scrollRef.current) {
        const listHeight = scrollRef.current.clientHeight;
        
        if (listHeight > 0) {
          // 항목의 중앙이 List의 중앙에 오도록 스크롤 위치 계산
          const scrollTop = initialIndex * itemHeight;
          scrollRef.current.scrollTop = scrollTop;
          lastScrollTopRef.current = scrollTop;
          lastScrollTimeRef.current = Date.now();
        } else {
          // 높이가 아직 계산되지 않았으면 다음 프레임에서 재시도
          requestAnimationFrame(setScrollPosition);
        }
      }
    };
    
    // 약간의 지연을 두어 DOM 렌더링 완료 보장
    setTimeout(setScrollPosition, 0);
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (callbackTimerRef.current) {
        clearTimeout(callbackTimerRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (snapAnimationRef.current) {
        cancelAnimationFrame(snapAnimationRef.current);
      }
    };
  }, [initialSelected, itemHeight, list]);

  return { selectedIndex, scrollRef, handleScroll };
}

export default useScrollSelection;
