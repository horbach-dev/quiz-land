import { hapticFeedback, isHapticFeedbackSupported } from "@telegram-apps/sdk-react";

export const vibrationCallback = () => {
  if (isHapticFeedbackSupported()) {
    hapticFeedback.impactOccurred('light')
  }
}
