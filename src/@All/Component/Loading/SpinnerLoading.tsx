
import { Typography } from "../../AppForm/Form";

const SpinnerLoading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/10">
      <div className="flex flex-col items-center gap-4">
        
        {/* Logo with pulse */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[var(--main-web-color-2)] opacity-30 animate-ping"></div>
          <img
            src="/bgremoveLogo.png"
            alt="Logo"
            className="relative h-24 w-24 object-contain"
          />
        </div>

        {/* Bouncing dots */}
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[var(--main-web-color-2)] animate-bounce [animation-delay:-0.3s]" />
          <span className="h-3 w-3 rounded-full bg-[var(--main-web-color-2)] animate-bounce [animation-delay:-0.15s]" />
          <span className="h-3 w-3 rounded-full bg-[var(--main-web-color-2)] animate-bounce" />
        </div>

        {/* Text */}
        <Typography className="text-sm text-gray-600 tracking-wide">
          Loading, please wait…
        </Typography>
      </div>
    </div>
  );
};

export default SpinnerLoading;
