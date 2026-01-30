import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

function DraggableItem({ item }:any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item._id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: `translate(${transform?.x}px, ${transform?.y}px)`,
        transition
      }}
      {...attributes}
      {...listeners}
      className="p-3 bg-gray-100 rounded mb-2 cursor-move" 
    >
      {item.productName}
    </div>
  );
}
