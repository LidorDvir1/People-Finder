import { useState, useEffect } from "react";

export const useIntersection = (element, rootMargin) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin }
    );

    element?.current && observer.observe(element?.current);

    return () => observer.unobserve(element?.current);
  }, []);

  return isVisible;
};
