import './styles.css'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from "./ErrorBoundary";
import { routes, type TRoute } from './routes';
import { Background } from "@/components/Background";
import { AppLayout } from "@/components/AppLayout";
import { useEffect } from "react";
import { login } from "@/services/auth";
import { useTelegramUser } from "@/shared/hooks/useTelegramUser.ts";
// import {useMemo} from "react";
// import { useAppStore } from "../stores/appStore";
// import { IntroSlider } from "../components/IntroSlider";

function Root() {
  const tgUser = useTelegramUser()
  // const themeParams = useWebAppThemeParams();
  // const WebApp = useWebApp();
  // const appStore = useAppStore();
  // const launchParams = useMemo<any>(() => retrieveLaunchParams(), []);
  // const isDark = useSignal(isMiniAppDark);

  useEffect(() => {
    login(tgUser)
  }, [])

  return (
    <ErrorBoundary>
      {/*{appStore.intro.show && <IntroSlider />}*/}
      <Background />
        <HashRouter>
          <Routes>
            <Route element={<AppLayout />}>
              {renderRoutes(routes)}
            </Route>
            <Route path="*" element={<Navigate to="/"/>} />
          </Routes>
        </HashRouter>
    </ErrorBoundary>
  );
}

const renderRoutes = (routes: TRoute[]) => {
  return routes.map(route => {
    if (route.children) {
      return (
        <Route
          key={route.path}
          path={route.path}
          Component={route.Component}
        >
          {renderRoutes(route.children)}
        </Route>
      )
    }

    return (
      <Route
        key={route.path}
        path={route.path}
        Component={route.Component}
      />
    )
  })
}

export default Root;
