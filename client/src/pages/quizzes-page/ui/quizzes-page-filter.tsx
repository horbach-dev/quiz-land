import { FilterIcon } from "lucide-react";
import { useState } from "react";
import {useTranslation} from "react-i18next";
import { Button } from "@/shared/components/Button";
import { QuizFilter } from "@/features/quiz/quiz-filter";

export const QuizzesPageFilter = () => {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleShowFilter = () => {
    setIsFilterOpen(true)
  }

  const handleHideFilter = () => {
    setIsFilterOpen(false)
  }

  return (
    <>
      <Button
        size='sm'
        after={<FilterIcon />}
        onClick={handleShowFilter}
      >
        {t('quizzes_page.search')}
      </Button>
      <QuizFilter
        isOpen={isFilterOpen}
        onClose={handleHideFilter}
      />
    </>
  )
}
