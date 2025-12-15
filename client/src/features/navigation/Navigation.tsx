import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { useCssVarElementHeight } from '@/shared/hooks/useCssVarElementHeight';
import { useAppStore } from '@/shared/stores/appStore';
import { navigateTo } from '@/shared/utils/navigateTo';

import { NAVIGATION_ITEMS } from './config';
import styles from './Navigation.module.css';

export const Navigation = () => {
  const { t } = useTranslation();
  const isNavigationVisible = useAppStore((store) => store.isNavigationVisible);
  const { pathname } = useLocation();
  const containerRef = useCssVarElementHeight('--navigation-height');

  return (
    <div className={clsx(styles.container, !isNavigationVisible && styles.hide)}>
      <div
        ref={containerRef}
        className={styles.list}
      >
        {NAVIGATION_ITEMS.map(({ id, link, title, icon: Icon }) => {
          const active = (pathname.includes(link) && link !== '/') || pathname === link;
          return (
            <button
              key={id}
              type='button'
              className={clsx(styles.item, active && styles.active)}
              onClick={() => navigateTo(link)}
            >
              <Icon className={styles.icon} />
              {t(title)}
            </button>
          );
        })}
      </div>
    </div>
  );
};
