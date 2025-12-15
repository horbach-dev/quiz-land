import type { TQuiz } from '@/shared/types/quiz';
import { preloadImages } from '@/shared/utils/preloadImages';

export function preloadAssets(quiz: TQuiz, callback: () => void) {
  const images: string[] = [];

  if (quiz?.questions) {
    quiz?.questions.forEach((question) => {
      if (question?.image) {
        images.push(question.image);
      }

      question.options.forEach((option) => {
        if (option?.image) {
          images.push(option.image);
        }
      });
    });
  }

  if (!images.length) {
    return callback();
  }

  preloadImages(images, callback);
};
