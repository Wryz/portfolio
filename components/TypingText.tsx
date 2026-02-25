'use client';

import { useEffect, useState, useRef, type CSSProperties, type ElementType } from 'react';
import { useTypingQueue } from '@/lib/TypingQueueContext';

interface TypingTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
  speed?: number;
  triggerKey?: string;
  showCursor?: boolean;
}

export function TypingText({ text, className, style, as: Tag = 'p', speed = 3, triggerKey, showCursor = true }: TypingTextProps) {
  const [displayed, setDisplayed] = useState('');
  const prevRef = useRef(text + (triggerKey ?? ''));
  const queue = useTypingQueue();

  useEffect(() => {
    const key = text + (triggerKey ?? '');
    if (key === prevRef.current && displayed === text) return;
    prevRef.current = key;
    setDisplayed('');

    let cancelled = false;
    let intervalId: ReturnType<typeof setInterval>;
    let holdingTurn = false;

    const startTyping = () => {
      if (cancelled) {
        queue?.releaseTurn();
        return;
      }
      holdingTurn = !!queue;
      let i = 0;
      intervalId = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(intervalId);
          if (holdingTurn) {
            holdingTurn = false;
            queue?.releaseTurn();
          }
        }
      }, speed);
    };

    if (queue) {
      queue.waitForTurn().then(startTyping);
    } else {
      startTyping();
    }

    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
      if (holdingTurn) {
        holdingTurn = false;
        queue?.releaseTurn();
      }
    };
  }, [text, triggerKey]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Tag className={className} style={style}>
      {displayed}
      {showCursor && displayed.length < text.length && (
        <span
          className="inline-block w-[2px] h-[1em] ml-0.5 align-middle animate-pulse"
          style={{ backgroundColor: '#D4834A' }}
        />
      )}
    </Tag>
  );
}
