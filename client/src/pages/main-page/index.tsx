import { lazy, Suspense } from "react";
import { PageLoader } from "@/shared/ui/PageLoader";

export const Page = lazy(() => import('./main-page.tsx'))
export const MainPage = () => {
  return  (
    <Suspense fallback={<PageLoader />}>
      <Page />
    </Suspense>
  )
}
