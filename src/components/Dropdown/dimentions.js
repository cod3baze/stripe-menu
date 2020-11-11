import { useState, useCallback, useLayoutEffect } from 'react';

const getDimensions = (element) => element.getBoundingClientRect();

export function useDimentions(responsive = true) {
  const [dimensions, setDimensions] = useState(null);
  const [element, setElement] = useState(null);

  const hook = useCallback((e) => setElement(e), []);

  useLayoutEffect(() => {
    if (element) {
      const updateDimentions = () => {
        window.requestAnimationFrame(() => {
          setDimensions(getDimensions(element));
        });
      };

      updateDimentions();

      if (responsive) {
        window.addEventListener('resize', updateDimentions);

        return () => {
          window.removeEventListener('resize', updateDimentions);
        };
      }
    }
  }, [element, hook, responsive]);

  return [hook, dimensions, element];
}
