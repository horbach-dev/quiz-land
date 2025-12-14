import { createHashRouter, Navigate } from 'react-router';

import { AppLayout } from '@/layouts/app-layout';
import { appLayoutLoader } from '@/layouts/app-layout/appLayoutLoader';
import { CreateQuizPage } from '@/pages/create-quiz-page';
import { EditQuizPage } from '@/pages/edit-quiz-page';
import { editQuizLoader } from '@/pages/edit-quiz-page/loader';
import { MainPage } from '@/pages/main-page';
import { ProfilePage } from '@/pages/profile-page';
import { QuizCompletedPage } from '@/pages/quiz-completed-page';
import { quizCompletedLoader } from '@/pages/quiz-completed-page/loader';
import { QuizPage } from '@/pages/quiz-page';
import { QuizzesPage } from '@/pages/quizzes-page';

export const routes = [
  {
    path: '/',
    element: <AppLayout />,
    loader: appLayoutLoader,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'create',
        element: <CreateQuizPage />,
      },
      {
        path: 'edit/:id',
        loader: editQuizLoader,
        element: <EditQuizPage />,
        title: 'Edit quiz',
      },
      {
        path: 'quizzes',
        element: <QuizzesPage />,
      },
      {
        path: 'quiz/:id',
        element: <QuizPage />,
      },
      {
        path: 'completed/:id',
        element: <QuizCompletedPage />,
        loader: quizCompletedLoader,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      { path: '*', element: <Navigate to='/' /> },
    ],
  },
];

export const router = createHashRouter(routes);
