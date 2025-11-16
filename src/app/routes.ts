import { MainPage } from "../pages/MainPage";
import { QuizPage } from "../pages/QuizPage";
import { QuizzesPage } from "../pages/QuizesPage";
import { ProfilePage } from "../pages/ProfilePage";

export const routes = [
  { path: '/', Component: MainPage, title: 'Main page' },
  { path: '/quiz', Component: QuizzesPage, title: 'Quizzes page' },
  { path: '/quiz/:id', Component: QuizPage, title: 'Quiz page' },
  { path: '/profile', Component: ProfilePage, title: 'Profile page' },
]
