import { useEffect, useState } from "react";

type TWindowSize = {
  width: number;
  height: number;
}

const debounce = fn => {
  let timeout: number;

  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, 300);
  }
}

const getWindowSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight
})

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<TWindowSize>(getWindowSize)

  useEffect(() => {
    const updateSize = debounce(() => setWindowSize(getWindowSize))
    window.addEventListener('resize', updateSize)
    return () => {
      window.removeEventListener('resize', updateSize);
    }
  }, [])

  return windowSize
}
