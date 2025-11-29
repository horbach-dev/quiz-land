import { useEffect } from "react";

const element = document.getElementById("root")!;
const SWIPE_DISTANCE = 100;
const GAP = 20

export const useSwipeEvents = (container: { current: HTMLDivElement | null }, onSwipeRight: () => void) => {

  useEffect(() => {
    let touchStartY = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    function touchStart (event) {
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
      touchEndX = 0;
      touchEndY = 0;
    }

    function touchmove (event) {
      touchEndX = event.touches[0].clientX;
      touchEndY = event.touches[0].clientY;

      if (container.current) {
        container.current.style.transition = 'none'
        const delta = touchEndX - touchStartX - Math.abs(touchEndY - touchStartY) - GAP
        if (delta < GAP) {
          container.current.style.transform = `translateX(${delta}px)`;
        } else {
          const scale = Math.min((delta - GAP) * 2, SWIPE_DISTANCE)
          container.current.style.transform = `scale(${(scale / (SWIPE_DISTANCE * 2)) + 1}) translateX(${GAP}px)`;
        }
      }
    }

    function touchend () {
      if (container.current) {
        container.current.style.transition = 'transform 0.3s'
        container.current.style.transform = `translateX(0) scale(1)`;
      }
      if (touchEndX === 0) return;

      const deltaX = touchEndX - touchStartX - Math.abs(touchEndY - touchStartY) - GAP

      if (Math.abs(deltaX) > SWIPE_DISTANCE) {
        if (deltaX > 0) {
          if (onSwipeRight) onSwipeRight();
          console.log("Swipe Left detected");
        }
      }

      touchStartX = 0;
      touchStartY = 0;
      touchEndX = 0;
      touchEndY = 0;
    }

    element.addEventListener('touchstart', touchStart);
    element.addEventListener('touchmove', touchmove);
    element.addEventListener('touchend', touchend);

    return () => {
      element.removeEventListener('touchstart', touchStart);
      element.removeEventListener('touchmove', touchmove);
      element.removeEventListener('touchend', touchend);
    }
  }, [])
}
