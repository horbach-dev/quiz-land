import { Button } from "@/shared/ui/Button";
import { SearchCheck, Trash2 } from "lucide-react";
import { QuizFilterLayout } from "./quiz-filter-layout";

export const QuizFilter = ({ isOpen, onClose }) => {
  const handleSearch = () => {
    onClose();
  }

  const handleClearSearch = () => {}

  return (
    <QuizFilterLayout
      isOpen={isOpen}
      onClose={onClose}
      title='Поиск квизов'
      clearButton={(
        <Button
          size='sm'
          style='white'
          disabled={true}
          onClick={handleClearSearch}
          after={<Trash2 />}
        >
          Очистить
        </Button>
      )}
      searchButton={(
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
      <p>Text</p>ё
    </QuizFilterLayout>
  )
}
