import { createHashRouter, Navigate } from 'react-router-dom';

import { AppLayout } from '@/layouts/app-layout';
import { CreateQuizPage } from '@/pages/create-quiz-page';
import { EditQuizPage } from '@/pages/edit-quiz-page';
import { MainPage } from '@/pages/main-page';
import { ProfilePage } from '@/pages/profile-page';
import { QuizPage } from '@/pages/quiz-page';
import { QuizzesPage } from '@/pages/quizzes-page';

export const routes = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <MainPage />, title: 'Quiz land' },
      { path: 'create', element: <CreateQuizPage />, title: 'Create quiz' },
      { path: 'edit/:id', element: <EditQuizPage />, title: 'Edit quiz' },
      { path: 'quizzes', element: <QuizzesPage />, title: 'Quizzes page' },
      { path: 'quiz/:id', element: <QuizPage />, title: 'Quiz page' },
      { path: 'profile', element: <ProfilePage />, title: 'Profile page' },
      { path: '*', element: <Navigate to='/' /> },
    ],
  },
];

export const router = createHashRouter(routes);
