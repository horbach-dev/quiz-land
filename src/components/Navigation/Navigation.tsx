import {Link, useLocation, useParams} from "react-router-dom";
import { Home, CircleCheckBig, User } from "lucide-react";
import styles from './Navigation.module.css'
import clsx from "clsx";

const items = [
  { id: 1, title: 'Главная', icon: <Home />, link: '/' },
  { id: 2, title: 'Квизы', icon: <CircleCheckBig />, link: '/quiz' },
  { id: 3, title: 'Профиль', icon: <User />, link: '/profile' },
]

export const Navigation = () => {
  const { pathname } = useLocation();
  const { id } = useParams();

  const isHide = pathname.includes('/quiz') && !!id

  return (
    <div className={clsx(styles.container, isHide && styles.hide)}>
      <div className={styles.list}>
        {items.map((item) => {
          const active = pathname.includes(item.link) && item.link !== '/';
          const isMain = pathname === item.link

          return (
            <Link
              key={item.id}
              className={clsx(styles.item, (active || isMain) && styles.active)}
              to={item.link}
            >
              {item.icon}
              {item.title}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
