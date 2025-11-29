import { useLocation } from "react-router-dom";
import { useLayoutEffect, useRef } from "react";
import { Home, CircleCheckBig, User } from "lucide-react";
import clsx from "clsx";
import { useAppConfigStore } from "@/shared/config/store";
import { navigateTo } from "@/shared/utils/navigateTo";
import styles from './Navigation.module.css';

const items = [
  { id: 1, title: 'Главная', icon: Home, link: '/' },
  { id: 2, title: 'Квизы', icon: CircleCheckBig, link: '/quizzes' },
  { id: 3, title: 'Профиль', icon: User, link: '/profile' },
]

export const Navigation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isNavigationVisible = useAppConfigStore(store => store.isNavigationVisible)
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (containerRef?.current?.offsetHeight) {
      document.documentElement.style.setProperty(
        "--navigation-height",
        containerRef.current.offsetHeight + 'px'
      );
    }
  }, [])

  return (
    <div className={clsx(styles.container, !isNavigationVisible && styles.hide)}>
      <div ref={containerRef} className={styles.list}>
        {items.map(({ id, link, title, icon: Icon }) => {
          const active = pathname.includes(link) && link !== '/' || pathname === link;
          return (
            <button
              key={id}
              type='button'
              className={clsx(styles.item, active && styles.active)}
              onClick={() => navigateTo(link)}
            >
              <Icon className={styles.icon} />
              {title}
            </button>
          )
        })}
      </div>
    </div>
  )
}
