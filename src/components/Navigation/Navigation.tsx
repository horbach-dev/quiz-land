import { useLocation, useParams } from "react-router-dom";
import { Home, CircleCheckBig, User } from "lucide-react";
import clsx from "clsx";
import { navigateTo } from "@/shared/utils/navigateTo";
import styles from './Navigation.module.css';

const items = [
  { id: 1, title: 'Главная', icon: <Home />, link: '/' },
  { id: 2, title: 'Квизы', icon: <CircleCheckBig />, link: '/quizzes' },
  { id: 3, title: 'Профиль', icon: <User />, link: '/profile' },
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
      style={{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        '--padding-bottom': paddingBottom + 'px',
      }}
      className={clsx(styles.container, isHide && styles.hide)}
    >
      <div className={styles.list}>
        {items.map((item) => {
          const active =
            pathname.includes(item.link) && item.link !== '/' ||
            pathname === item.link;

          return (
            <button
              key={item.id}
              className={clsx(styles.item, active && styles.active)}
              onClick={() => navigateTo(item.link)}
            >
              {item.icon}
              {item.title}
            </button>
          )
        })}
      </div>
    </div>
  )
}
