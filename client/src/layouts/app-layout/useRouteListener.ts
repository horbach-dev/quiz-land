import { useEffect, useState } from 'react';
import { CHANGE_APP_ROUTE_EVENT } from '@/shared/constants';
import {
  useLocation,
  useNavigate,
  type NavigateOptions,
} from 'react-router-dom';
import { useLaunchParams } from '@tma.js/sdk-react';

interface CustomEvent extends Event {
  detail?: {
    pathname: string;
    options?: NavigateOptions;
  };
}

export function useRouteListener() {
  const [isRedirected, setIsRedirected] = useState<boolean>(false);
  const { tgWebAppStartParam } = useLaunchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function updateRoute({ detail }: CustomEvent) {
    if (detail?.pathname === pathname) return;
    if (detail?.pathname) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      navigate(detail.pathname === 'back-navigate' ? -1 : detail.pathname);
    }
  }

  useEffect(() => {
    if (tgWebAppStartParam && !isRedirected) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsRedirected(true);
      navigate(`quiz/${tgWebAppStartParam}`);
    }
  }, [tgWebAppStartParam, isRedirected]);

  useEffect(() => {
    document.addEventListener(CHANGE_APP_ROUTE_EVENT, updateRoute);

    return () => {
      document.removeEventListener(CHANGE_APP_ROUTE_EVENT, updateRoute);
    };
  }, [pathname]);

  return {
    isMain: pathname === '/',
    isCreateQuiz: pathname === '/create',
  };
}
