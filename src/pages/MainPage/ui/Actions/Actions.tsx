import { SquarePen, Share } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import styles from "./Actions.module.css";

export const Actions = () => {
  const [isVis, setIsVis] = useState(true);

  return (
    <div className={styles.actionSection}>
      <Button onClick={() => setIsVis(false)} after={<SquarePen style={{ width: '1rem', height: '1rem' }} />}>
        Создать квиз
      </Button>
      {isVis &&<Button after={<Share style={{ width: '1rem', height: '1rem' }} />}>
        Поделиться
      </Button>}
    </div>
  )
}
