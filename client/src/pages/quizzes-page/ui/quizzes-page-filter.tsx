import { FilterIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { QuizFilter } from "@/features/quiz/quiz-filter";

export const QuizzesPageFilter = () => {
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
        Поиск
      </Button>
      <QuizFilter
        isOpen={isFilterOpen}
        onClose={handleHideFilter}
      />
    </>
  )
}
