// import React, { useEffect, useState } from "react";
// // import socket from "../../../socket";

// type Message = {
//   senderId: string;
//   receiverId: string;
//   message: string;
// };

// type User = {
//   id: string;
//   name: string;
// };

// interface ChatProps {
//   userId: string | null;
// }

// const Chat: React.FC<ChatProps> = ({ userId }) => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [users, setUsers] = useState<User[]>([]);
//   const [activeUser, setActiveUser] = useState<User | null>(null);

//   useEffect(() => {
//     // Listen for incoming messages
//     socket.on("receiveMessage", (data) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     // Get user list (you can fetch from API or Socket event)
//     setUsers([
//       { id: "6898ea9c23a186995015571c", name: "Alice" },
//       { id: "6898ea9c23a186995015572d", name: "Bob" },
//       { id: "6898ea9c23a186995015573e", name: "Charlie" },
//     ]);

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, []);

//   const sendMessage = () => {
//     if (message.trim() && activeUser) {
//       const msgData: Message = {
//         senderId: userId || "",
//         receiverId: activeUser.id,
//         message,
//       };

//       socket.emit("sendMessage", msgData);
//       setMessages((prev) => [...prev, msgData]);
//       setMessage("");
//     }
//   };

//   return (
//     <div className="flex h-screen max-w-4xl mx-auto border rounded-lg shadow-lg bg-white">
//       {/* Sidebar - Users List */}
//       <div className="w-1/3 border-r bg-gray-50 flex flex-col">
//         <div className="p-4 border-b bg-blue-600 text-white">
//           <h2 className="text-lg font-semibold">Users</h2>
//         </div>
//         <div className="flex-1 overflow-y-auto">
//           {users.map((user) => (
//             <div
//               key={user.id}
//               onClick={() => setActiveUser(user)}
//               className={`p-4 cursor-pointer hover:bg-blue-100 ${
//                 activeUser?.id === user.id ? "bg-blue-200" : ""
//               }`}
//             >
//               {user.name}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat Window */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <div className="p-4 border-b bg-blue-600 text-white">
//           <h2 className="text-lg font-semibold">
//             {activeUser ? activeUser.name : "Select a user"}
//           </h2>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100">
//           {messages
//             .filter(
//               (msg) =>
//                 (msg.senderId === userId && msg.receiverId === activeUser?.id) ||
//                 (msg.senderId === activeUser?.id && msg.receiverId === userId)
//             )
//             .map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex ${
//                   msg.senderId === userId ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`max-w-xs px-4 py-2 rounded-lg shadow ${
//                     msg.senderId === userId
//                       ? "bg-blue-500 text-white rounded-br-none"
//                       : "bg-white text-gray-800 rounded-bl-none border"
//                   }`}
//                 >
//                   <p className="text-sm">{msg.message}</p>
//                 </div>
//               </div>
//             ))}
//         </div>

//         {/* Input */}
//         {activeUser && (
//           <div className="p-4 border-t bg-white flex items-center gap-2">
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               className="flex-1 px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Type a message..."
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
//             >
//               Send
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chat;
