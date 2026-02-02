import { useEffect, useRef } from "react";

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom"
  | "rotate"
  | "flip";

export const useScrollAnimation = (type: AnimationType = "fade-up") => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    el.classList.add("scroll-hidden", type);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("scroll-show");
          el.classList.remove("scroll-hidden", type);
        } else {
         
          el.classList.remove("scroll-show");
          el.classList.add("scroll-hidden", type);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [type]);

  return ref;
};
