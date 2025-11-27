import { requestContentSafeAreaInsets, requestSafeAreaInsets } from "@telegram-apps/sdk-react";

const DEFAULT_BOTTOM = 24

export const getSafeArea = async () => {
  try {
    const screen = await requestSafeAreaInsets();
    const content = await requestContentSafeAreaInsets();
    const bottom = screen.bottom + content.bottom

    return {
      top: screen.top + content.top,
      bottom: bottom > 0 ? bottom : DEFAULT_BOTTOM
    }
  } catch (_: any) {
    return {
      top: 0,
      bottom: DEFAULT_BOTTOM
    }
  }
}
