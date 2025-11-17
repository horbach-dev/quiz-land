import { MainPage } from "@/pages/MainPage";
import { QuizPage } from "@/pages/QuizPage";
import { QuizProgressPage } from "@/pages/QuizProgressPage";
import { QuizzesPage } from "@/pages/QuizesPage";
import { ProfilePage } from "@/pages/ProfilePage";
import type { JSX } from "react";

export type TRoute = {
  path: string;
  Component: (props?: any) => JSX.Element | null;
  title: string,
  children?: TRoute[];
}

export const routes: TRoute[] = [
  { path: '/', Component: MainPage, title: 'Main page' },
  { path: '/quizzes', Component: QuizzesPage, title: 'Quizzes page' },
  { path: '/quiz/:id', Component: QuizPage, title: 'Quiz page'},
  { path: '/quiz/:id/progress', Component: QuizProgressPage, title: 'Quiz progress page' },
  { path: '/profile', Component: ProfilePage, title: 'Profile page' },
]
