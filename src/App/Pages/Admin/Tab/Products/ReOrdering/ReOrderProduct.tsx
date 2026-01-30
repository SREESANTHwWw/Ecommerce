import  { useState, useEffect } from "react";
import { useGetAllProductsQuery, useReOrderingProductMutation } from "../ProductApi";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import NotificationMessage from "../../../../../../@All/AppForm/NotificationMessage";

// Draggable item component
function DraggableItem({ item }: { item: any }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item._id });

  return (
   <div
  ref={setNodeRef}
  style={{
    transform: CSS.Transform.toString(transform),
    transition,
    boxShadow: transform ? "0 10px 20px rgba(0,0,0,0.3)" : "0 4px 6px rgba(0,0,0,0.1)"
  }}
  {...attributes}
  {...listeners}
  className="p-4 mb-2 bg-white rounded shadow-md cursor-move flex justify-between items-center transition-all duration-200 ease-in-out hover:shadow-lg hover:border-blue-300"
>
  <div className="flex items-center gap-4">
    {item.productImage?.[0] && (
      <img
        src={item.productImage[0]}
        alt={item.productName}
        className="w-12 h-12 object-cover rounded"
      />
    )}
    <span className="font-medium text-gray-800">{item.productName}</span>
  </div>
  <span className="text-gray-500">#{item.productOrder}</span>
</div>

  );
}

// Main reorder component
const ReOrderProduct = () => {
  const { data: products } = useGetAllProductsQuery();
  const [items, setItems] = useState<any[]>([]);
  const [ReOrderingProduct ] = useReOrderingProductMutation()

  useEffect(() => {
    if (products?.products) {
      // Sort by existing productOrder initially
      const sorted = [...products.products].sort(
        (a, b) => a.productOrder - b.productOrder
      );
      setItems(sorted);
    }
  }, [products]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i._id === active.id);
      const newIndex = items.findIndex((i) => i._id === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  const saveOrder = () => {
    const ordered = items.map((item, index) => ({
      _id: item._id,
      productOrder: index + 1,
    }));
     ReOrderingProduct(ordered).unwrap().then((res) => {
       NotificationMessage({ variant: "success", message: res.message });
        
     });

    // Call your backend API to save
    console.log("Save Order:", ordered);
    // Example: axios.post("/api/products/reorder", ordered)
  };

  if (!items.length) return <p className="p-4">Loading products...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-50 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Reorder Products
      </h2>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <DraggableItem key={item._id} item={item} />
          ))}
        </SortableContext>
      </DndContext>

      <button
        onClick={saveOrder}
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow"
      >
        Save Order
      </button>
    </div>
  );
};

export default ReOrderProduct;
