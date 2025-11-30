import {
  useEffect,
  useLayoutEffect,
} from "react";
import {
  Outlet,
  useNavigate,
  useLocation,
  ScrollRestoration
} from "react-router-dom";
import {swipeBehavior, useLaunchParams, viewport} from "@tma.js/sdk-react";
import { CHANGE_APP_ROUTE_EVENT } from "@/constants";
import { Navigation } from "@/features/navigation";
import { Background } from "@/shared/ui/Background";
import styles from './app-layout.module.css';

const fullscreenPlatforms = ['ios', 'android']

interface CustomEvent extends Event {
  detail?: string;
}

export const AppLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { tgWebAppPlatform } = useLaunchParams()
  const isFullscreen = fullscreenPlatforms.includes(tgWebAppPlatform)

  // safe areas
  useLayoutEffect(() => {
    if (swipeBehavior?.isSupported()) {
      swipeBehavior?.mount()
      swipeBehavior?.disableVertical()
    }

    if (isFullscreen && viewport.requestFullscreen?.isAvailable()) {
      viewport.requestFullscreen();
    }
  }, [isFullscreen]);

  function updateRoute(route: CustomEvent) {
    if (route.detail === pathname) return
    if (route.detail) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      navigate(route.detail === 'back-navigate' ? -1 : route.detail)
    }
  }

  useEffect(() => {
    document.addEventListener(CHANGE_APP_ROUTE_EVENT, updateRoute)

    return () => {
      document.removeEventListener(CHANGE_APP_ROUTE_EVENT, updateRoute)
    }
  }, [pathname]);

  return (
    <>
      <Background />
      <div className={styles.layout}>
        <Outlet />
      </div>
      <ScrollRestoration />
      <Navigation />
    </>
  )
}
