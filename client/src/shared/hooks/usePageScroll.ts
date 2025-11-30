import { useEffect, useState } from "react";
import { throttle } from "@/shared/utils/throttle.ts";

export const usePageScroll = () => {
  const [scroll, setScroll] = useState<number>(0)

  useEffect(() => {
    const updateScroll = throttle(() => setScroll(window.pageYOffset), 300)
    window.addEventListener('scroll', updateScroll)
    return () => {
      window.removeEventListener('scroll', updateScroll);
    }
  }, [])

  return scroll
}
