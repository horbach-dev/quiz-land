import { CHANGE_APP_ROUTE_EVENT } from "@/constants/app.ts";

export const navigateTo = (url: string) => {
  document.dispatchEvent(
    new CustomEvent(CHANGE_APP_ROUTE_EVENT, {
      detail: url,
    }),
  )
}
