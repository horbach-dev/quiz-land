import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

// Начальные данные (только ID, содержимое будем рендерить отдельно)
const initialItems = ['Элемент 1', 'Элемент 2', 'Элемент 3', 'Элемент 4'];

// 1. Компонент отдельного сортируемого элемента
const SortableItem = ({ id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging // Полезный флаг для стилизации перетаскиваемого элемента
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '10px 15px',
    margin: '5px 0',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: isDragging ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
    opacity: isDragging ? 0.6 : 1,
    cursor: 'grab',
    touchAction: 'none',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes} // Пропсы доступности остаются на контейнере
    >
      <span>{id}</span>

      {/* "Ручка" для перетаскивания */}
      <button
        {...listeners} // Листенеры цепляем сюда
        style={{ cursor: 'grab', background: 'none', border: 'none', color: '#111' }}
        title="Перетащить"
        type="button"
      >
        ☰ {/* Или используйте иконку */}
      </button>
    </div>
  );
};


// 2. Основной компонент списка с DND логикой
const DndKitList = () => {
  const [items, setItems] = useState(initialItems);

  const activationConstraint = {
    distance: 8, // Или задержка 150 миллисекунд
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: activationConstraint,
    }),
    useSensor(TouchSensor, {
      activationConstraint: activationConstraint,
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Обработчик окончания перетаскивания
  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Если элемент перемещен в новое место
    if (active.id !== over.id) {
      setItems((items) => {
        // Находим старый и новый индексы
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        // Используем утилиту arrayMove из dnd-kit для обновления порядка
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    // Обертка DndContext: главный контекст DND
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter} // Алгоритм определения столкновений
      onDragEnd={handleDragEnd} // Наш обработчик
    >
      {/* Обертка SortableContext: предоставляет данные о сортировке дочерним элементам */}
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy} // Стратегия сортировки (вертикальный список)
      >
        <div style={{ width: 300 }}>
          {items.map((item) => (
            // Рендерим наши сортируемые элементы
            <SortableItem key={item} id={item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default DndKitList;
