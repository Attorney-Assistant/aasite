import { useEffect, useRef, useState } from "react";
import styles from "./ScrollReveal.module.css";

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
}

export function ScrollReveal({ delay = 0, className = "", style, children, ...props }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cls = [styles.reveal, isVisible ? styles.isVisible : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={ref}
      className={cls}
      style={{ ["--sr-delay" as any]: delay + "s", ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
