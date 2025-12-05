import {
  type PropsWithChildren,
  type ReactNode,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { Button } from "@/shared/components/Button";
import styles from './popover.module.css'

interface IProps {
  text: ReactNode
  onConfirm: () => void
  onCancel?: () => void
}

export const Popover = ({
  children,
  text,
  onConfirm,
  onCancel
}: PropsWithChildren<IProps>) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null)
  const childrenRef = useRef<HTMLDivElement | null>(null)
  const popoverRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleConfirm = () => {
    setIsOpen(false)
    onConfirm()
  }

  const handleCancel = () => {
    setIsOpen(false)
    onCancel?.()
  }

  const handleChildrenClick = () => {
    setWindowWidth(window.innerWidth)
    setIsOpen(open => !open)
  }

  useLayoutEffect(() => {
    if (childrenRef.current && popoverRef.current && isOpen) {
      const { left: popoverLeft, width: popoverWidth } = popoverRef.current.getBoundingClientRect()
      const { width: childrenWidth } = childrenRef.current.getBoundingClientRect()

      popoverRef.current.style.bottom = `calc(100% + 0.7rem)`;

      if (windowWidth - popoverLeft - popoverWidth < 20) {
        popoverRef.current.style.right = '0';
        return;
      }

      popoverRef.current.style.left = `calc(-${popoverWidth / 2 - childrenWidth / 2}px)`;
    }
  }, [isOpen])

  useClickOutside({
    ref: containerRef,
    onClickOutside: () => setIsOpen(false)
  })

  return (
    <div
      ref={containerRef}
      className={styles.popover}
    >
      {isOpen && (
        <div
          ref={popoverRef}
          className={styles.popoverContent}
        >
          {text}
          <div className={styles.popoverActions}>
            <Button
              style='default'
              size='sm'
              onClick={handleConfirm}
            >
              Да
            </Button>
            <Button
              style='white'
              size='sm'
              onClick={handleCancel}
            >
              Нет
            </Button>
          </div>
        </div>
      )}
      <div
        onClick={handleChildrenClick}
        ref={childrenRef}
      >
        {children}
      </div>
    </div>
  )
}
