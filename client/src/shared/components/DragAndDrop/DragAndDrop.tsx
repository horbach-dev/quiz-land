import {
  closestCenter,
  DndContext,
  type DraggableSyntheticListeners,
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
import type { ReactNode } from 'react';

interface IProps<T> {
  items: T[];
  move?: (a: number, b: number) => void;
  render: (props: {
    item: T;
    index: number;
    listeners: DraggableSyntheticListeners;
  }) => ReactNode;
  setItems?: (cb: (items: T[]) => T[]) => void;
}

export const DragAndDrop = <T extends { id: string }>({
  items,
  render,
  move,
  setItems,
}: IProps<T>) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      const oldIdx = items.findIndex((i) => i.id === active.id);
      const newIdx = items.findIndex((i) => i.id === over.id);

      if (move) return move(oldIdx, newIdx);

      if (setItems) {
        setItems((items) => {
          return arrayMove(items, oldIdx, newIdx);
        });
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {items.map((item, index) => (
          <SortableItem
            key={item.id}
            id={item.id}
            render={(listeners: DraggableSyntheticListeners) =>
              render({ item, index, listeners })
            }
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

const SortableItem = ({ id, render }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      {render(listeners)}
    </div>
  );
};
