import { useRef } from "react";
import { Button } from "../ui";

interface LoadingButtonProps {
  text: string;
  submit: () => void;
  loading: boolean;
}

export function LoadingButton({ text, loading, submit }: LoadingButtonProps) {
  const timeOutRef = useRef<number | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const handleTouch = () => {
    timeOutRef.current = window.setTimeout(() => {
      submit();
    }, 1000);

    loadingRef.current!.classList.remove("duration-300");
    loadingRef.current!.classList.add("duration-1000");
    loadingRef.current!.classList.add("w-full");
  };

  const handleUnTouch = () => {
    if (timeOutRef.current !== null) {
      clearTimeout(timeOutRef.current);
      timeOutRef.current = null;
    }
    loadingRef.current!.classList.remove("duration-1000");
    loadingRef.current!.classList.add("duration-300");
    loadingRef.current!.classList.remove("w-full");
  };

  return (
    <Button
      size="lg"
      className="w-full text-xl select-none relative overflow-hidden"
      onMouseDown={handleTouch}
      onMouseUp={handleUnTouch}
      onMouseLeave={handleUnTouch}
      variant="outline"
      loading={loading}
    >
      <div
        ref={loadingRef}
        className="absolute left-0 top-0 h-full w-0 bg-primary/40 transition-[width]  z-0 ease-linear"
      />

      <span className="relative z-10 ">{text}</span>
    </Button>
  );
}
