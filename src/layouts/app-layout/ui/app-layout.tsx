import { Outlet, ScrollRestoration } from "react-router-dom";
import { Navigation } from "@/features/navigation";
import { Background } from "@/shared/ui/Background";
import { RotationAlert } from "@/features/rotation-alert";
import { SwipeRedirect } from "@/features/swipe-redirect";
import { useViewportSettings } from "../useViewportSettings";
import { useRouteListener } from "../useRouteListener";
import styles from './app-layout.module.css';

export const AppLayout = () => {
  const { isMain, isCreateQuiz } = useRouteListener()
  const { isMobile } = useViewportSettings()

  return (
    <>
      <Background />
      <div className={styles.layout}>
        <Outlet />
      </div>
      <ScrollRestoration />
      <Navigation />
      {!isMain && <SwipeRedirect />}
      {isMobile && !isCreateQuiz && <RotationAlert />}
    </>
  )
}
