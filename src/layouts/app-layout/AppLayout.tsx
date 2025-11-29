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
import { swipeBehavior } from "@telegram-apps/sdk-react";
import { CHANGE_APP_ROUTE_EVENT } from "@/constants";
import { useAppConfigStore } from "@/shared/config/store";
import { Navigation } from "@/features/navigation";
import { getSafeArea } from "@/shared/utils/getSafeeArea";
import { Background } from "@/shared/ui/Background";
import styles from './AppLayout.module.css';

interface CustomEvent extends Event {
  detail?: string;
}

export const AppLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const setSafeArea = useAppConfigStore(state => state.setSafeArea)

  // safe areas
  useLayoutEffect(() => {
    swipeBehavior?.mount()
    swipeBehavior?.disableVertical()
    getSafeArea().then(setSafeArea);
  }, []);

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
