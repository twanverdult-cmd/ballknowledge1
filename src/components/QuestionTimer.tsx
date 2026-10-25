import { useEffect, useRef, useState } from "react";

export const QUESTION_SECONDS = 30;
const URGENT_SECONDS = 10;

/** Counts down from the moment it mounts; mount it with a fresh key for every question. */
export function QuestionTimer({ running, onExpire }: { running: boolean; onExpire: () => void }) {
  const [left, setLeft] = useState(QUESTION_SECONDS);
  const deadline = useRef(Date.now() + QUESTION_SECONDS * 1000);
  const expire = useRef(onExpire);
  expire.current = onExpire;

  useEffect(() => {
    if (!running) return;
    deadline.current = Date.now() + left * 1000;
    const timer = window.setInterval(() => {
      const remaining = Math.max(0, (deadline.current - Date.now()) / 1000);
      setLeft(remaining);
      if (remaining === 0) { window.clearInterval(timer); expire.current(); }
    }, 100);
    return () => window.clearInterval(timer);
    // `left` is only read to resume from where a paused timer stopped.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const urgent = running && left <= URGENT_SECONDS;
  return <div className={`question-timer ${urgent ? "urgent" : ""}`} role="timer" aria-label={`${Math.ceil(left)} seconds left`}>
    {urgent && <div className="urgent-edge" aria-hidden="true" />}
    <div className="timer-track" aria-hidden="true"><span style={{ transform: `scaleX(${left / QUESTION_SECONDS})` }} /></div>
    <span className="timer-number font-display">{Math.ceil(left)}s</span>
  </div>;
}
