import { useTranslation } from 'react-i18next';

import { SectionHeader } from '@/shared/components/SectionHeader';
import { FieldSet } from '@/shared/shadcn/ui/field';

import { QuestionsListItem } from '../QuestionsListItem';
import { QuestionsListFooter } from './components/QuestionsListFooter';
import { useQuestionsList } from './hooks/useQuestionsList';

export const QuestionsList = () => {
  const { t } = useTranslation();
  const { fields, addQuestion, removeQuestion } = useQuestionsList({
    translate: t,
  });

  return (
    <FieldSet className='mb-5'>
      <SectionHeader
        title={t('create_page.questions.title')}
        description={t('create_page.questions.description')}
      />

      {fields.map((item, index) => {
        return (
          <QuestionsListItem
            key={item.id}
            id={item.containerId}
            index={index}
            removeQuestion={() => removeQuestion(index)}
          />
        );
      })}

      <QuestionsListFooter onClick={addQuestion} />
    </FieldSet>
  );
};
