import { SquarePen, Share } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import styles from "./Actions.module.css";

export const Actions = () => {
  return (
    <div className={styles.actionSection}>
      <Button
        to='/create'
        after={<SquarePen />}
      >
        Создать квиз
      </Button>
      <Button after={<Share />}>
        Поделиться
      </Button>
    </div>
  )
}
