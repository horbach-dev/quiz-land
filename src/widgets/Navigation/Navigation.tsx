import { useLocation, useParams } from "react-router-dom";
import { Home, CircleCheckBig, User } from "lucide-react";
import clsx from "clsx";
import { navigateTo } from "@/shared/utils/navigateTo";
import styles from './Navigation.module.css';

const items = [
  { id: 1, title: 'Главная', icon: Home, link: '/' },
  { id: 2, title: 'Квизы', icon: CircleCheckBig, link: '/quizzes' },
  { id: 3, title: 'Профиль', icon: User, link: '/profile' },
]

interface IProps {
  paddingBottom: number
}

export const Navigation = ({ paddingBottom = 0 }: IProps) => {
  const { pathname } = useLocation();
  const { id } = useParams();

  const isHide = pathname.includes('/progress') && !!id

  return (
    <div
      style={{ '--padding-bottom': paddingBottom + 'px' }}
      className={clsx(styles.container, isHide && styles.hide)}
    >
      <div className={styles.list}>
        {items.map(({ id, link, title, icon: Icon }) => {
          const active = pathname.includes(link) && link !== '/' || pathname === link;
          return (
            <button
              key={id}
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
