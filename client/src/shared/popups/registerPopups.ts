import { DefaultPopup } from './components/DefaultPopup';
import { ExitSessionPopup } from './components/ExitSessionPopup';
import { QuizErrorPopup } from './components/QuizErrorPopup';

export const registerPopups = {
  defaultPopup: DefaultPopup,
  quizError: QuizErrorPopup,
  sessionEndConfirmation: ExitSessionPopup,
};
