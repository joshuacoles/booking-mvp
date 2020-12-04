import { useEffect, useState } from 'react';

type SizeClass = 'big' | 'medium' | 'small';

export function useSizeClass() {
  const [sizeClass, setSizeClass] = useState<SizeClass>('big');

  useEffect(() => {
    function handler() {
      const width = window.screen.availWidth;

      if (width > 800) setSizeClass('big');
      else if (width > 300) setSizeClass('medium');
      else setSizeClass('small')
    }

    // Add event listener
    window.addEventListener('resize', handler);

    // Call handler right away so state gets updated with initial window size
    handler();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handler);
  }, []);

  return sizeClass;
}

export default useSizeClass;
