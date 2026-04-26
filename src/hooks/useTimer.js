import { useState, useRef, useEffect, useCallback } from "react";
import { playSound } from "../utils/sounds";

export function useTimer(duration, onExpire) {
  const [timer, setTimer] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const expireTriggered = useRef(false);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const start = useCallback(() => {
    // Reset state
    setTimer(duration);
    expireTriggered.current = false;
    stop(); // clear any existing interval
    
    // Start new interval
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          // Time's up!
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsRunning(false);
          return 0;
        }
        playSound("tick");
        return prev - 1;
      });
    }, 1000);
    setIsRunning(true);
  }, [duration, stop]);

  const pause = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    }
  }, []);

  const resume = useCallback(() => {
    if (isRunning) return; // already running
    if (timer <= 0) return; // already expired
    
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsRunning(false);
          return 0;
        }
        playSound("tick");
        return prev - 1;
      });
    }, 1000);
    setIsRunning(true);
  }, [timer, isRunning]);

  useEffect(() => {
    if (timer === 0 && !expireTriggered.current) {
      expireTriggered.current = true;
      onExpire && onExpire();
    }
  }, [timer, onExpire]);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return { timer, start, stop, pause, resume, isRunning };
}