import {
  useEffect,
  useLayoutEffect,
  useState
} from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import { requestContentSafeAreaInsets, requestSafeAreaInsets } from "@telegram-apps/sdk-react";
import { CHANGE_APP_ROUTE_EVENT, PAGE_TRANSITION_DELAY } from "@/constants/app";
import { Navigation } from "@/components/Navigation";
import styles from './AppLayout.module.css';

interface CustomEvent extends Event {
  detail?: string;
}

export const AppLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isAnimating, setIsAnimating] = useState(false);
  const [{ top, bottom }, setPaddings] = useState<{ top: number, bottom: number }>({ top: 0, bottom: 0 });

  // safe areas
  useLayoutEffect(() => {
    (async () => {
      const { top, bottom } = await requestSafeAreaInsets();
      const { top: topContent, bottom: bottomContent } = await requestContentSafeAreaInsets();
      setPaddings({
        top: top + topContent,
        bottom: bottom + bottomContent
      });
    })();
  }, []);

  function updateRoute(route: CustomEvent) {
    if (route.detail === pathname) return

    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false)
      navigate(route.detail!)
    }, PAGE_TRANSITION_DELAY)
  }

  useEffect(() => {
    document.addEventListener(CHANGE_APP_ROUTE_EVENT, updateRoute)

    return () => {
      document.removeEventListener(CHANGE_APP_ROUTE_EVENT, updateRoute)
    }
  }, [pathname]);

  return (
    <>
      <div
        className={clsx(styles.layout, isAnimating && styles.hide)}
        style={{
          paddingTop: top,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          '--padding-bottom': bottom + 'px'
      }}
      >
        <Outlet />
      </div>
      <Navigation paddingBottom={bottom} />
    </>
  )
}
