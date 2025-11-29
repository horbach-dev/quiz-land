import { lazy, Suspense } from "react";
import { PageLoader } from "@/shared/ui/PageLoader";

// export { MainPage } from "./MainPage";


export const Page = lazy(() => import('./MainPage'))
export const MainPage = () => {
  return  (
    <Suspense fallback={<PageLoader />}>
      <Page />
    </Suspense>
  )
}
