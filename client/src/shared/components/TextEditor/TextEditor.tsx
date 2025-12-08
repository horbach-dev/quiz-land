import { Redo2, Undo2 } from 'lucide-react';
import Editor, {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnUnderline,
  BtnUndo,
  Toolbar,
} from 'react-simple-wysiwyg';

import styles from './TextEditor.module.css';

interface IProps {
  id?: string;
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
}

export const TextEditor = ({ value, onChange, placeholder }: IProps) => {
  return (
    <>
      <div className={styles.editor}>
        <Editor
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        >
          <Toolbar className={styles.editorHeader}>
            <div className={styles.editorBtnWrap}>
              <Undo2 className={styles.editorBtnIcon} />
              <BtnUndo className={styles.editorBtn} />
            </div>
            <div className={styles.editorBtnWrap}>
              <Redo2 className={styles.editorBtnIcon} />
              <BtnRedo className={styles.editorBtn} />
            </div>
            <BtnBold className={styles.editorBtn} />
            <BtnItalic className={styles.editorBtn} />
            <BtnUnderline className={styles.editorBtn} />
            <BtnStrikeThrough className={styles.editorBtn} />
            <BtnBulletList className={styles.editorBtn} />
            <BtnNumberedList className={styles.editorBtn} />
          </Toolbar>
        </Editor>
      </div>
    </>
  );
};
