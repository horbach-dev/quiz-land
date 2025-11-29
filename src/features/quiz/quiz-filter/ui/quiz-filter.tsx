import { Button } from "@/shared/ui/Button";
import { SearchCheck } from "lucide-react";
import { QuizFilterLayout } from "./quiz-filter-layout";

export const QuizFilter = ({ isOpen, onClose }) => {
  const handleSearch = () => {
    onClose();
  }

  return (
    <QuizFilterLayout
      isOpen={isOpen}
      onClose={onClose}
      actions={(
        <Button
          onClick={handleSearch}
          after={<SearchCheck />}
        >
          Поиск
        </Button>
      )}
    >
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
      <p>Text</p>
    </QuizFilterLayout>
  )
}
