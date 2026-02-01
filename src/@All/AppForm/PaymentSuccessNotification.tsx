import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

const PaymentSuccessNotification = ({ onClose }: { onClose?: () => void }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
      onClose?.();
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div
        className={`relative bg-white rounded-3xl w-[90%] max-w-sm p-10 text-center
        transition-all duration-500
        ${show ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
      >
        {/* Fireworks */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className={`absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-green-500
              animate-firework-${i}`}
            />
          ))}
        </div>

        {/* Icon */}
        <div className="relative z-10 mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-green-500 shadow-lg animate-pop">
          <FaCheck className="text-white text-4xl" />
        </div>

        {/* Text */}
        <h2 className="mt-6 text-2xl font-bold text-gray-800">
          Payment Successful
        </h2>

        <p className="mt-2 text-gray-500 text-sm">
          Your order is confirmed 🎉
        </p>
      </div>

      {/* Firework Animations */}
      <style>{`
        @keyframes pop {
          0% { transform: scale(0); }
          60% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-pop {
          animation: pop 0.6s ease-out;
        }

        ${[...Array(8)]
          .map(
            (_, i) => `
          @keyframes firework-${i} {
            0% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
            100% {
              transform: translate(
                calc(-50% + ${Math.cos((i * 45 * Math.PI) / 180) * 90}px),
                calc(-50% + ${Math.sin((i * 45 * Math.PI) / 180) * 90}px)
              ) scale(0);
              opacity: 0;
            }
          }
          .animate-firework-${i} {
            animation: firework-${i} 0.9s ease-out forwards;
          }
        `
          )
          .join("")}
      `}</style>
    </div>
  );
};

export default PaymentSuccessNotification;
