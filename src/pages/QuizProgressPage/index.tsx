import { lazy, Suspense } from "react";
import { PageLoader } from "@/shared/ui/PageLoader";

export const Page = lazy(() => import('./QuizProgressPage'))
export const QuizProgressPage = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Page />
  </Suspense>
)
}
