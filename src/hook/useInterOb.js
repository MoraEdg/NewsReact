import { useEffect, useRef, useState } from "react";

export default function useIntersect(options) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [targetElement, setTargetElement] = useState(null);
  const [entry, setEntry] = useState({});

  const observer = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setEntry(entry);
          setIsIntersecting(entry.isIntersecting);
          console.log(entry.isIntersecting ? "se ve" : "no se ve");
        }
      },
      { threshold: options.threshold || 0.5 }
    );
  }, [options.threshold]);

  useEffect(() => {
    const currentObserver = observer.current;

    if (targetElement && currentObserver && targetElement instanceof Element) {
      currentObserver.observe(targetElement);
    }

    return () => {
      if (currentObserver && targetElement && targetElement instanceof Element) {
        currentObserver.unobserve(targetElement);
      }
    };
  }, [targetElement]);

  const observeElement = (element) => {
    setTargetElement(element);
  };

  return [observeElement, isIntersecting, entry];
}
