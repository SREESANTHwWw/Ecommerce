import React from "react";

const TableView = ({colors}:any) => {
  const products = [
    { id: 1, name: "Wireless Mouse", price: 599, stock: 25, category: "Accessories" },
    { id: 2, name: "Mechanical Keyboard", price: 2499, stock: 12, category: "Accessories" },
    { id: 3, name: "Gaming Headset", price: 1999, stock: 8, category: "Audio" },
    { id: 4, name: "USB-C Cable", price: 299, stock: 50, category: "Cables" },
    { id: 5, name: "Laptop Stand", price: 999, stock: 15, category: "Office" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Product Name</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Price (₹)</th>
              <th className="px-4 py-2 border">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{product.id}</td>
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">{product.category}</td>
                <td className="px-4 py-2 border">₹{product.price}</td>
                <td className="px-4 py-2 border">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableView;
