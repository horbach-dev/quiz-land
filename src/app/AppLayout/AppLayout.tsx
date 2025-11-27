import {
  useEffect,
  useLayoutEffect,
  useState
} from "react";
import {
  Outlet,
  useNavigate,
  useLocation,
  ScrollRestoration
} from "react-router-dom";
import clsx from "clsx";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { CHANGE_APP_ROUTE_EVENT } from "@/constants.ts";
import { RotationAlert } from "@/features/rotation-alert";
import { Navigation } from "@/widgets/Navigation";
import { getSafeArea } from "@/shared/utils/getSafeeArea.ts";
import { Background } from "./ui/Background";
import styles from './AppLayout.module.css';

interface CustomEvent extends Event {
  detail?: string;
}

const launchParams = retrieveLaunchParams();
const isShowRotationAlert = ['ios', 'android'].includes(launchParams?.tgWebAppPlatform)

export const AppLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [{ top, bottom }, setPaddings] = useState<{ top: number, bottom: number }>({ top: 0, bottom: 24 });

  // safe areas
  useLayoutEffect(() => {
    getSafeArea().then(setPaddings);
  }, []);

  function updateRoute(route: CustomEvent) {
    if (route.detail === pathname) return
    if (route.detail) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      navigate(route.detail === 'navigate-back' ? -1 : route.detail)
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
      <div
        className={clsx(styles.layout)}
        style={{
          '--padding-top': top + 'px',
          '--padding-bottom': `calc(5rem + ${bottom}px)`
      }}
      >
        <Outlet />
      </div>
      <ScrollRestoration />
      <Navigation paddingBottom={bottom} />
      {isShowRotationAlert && <RotationAlert />}
    </>
  )
}
