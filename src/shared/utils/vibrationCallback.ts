import { hapticFeedback } from "@telegram-apps/sdk-react";

export const vibrationCallback = () => {
  hapticFeedback.impactOccurred('light')
}
