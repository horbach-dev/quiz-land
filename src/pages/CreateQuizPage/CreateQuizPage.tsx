import clsx from "clsx";
import { Page } from "@/shared/ui/Page";
import { Input } from "@/shared/shadcn/ui/input";
import '@/shared/styles/globals.css';
import styles from './CreateQuizPage.module.css';

export default function CreateQuizPage() {
  return (
    <Page>
      <div className={clsx(styles.container, 'tail-styles')}>
        Create
        <Input />
      </div>
    </Page>
  )
}
