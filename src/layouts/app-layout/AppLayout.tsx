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
import { swipeBehavior } from "@tma.js/sdk-react";
import { CHANGE_APP_ROUTE_EVENT } from "@/constants";
import { Navigation } from "@/features/navigation";
import { Background } from "@/shared/ui/Background";
import styles from './AppLayout.module.css';

interface CustomEvent extends Event {
  detail?: string;
}

const getStypes = () => {
  const computedStyles = getComputedStyle(document.documentElement);
  const cssVariables = {};

// Перебираем все свойства в вычисленных стилях
  for (let i = 0; i < computedStyles.length; i++) {
    const propertyName = computedStyles[i];
    // Проверяем, начинается ли свойство с '--' (это и есть CSS переменная)
    if (propertyName.startsWith('--')) {
      const value = computedStyles.getPropertyValue(propertyName).trim();
      cssVariables[propertyName] = value;
    }
  }

// Выводим объект со всеми переменными и их значениями
  console.log(cssVariables);
}

export const AppLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // safe areas
  useLayoutEffect(() => {
    console.log(getStypes())

    setTimeout(() => getStypes(), 10000)
    if (swipeBehavior?.isSupported()) {
      swipeBehavior?.mount()
      swipeBehavior?.disableVertical()
    }
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
