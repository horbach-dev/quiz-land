import {
  viewportSafeAreaInsetBottom,
  viewportContentSafeAreaInsetTop,
  viewportSafeAreaInsetTop,
  viewportContentSafeAreaInsetBottom
} from "@telegram-apps/sdk-react";

const DEFAULT_BOTTOM = 22

export const getSafeArea = async () => {
  try {
    const top = viewportContentSafeAreaInsetTop() + viewportSafeAreaInsetTop()
    const bottom = viewportContentSafeAreaInsetBottom() + viewportSafeAreaInsetBottom()

    return {
      top,
      bottom: bottom ? bottom : DEFAULT_BOTTOM
    }
  } catch (_: any) {
    return {
      top: 0,
      bottom: DEFAULT_BOTTOM
    }
  }
}
