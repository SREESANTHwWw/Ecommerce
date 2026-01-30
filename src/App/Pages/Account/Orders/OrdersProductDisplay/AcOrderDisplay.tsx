import React from "react";

const dummyOrders = [
  {
    id: "ORD123456",
    name: "Organic Fresh Apples",
    image: "https://via.placeholder.com/120",
    qty: 2,
    price: 240,
    status: "Delivered",
    statusColor: "text-green-600",
    date: "Delivered on 22 Dec 2025",
    action: "View Details",
  },
  {
    id: "ORD987654",
    name: "Premium Basmati Rice",
    image: "https://via.placeholder.com/120",
    qty: 1,
    price: 999,
    status: "In Transit",
    statusColor: "text-yellow-600",
    date: "Expected on 26 Dec 2025",
    action: "Track Order",
  },
  {
    id: "ORD456789",
    name: "Cold Pressed Sunflower Oil",
    image: "https://via.placeholder.com/120",
    qty: 3,
    price: 1299,
    status: "Cancelled",
    statusColor: "text-red-600",
    date: "Cancelled on 20 Dec 2025",
    action: "View Details",
  },
];

const AcOrderDisplay = () => {
  return (
    <div className="w-full h-full space-y-6">

      {dummyOrders.map((order) => (
        <div
          key={order.id}
          className="w-full bg-white rounded-xl shadow-md p-5 flex flex-col md:flex-row gap-5"
        >
          {/* Image */}
          <img
            src={order.image}
            alt={order.name}
            className="w-28 h-28 object-cover rounded-lg"
          />

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{order.name}</h2>
            <p className="text-sm text-gray-500">Order ID: #{order.id}</p>

            <div className="mt-2 flex flex-wrap gap-4 text-sm">
              <span>Qty: <b>{order.qty}</b></span>
              <span>Price: <b>₹{order.price}</b></span>
              <span className={`${order.statusColor} font-medium`}>
                {order.status}
              </span>
            </div>

            <p className="text-sm text-gray-400 mt-2">{order.date}</p>
          </div>

          {/* Action */}
          <div className="flex items-center">
            <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100">
              {order.action}
            </button>
          </div>
        </div>
      ))}

    </div>
  );
};

export default AcOrderDisplay;
