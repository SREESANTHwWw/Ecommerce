import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaExternalLinkAlt } from "react-icons/fa";

const TableView = () => {
  // Replace this with your actual RTK Query data if needed
  const products = [
    { id: 1, name: "Wireless Mouse", price: 599, stock: 25, category: "Accessories" },
    { id: 2, name: "Mechanical Keyboard", price: 2499, stock: 12, category: "Accessories" },
    { id: 3, name: "Gaming Headset", price: 1999, stock: 8, category: "Audio" },
    { id: 4, name: "USB-C Cable", price: 299, stock: 50, category: "Cables" },
    { id: 5, name: "Laptop Stand", price: 999, stock: 15, category: "Office" },
  ];

  // Animation variants for the table rows
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <motion.tbody
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products.map((product) => (
              <motion.tr
                key={product.id}
                variants={itemVariants}
                className="group border-b border-slate-100 last:border-0 hover:bg-blue-50/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs">
                      #{product.id}
                    </div>
                    <span className="font-semibold text-slate-700">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-slate-900">
                  ₹{product.price.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : 'bg-orange-500'}`} />
                    <span className="text-sm text-slate-600 font-medium">{product.stock} units</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Edit">
                      <FaEdit size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                      <FaTrash size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all" title="View Details">
                      <FaExternalLinkAlt size={14} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
      
      {/* Table Footer / Pagination Placeholder */}
      <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
        <p className="text-xs text-slate-500 font-medium">Showing {products.length} products</p>
        <div className="flex gap-2">
           <button className="px-3 py-1 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50">Previous</button>
           <button className="px-3 py-1 text-xs font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700">Next</button>
        </div>
      </div>
    </div>
  );
};

export default TableView;