import {useEffect} from "react";
import { CHANGE_APP_ROUTE_EVENT } from "@/constants";
import { useLocation, useNavigate, type NavigateOptions } from "react-router-dom";

interface CustomEvent extends Event {
  detail?: {
    pathname: string,
    options?: NavigateOptions
  }
}

export function useRouteListener() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function updateRoute({ detail }: CustomEvent) {
    if (detail?.pathname === pathname) return
    if (detail?.pathname) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      navigate(detail.pathname === 'back-navigate' ? -1 : detail.pathname)
    }
  }

  useEffect(() => {
    document.addEventListener(CHANGE_APP_ROUTE_EVENT, updateRoute)

    return () => {
      document.removeEventListener(CHANGE_APP_ROUTE_EVENT, updateRoute)
    }
  }, [pathname]);

  return {
    isMain: pathname === '/',
    isCreateQuiz: pathname === '/create'
  }
}
