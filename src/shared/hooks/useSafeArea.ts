import { useSignal, viewport } from "@telegram-apps/sdk-react";

const DEFAULT_TOP = 0
const DEFAULT_BOTTOM = 24

export const useSafeArea = () => {
  const viewportSignal = useSignal(viewport.state)

  console.log(viewportSignal)

  const top =
    viewportSignal?.contentSafeAreaInsets?.top + viewportSignal?.safeAreaInsets?.top || DEFAULT_TOP
  const bottom =
    viewportSignal?.contentSafeAreaInsets?.bottom + viewportSignal?.safeAreaInsets?.bottom || DEFAULT_BOTTOM

  return { top, bottom }
}
