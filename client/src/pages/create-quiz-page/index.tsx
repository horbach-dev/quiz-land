import { lazy, Suspense } from "react";
import { PageLoader } from "@/shared/ui/PageLoader";

export const Page = lazy(() => import('./create-quiz-page'))
export const CreateQuizPage = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Page />
    </Suspense>
  )
}
