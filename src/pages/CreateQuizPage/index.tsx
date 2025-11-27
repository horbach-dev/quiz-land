import { lazy, Suspense } from "react";
import { PageLoader } from "@/shared/ui/PageLoader";

export const Page = lazy(() => import('./CreateQuizPage'))
export const CreateQuizPage = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Page />
    </Suspense>
  )
}
