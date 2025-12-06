import { useLaunchParams } from '@tma.js/sdk-react';
import { useEffect, useState } from 'react';
import { type NavigateOptions, useLocation, useNavigate } from 'react-router-dom';

import { CHANGE_APP_ROUTE_EVENT } from '@/shared/constants';

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
  }, [tgWebAppStartParam, isRedirected, navigate]);

  useEffect(() => {
    document.addEventListener(CHANGE_APP_ROUTE_EVENT, updateRoute);

    return () => {
      document.removeEventListener(CHANGE_APP_ROUTE_EVENT, updateRoute);
    };
    // eslint-disable-next-line
  }, [pathname]);

  return { pathname };
}
