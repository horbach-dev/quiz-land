import { useEffect } from "react";

const element = document.getElementById("root")!;

export const useSwipeEvents = (container: { current: HTMLDivElement | null }, onSwipeRight: () => void) => {

  useEffect(() => {
    let touchStartY = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    const minSwipeDistance = 100;
    const gap = 20

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
        const delta = touchEndX - touchStartX - Math.abs(touchEndY - touchStartY) - gap
        if (delta < gap) {
          container.current.style.transform = `translateX(${delta}px)`;
        } else {
          const scale = Math.min((delta - gap) * 2, minSwipeDistance)
          container.current.style.transform = `scale(${(scale / (minSwipeDistance * 2)) + 1}) translateX(${gap}px)`;
        }
      }
    }

    function touchend () {
      if (container.current) {
        container.current.style.transition = 'transform 0.3s'
        container.current.style.transform = `translateX(0) scale(1)`;
      }
      if (touchEndX === 0) return;

      const deltaX = touchEndX - touchStartX - Math.abs(touchEndY - touchStartY) - gap

      if (Math.abs(deltaX) > minSwipeDistance) {
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
