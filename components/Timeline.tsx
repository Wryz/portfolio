'use client';

import Image from 'next/image';

export interface Timestamp {
  date: string;
  thumbnail: string;
  id: string;
}

interface TimelineProps {
  data: Timestamp[];
  onProjectClick: (projectId: string) => void;
}

export function Timeline({ data, onProjectClick }: TimelineProps) {
  if (!data || data.length === 0) {
    return null;
  }

  // Sort timestamps by date
  const sortedTimestamps = [...data].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Get year range from timestamps
  const years = sortedTimestamps.map(t => new Date(t.date).getFullYear());
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  
  // Calculate date range
  const minDate = new Date(minYear, 0, 1);
  const maxDate = new Date(maxYear, 11, 31);
  const totalDays = (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);

  // Calculate position for a date based on percentage
  const getDatePosition = (date: string) => {
    const timestampDate = new Date(date);
    const timestampDays = (timestampDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24);
    return (timestampDays / totalDays) * 100;
  };

  // Generate year markers
  const yearMarkers = [];
  for (let year = minYear; year <= maxYear; year++) {
    yearMarkers.push(year);
  }

  // Generate regular guide lines (monthly intervals)
  const regularGuides = [];
  for (let year = minYear; year <= maxYear; year++) {
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
  const yearGuideHeight = '150px'; // Height of year guide lines
  const timestampGuideHeight = '200px'; // Height of timestamp guide lines
  const thumbnailSize = 80; // Size of thumbnail circles
  const thumbnailOffset = 120; // Distance from timeline to thumbnail center

  return (
    <div className="fixed inset-0 overflow-x-auto overflow-y-hidden scrollbar-hide">
      {/* Container with minimum width to ensure proper spacing */}
      <div 
        className="relative min-w-[2000px]" 
        style={{ 
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
          const position = getDatePosition(guideDate.toISOString().split('T')[0]);
          const isYearMark = guideDate.getMonth() === 0; // January marks
          
          // Skip if it's a year mark (will be rendered separately)
          if (isYearMark) return null;

          const regularGuideHalfHeight = parseInt(regularGuideHeight) / 2;

          return (
            <div
              key={`regular-${index}`}
              className="absolute bg-white opacity-20"
              style={{
                left: `calc(160px + ${position}%)`,
                top: `calc(50% - ${regularGuideHalfHeight}px)`,
                width: '1px',
                height: regularGuideHeight,
                transform: 'translateX(-50%)',
              }}
            />
          );
        })}

        {/* Year guide lines (larger) */}
        {yearMarkers.map((year) => {
          const yearDate = new Date(year, 0, 1);
          const position = getDatePosition(yearDate.toISOString().split('T')[0]);
          
          return (
            <div
              key={`year-${year}`}
              className="absolute"
              style={{
                left: `calc(160px + ${position}%)`,
                transform: 'translateX(-50%)',
              }}
            >
              {/* Vertical year guide line - full height */}
              <div
                className="absolute bg-white opacity-40"
                style={{
                  top: 0,
                  bottom: 0,
                  width: '2px',
                }}
              />
              {/* Year label */}
              <div
                className="absolute text-white text-sm font-medium whitespace-nowrap"
                style={{
                  top: `calc(50% - ${parseInt(yearGuideHeight) / 2}px - 30px)`,
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              >
                {year}
              </div>
            </div>
          );
        })}

        {/* Timestamp markers with thumbnails (prominent) */}
        {sortedTimestamps.map((timestamp, index) => {
          const position = getDatePosition(timestamp.date);
          const isAbove = index % 2 === 0; // Alternate above/below
          
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
                left: `calc(160px + ${position}%)`,
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
                  width: '2px',
                  height: guideLineHeight,
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  transform: 'translateX(-50%)',
                }}
              />
              
              {/* Date label */}
              <div
                className="absolute text-[10px] font-medium whitespace-nowrap"
                style={{
                  left: '50%',
                  top: `calc(50% - 20px)`,
                  color: 'rgba(255, 255, 255, 0.4)',
                  transform: 'translateX(-50%)',
                }}
              >
                {new Date(timestamp.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
              
              {/* Line connecting to thumbnail */}
              <div
                className="absolute"
                style={{
                  left: '50%',
                  top: connectionLineTop,
                  width: '2px',
                  height: connectionLineHeight,
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
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
