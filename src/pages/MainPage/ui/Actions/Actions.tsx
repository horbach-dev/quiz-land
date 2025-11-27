import { SquarePen, Share } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import styles from "./Actions.module.css";

export const Actions = () => {
  return (
    <div className={styles.actionSection}>
      <Button
        to='/create'
        after={<SquarePen style={{ width: '1rem', height: '1rem' }} />}
      >
        Создать квиз
      </Button>
      <Button after={<Share style={{ width: '1rem', height: '1rem' }} />}>
        Поделиться
      </Button>
    </div>
  )
}
