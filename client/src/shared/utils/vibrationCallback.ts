import { hapticFeedback } from "@tma.js/sdk-react";

export const vibrationCallback = () => {
  if (hapticFeedback?.isSupported()) {
    hapticFeedback.impactOccurred('light')
  }
}
