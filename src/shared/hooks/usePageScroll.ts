import {useEffect, useRef, useState} from "react";
import { throttle } from "@/shared/utils/throttle";

export const usePageScroll = () => {
  const [scroll, setScroll] = useState<number>(0)
  const throttleFn = useRef(throttle)

  useEffect(() => {
    const updateScroll = throttleFn.current(() => setScroll(window.pageYOffset), 300)
    window.addEventListener('scroll', updateScroll)
    return () => {
      window.removeEventListener('scroll', updateScroll);
    }
  }, [])

  return scroll
}
