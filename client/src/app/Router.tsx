import { createHashRouter, Navigate } from "react-router-dom";
import { MainPage } from "@/pages/main-page";
import { CreateQuizPage } from "@/pages/CreateQuizPage";
import { QuizPage } from "@/pages/QuizPage";
import { QuizProgressPage } from "@/pages/QuizProgressPage";
import { QuizzesPage } from "@/pages/quizzes-page";
import { ProfilePage } from "@/pages/ProfilePage";
import { AppLayout } from "@/layouts/app-layout";

export const routes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <MainPage />, title: 'Quiz land' },
      { path: 'create', element: <CreateQuizPage />, title: 'Create quiz' },
      { path: 'quizzes', element: <QuizzesPage />, title: 'Quizzes page' },
      { path: 'quiz/:id', element: <QuizPage />, title: 'Quiz page'},
      { path: 'quiz/progress/:id', element: <QuizProgressPage />, title: 'Quiz progress page' },
      { path: 'profile', element: <ProfilePage />, title: 'Profile page' },
      { path: "*", element: <Navigate to="/" /> }
    ]
  },
]

export const router = createHashRouter(routes);
