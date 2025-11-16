import {type ReactNode, useLayoutEffect, useRef, useState} from "react";
import { useLocation, useOutlet } from "react-router-dom";
import clsx from "clsx";
import { requestContentSafeAreaInsets, requestSafeAreaInsets } from "@telegram-apps/sdk-react";
import { Navigation } from "../Navigation";
import styles from './AppLayout.module.css'

export const AppLayout = () => {
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const prevPathname = useRef(pathname);

  const [isAnimating, setIsAnimating] = useState(false);
  const [prevOutlet, setPrevOutlet] = useState<ReactNode>(null);
  const [currentOutlet, setCurrentOutlet] = useState<ReactNode>(outlet);
  const [top, setTop] = useState(0);

  // safe areas
  useLayoutEffect(() => {
    (async () => {
      const { top } = await requestSafeAreaInsets();
      const { top: topContent } = await requestContentSafeAreaInsets();
      setTop(top + topContent);
    })();
  }, []);

  // page transition logic
  useLayoutEffect(() => {
    if (prevPathname.current !== pathname) {
      requestAnimationFrame(() => {
        setPrevOutlet(currentOutlet);
        setCurrentOutlet(outlet);
        setIsAnimating(true);
      })

      setTimeout(() => {
        setPrevOutlet(null);
        setIsAnimating(false);
      }, 400);

      prevPathname.current = pathname;
    }
  }, [pathname]);

  return (
    <>
      <div
        className={clsx(styles.layout, isAnimating && styles.hide)}
        style={{ paddingTop: top }}
      >
        {!isAnimating && (
          <div className={styles.content}>
            {currentOutlet}
          </div>
        )}
        {prevOutlet && (
          <div className={styles.content}>
            {prevOutlet}
          </div>
        )}
      </div>
      <Navigation />
    </>
  )
}
