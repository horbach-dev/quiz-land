import {lazy, Suspense} from "react";
import { PageLoader } from "@/shared/ui/PageLoader";

export const Page = lazy(() => import('./QuizzesPage.tsx'))
export const QuizzesPage = () => {
  return  (
    <Suspense fallback={<PageLoader />}>
      <Page />
    </Suspense>
  )
}
