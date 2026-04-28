import { useState, useRef, useEffect, useCallback } from "react";
import { playSound } from "../utils/sounds";

export function useTimer(duration, onExpire) {
  const [timer, setTimer] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const expireTriggered = useRef(false);
  const onExpireRef = useRef(onExpire);

  // Always keep onExpireRef pointing to latest callback
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  const clearTick = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    clearTick();
    setIsRunning(false);
  }, [clearTick]);

  const runInterval = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);
          return 0;
        }
        playSound("tick");
        return prev - 1;
      });
    }, 1000);
    setIsRunning(true);
  }, []);

  const start = useCallback(() => {
    clearTick();
    expireTriggered.current = false;
    setTimer(duration);
    setTimeout(() => {
      runInterval();
    }, 0);
  }, [duration, clearTick, runInterval]);

  const pause = useCallback(() => {
    clearTick();
    setIsRunning(false);
  }, [clearTick]);

  const resume = useCallback(() => {
    setTimer((t) => {
      if (t <= 0) return t;
      if (!intervalRef.current) {
        runInterval();
      }
      return t;
    });
  }, [runInterval]);

  // Fire onExpire exactly once when timer reaches 0
  useEffect(() => {
    if (timer === 0 && !expireTriggered.current) {
      expireTriggered.current = true;
      onExpireRef.current && onExpireRef.current();
    }
  }, [timer]);

  useEffect(() => {
    return () => clearTick();
  }, [clearTick]);

  return { timer, start, stop, pause, resume, isRunning };
}