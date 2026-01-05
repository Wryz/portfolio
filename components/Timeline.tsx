'use client';

import { useEffect, useRef, useMemo, useCallback, useState } from 'react';
import Image from 'next/image';

export interface Timestamp {
  date: string;
  thumbnail: string;
  id: string;
}

interface TimelineProps {
  data: Timestamp[];
  onProjectClick: (projectId: string) => void;
  onVisibleRangeChange?: (visibleTimestamps: Timestamp[], visibleMonth: number, visibleYear: number) => void;
}

export function Timeline({ data, onProjectClick, onVisibleRangeChange }: TimelineProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const [centerGridlineDate, setCenterGridlineDate] = useState<string | null>(null);
  const [centerTimestampId, setCenterTimestampId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Sort timestamps by date
  const sortedTimestamps = useMemo(() => {
    if (!data || data.length === 0) return [];
    return [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [data]);

  // Get year range from timestamps
  const years = useMemo(() => {
    if (sortedTimestamps.length === 0) return [new Date().getFullYear()];
    return sortedTimestamps.map(t => new Date(t.date).getFullYear());
  }, [sortedTimestamps]);
  
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  
  // Extend timeline 1 year before first timestamp and 1 year after last timestamp
  const extendedMinYear = minYear - 1;
  const extendedMaxYear = maxYear + 1;
  
  // Calculate date range
  const minDate = useMemo(() => new Date(extendedMinYear, 0, 1), [extendedMinYear]);
  const maxDate = useMemo(() => new Date(extendedMaxYear, 11, 31), [extendedMaxYear]);
  const totalDays = useMemo(() => 
    (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24),
    [maxDate, minDate]
  );

  // Calculate position for a date based on percentage
  const getDatePosition = useCallback((date: string) => {
    const timestampDate = new Date(date);
    const timestampDays = (timestampDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);
    return (timestampDays / totalDays) * 100;
  }, [minDate, totalDays]);

  // Calculate date from position percentage
  const getDateFromPosition = useCallback((positionPercent: number) => {
    const days = (positionPercent / 100) * totalDays;
    return new Date(minDate.getTime() + days * 24 * 60 * 60 * 1000);
  }, [totalDays, minDate]);

  // Track scroll to determine visible date range
  useEffect(() => {
    if (!onVisibleRangeChange) {
      return;
    }

    let rafId: number | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const updateVisibleRange = () => {
      if (!scrollContainerRef.current || !timelineContainerRef.current) {
        return;
      }

      const scrollContainer = scrollContainerRef.current;
      const timelineContainer = timelineContainerRef.current;
      
      const scrollLeft = scrollContainer.scrollLeft;
      const viewportWidth = scrollContainer.clientWidth;
      const containerWidth = timelineContainer.offsetWidth;
      const paddingLeft = 160; // Match the paddingLeft value
      const paddingRight = 32;
      
      // Calculate visible range in container coordinates
      const viewportStart = scrollLeft;
      const viewportEnd = scrollLeft + viewportWidth;
      
      // Timeline starts at paddingLeft and ends at containerWidth - paddingRight
      const timelineStartPx = paddingLeft;
      const timelineEndPx = containerWidth - paddingRight;
      const timelineWidthPx = timelineEndPx - timelineStartPx;
      
      if (timelineWidthPx <= 0) {
        return;
      }
      
      // Find intersection of viewport and timeline
      const visibleTimelineStart = Math.max(timelineStartPx, viewportStart);
      const visibleTimelineEnd = Math.min(timelineEndPx, viewportEnd);
      
      // Convert to percentage of timeline (0-100%)
      const startPercent = Math.max(0, ((visibleTimelineStart - timelineStartPx) / timelineWidthPx) * 100);
      const endPercent = Math.min(100, ((visibleTimelineEnd - timelineStartPx) / timelineWidthPx) * 100);
      
      // Use center of viewport for month/year display
      const centerPercent = (startPercent + endPercent) / 2;
      const centerDate = getDateFromPosition(centerPercent);
      const visibleMonth = centerDate.getMonth();
      const visibleYear = centerDate.getFullYear();
      
      // Find the closest gridline to the center (month boundary)
      const centerMonthStart = new Date(visibleYear, visibleMonth, 1);
      const centerMonthStartStr = centerMonthStart.toISOString().split('T')[0];
      const centerMonthStartPercent = getDatePosition(centerMonthStartStr);
      const gridlineDistance = Math.abs(centerPercent - centerMonthStartPercent);
      
      // Find the closest timestamp to the center
      let closestTimestamp: { id: string; distance: number } | null = null;
      for (const timestamp of sortedTimestamps) {
        const timestampPercent = getDatePosition(timestamp.date);
        const distance = Math.abs(centerPercent - timestampPercent);
        if (!closestTimestamp || distance < closestTimestamp.distance) {
          closestTimestamp = { id: timestamp.id, distance };
        }
      }
      
      // Only highlight the closest one (gridline or timestamp)
      if (closestTimestamp && closestTimestamp.distance < gridlineDistance) {
        // Timestamp is closer - highlight timestamp, not gridline
        setCenterTimestampId(closestTimestamp.id);
        setCenterGridlineDate(null);
      } else {
        // Gridline is closer - highlight gridline, not timestamp
        setCenterGridlineDate(centerMonthStartStr);
        setCenterTimestampId(null);
      }
      
      // Find timestamps from the visible month/year only
      const visibleTimestamps = sortedTimestamps.filter(timestamp => {
        const timestampDate = new Date(timestamp.date);
        return timestampDate.getMonth() === visibleMonth && timestampDate.getFullYear() === visibleYear;
      });
      
      onVisibleRangeChange(visibleTimestamps, visibleMonth, visibleYear);
    };

    const handleScroll = () => {
      // Cancel any pending updates
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      
      // Use requestAnimationFrame for smooth updates
      rafId = requestAnimationFrame(() => {
        updateVisibleRange();
      });
    };

    const handleResize = () => {
      // Debounce resize events
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        updateVisibleRange();
      }, 100);
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize);
      // Initial call after a short delay to ensure layout is ready
      setTimeout(() => {
        updateVisibleRange();
      }, 100);
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
        }
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }
      };
    }
  }, [sortedTimestamps, onVisibleRangeChange, totalDays, minDate, getDateFromPosition, getDatePosition]);

  // Handle zoom with wheel events
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only handle vertical scroll for zoom
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        
        const scrollContainer = scrollContainerRef.current;
        const timelineContainer = timelineContainerRef.current;
        if (!scrollContainer || !timelineContainer) return;

        // Get current scroll position and viewport center
        const scrollLeft = scrollContainer.scrollLeft;
        const viewportWidth = scrollContainer.clientWidth;
        const viewportCenter = scrollLeft + viewportWidth / 2;
        
        // Calculate the position of the center relative to the total scrollable width (0-1)
        const currentScrollWidth = scrollContainer.scrollWidth;
        const centerPositionRatio = viewportCenter / currentScrollWidth;

        // Calculate zoom change (zoom in on scroll up, zoom out on scroll down)
        const zoomSpeed = 0.05;
        const zoomDelta = e.deltaY > 0 ? -zoomSpeed : zoomSpeed;
        const newZoom = Math.max(0.5, Math.min(20, zoomLevel + zoomDelta));
        
        if (newZoom !== zoomLevel) {
          setZoomLevel(newZoom);
          
          // Maintain center position after zoom
          // Use double requestAnimationFrame to ensure DOM has updated
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (scrollContainer && timelineContainerRef.current) {
                const newScrollWidth = scrollContainer.scrollWidth;
                const newCenterX = newScrollWidth * centerPositionRatio;
                scrollContainer.scrollLeft = newCenterX - viewportWidth / 2;
              }
            });
          });
        }
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        scrollContainer.removeEventListener('wheel', handleWheel);
      };
    }
  }, [zoomLevel]);

  // Early return after all hooks
  if (!data || data.length === 0) {
    return null;
  }

  // Generate regular guide lines (monthly intervals) - include extended range
  const regularGuides = [];
  for (let year = extendedMinYear; year <= extendedMaxYear; year++) {
    for (let month = 0; month < 12; month++) {
      const guideDate = new Date(year, month, 1);
      if (guideDate >= minDate && guideDate <= maxDate) {
        regularGuides.push(guideDate);
      }
    }
  }

  // Timeline configuration
  const timelineHeight = '2px'; // Main horizontal line thickness
  const regularGuideHeight = '100px'; // Height of regular guide lines
  const timestampGuideHeight = '150px'; // Height of timestamp guide lines
  const thumbnailSize = 45; // Size of thumbnail circles
  const thumbnailOffset = 80; // Distance from timeline to thumbnail center

  return (
    <div 
      ref={scrollContainerRef} 
      className="fixed inset-0 overflow-x-auto overflow-y-hidden scrollbar-hide"
      style={{ overscrollBehaviorX: 'none' }}
    >
      {/* Container with minimum width to ensure proper spacing */}
      <div 
        ref={timelineContainerRef}
        className="relative" 
        style={{ 
          minWidth: `${2000 * zoomLevel}px`,
          paddingLeft: '160px', 
          paddingRight: '32px',
          height: '100vh',
        }}
      >
        {/* Main horizontal timeline line - centered vertically */}
        <div 
          className="absolute"
          style={{
            left: '160px',
            right: '32px',
            top: '50%',
            height: timelineHeight,
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            transform: 'translateY(-50%)',
          }}
        />

        {/* Regular guide lines (monthly intervals) */}
        {regularGuides.map((guideDate, index) => {
          const guideDateStr = guideDate.toISOString().split('T')[0];
          const position = getDatePosition(guideDateStr);
          const isCenterGridline = centerGridlineDate === guideDateStr && centerTimestampId === null;

          // Calculate actual pixel position within timeline content area
          // Timeline content area: from 160px to (2000 * zoomLevel - 32)px
          const timelineContentWidth = 2000 * zoomLevel - 160 - 32;
          const pixelPosition = 160 + (position / 100) * timelineContentWidth;
          
          // Only render if within visible bounds (with small margin for rounding)
          if (pixelPosition < 0 || pixelPosition > 2000 * zoomLevel - 32) {
            return null;
          }

          const regularGuideHalfHeight = parseInt(regularGuideHeight) / 2;
          const dateLabel = guideDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          });

          return (
            <div
              key={`regular-${index}`}
              className="absolute"
              style={{
                left: `${pixelPosition}px`,
                top: 0,
                bottom: 0,
                transform: 'translateX(-50%)',
              }}
            >
              {/* Guide line */}
              <div
                className="absolute bg-white"
                style={{
                  left: '50%',
                  top: `calc(50% - ${regularGuideHalfHeight}px)`,
                  width: isCenterGridline ? '2px' : '1px',
                  height: regularGuideHeight,
                  opacity: isCenterGridline ? 1 : 0.2,
                  transform: 'translateX(-50%)',
                }}
              />
              {/* Date label */}
              <div
                className="absolute text-[10px] font-medium whitespace-nowrap text-white"
                style={{
                  left: '50%',
                  top: `calc(50% - ${regularGuideHalfHeight}px - 20px)`,
                  opacity: isCenterGridline ? 1 : 0.4,
                  transform: 'translateX(-50%)',
                }}
              >
                {dateLabel}
              </div>
            </div>
          );
        })}

        {/* Timestamp markers with thumbnails (prominent) */}
        {sortedTimestamps.map((timestamp, index) => {
          const position = getDatePosition(timestamp.date);
          
          // Calculate actual pixel position within timeline content area
          const timelineContentWidth = 2000 * zoomLevel - 160 - 32;
          const pixelPosition = 160 + (position / 100) * timelineContentWidth;
          
          // Only render if within visible bounds (with small margin for rounding)
          if (pixelPosition < 0 || pixelPosition > 2000 * zoomLevel - 32) {
            return null;
          }
          
          const isAbove = index % 2 === 0; // Alternate above/below
          
          // Check if this timestamp is at the center
          const isCenterTimestamp = centerTimestampId === timestamp.id;
          
          const thumbnailRadius = thumbnailSize / 2;
          const timestampGuideHalfHeight = parseInt(timestampGuideHeight) / 2;
          
          // For above: guide line extends upward from timeline center
          // For below: guide line extends downward from timeline center
          const guideLineTop = isAbove 
            ? `calc(50% - ${timestampGuideHalfHeight}px)` 
            : '50%';
          const guideLineHeight = timestampGuideHeight;
          
          // Connection line from guide line to thumbnail
          const connectionLineTop = isAbove
            ? `calc(50% - ${thumbnailOffset}px + ${thumbnailRadius}px)`
            : `calc(50% + ${timestampGuideHalfHeight}px)`;
          const connectionLineHeight = isAbove
            ? `${thumbnailOffset - thumbnailRadius - timestampGuideHalfHeight}px`
            : `${thumbnailOffset - thumbnailRadius - timestampGuideHalfHeight}px`;

          return (
            <div
              key={timestamp.id}
              className="absolute"
              style={{
                left: `${pixelPosition}px`,
                top: 0,
                bottom: 0,
                transform: 'translateX(-50%)',
              }}
            >
              {/* Prominent vertical guide line */}
              <div
                className="absolute"
                style={{
                  left: '50%',
                  top: guideLineTop,
                  width: isCenterTimestamp ? '3px' : '2px',
                  height: guideLineHeight,
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  opacity: isCenterTimestamp ? 1 : 0.4,
                  transform: 'translateX(-50%)',
                }}
              />
              
              {/* Line connecting to thumbnail */}
              <div
                className="absolute"
                style={{
                  left: '50%',
                  top: connectionLineTop,
                  width: '1px',
                  height: connectionLineHeight,
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  opacity: isCenterTimestamp ? 1 : 0.4,
                  transform: 'translateX(-50%)',
                }}
              />

              {/* Thumbnail at the end */}
              <button
                onClick={() => onProjectClick(timestamp.id)}
                className="group cursor-pointer absolute left-1/2 z-10"
                style={{
                  top: isAbove ? `calc(50% - ${thumbnailOffset}px)` : `calc(50% + ${thumbnailOffset}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div
                  className="relative rounded-full overflow-hidden transition-all duration-200 bg-black"
                  style={{ 
                    width: `${thumbnailSize}px`, 
                    height: `${thumbnailSize}px`,
                    border: '3px solid rgba(255, 255, 255, 0.4)',
                    boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'white';
                    e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                    e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.2)';
                  }}
                >
                  <Image
                    src={timestamp.thumbnail}
                    alt={`Timestamp ${timestamp.id}`}
                    fill
                    className="object-cover relative z-10"
                  />
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
