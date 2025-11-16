import './styles.css'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from "./ErrorBoundary";
import { routes } from './routes';
import { Background } from "../components/Background";
import { AppLayout } from "../components/AppLayout";
// import {useMemo} from "react";
// import { useAppStore } from "../stores/appStore";
// import { IntroSlider } from "../components/IntroSlider";

function Root() {
  // const themeParams = useWebAppThemeParams();
  // const WebApp = useWebApp();
  // const appStore = useAppStore();
  // const launchParams = useMemo<any>(() => retrieveLaunchParams(), []);
  // const isDark = useSignal(isMiniAppDark);

  return (
    <ErrorBoundary>
      {/*{appStore.intro.show && <IntroSlider />}*/}
      <Background />
        <HashRouter>
          <Routes>
            <Route element={<AppLayout />}>
              {routes.map(route => (
                <Route
                  key={route.path}
                  path={route.path}
                  Component={route.Component}
                />
              ))}
            </Route>
            <Route path="*" element={<Navigate to="/"/>} />
          </Routes>
        </HashRouter>
    </ErrorBoundary>
  );
}

export default Root;
