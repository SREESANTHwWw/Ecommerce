import { Range, getTrackBackground } from "react-range";
import { motion, AnimatePresence } from "framer-motion";
import { Typography } from "../../../../../../@All/AppForm/Form";

const PriceRange = ({ filter, setFilter }: any) => {
  const MIN = 0;
  const MAX = 5000;
  const STEP = 50;

  return (
    <div className="w-72 flex flex-col gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-50">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <Typography className="text-lg font-bold text-gray-800">
          Price Range
        </Typography>
        <div className="px-2 py-1 bg-green-50 rounded-lg">
          <span className="text-xs font-bold text-green-700">
            ₹{filter.price[0]} - ₹{filter.price[1]}
          </span>
        </div>
      </div>

      {/* Slider Section */}
      <div className="px-2 pt-4 pb-2">
        <Range
          step={STEP}
          min={MIN}
          max={MAX}
          values={filter.price}
          onChange={(values) =>
            setFilter((prev: any) => ({ ...prev, price: values }))
          }
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={props.style}
              className="h-7 flex w-full"
            >
              <div
                ref={props.ref}
                className="h-2 w-full rounded-full self-center"
                style={{
                  background: getTrackBackground({
                    values: filter.price,
                    colors: ["#E5E7EB", "var(--main-web-color)", "#E5E7EB"],
                    min: MIN,
                    max: MAX,
                  }),
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => {
            const { key, ...restProps } = props;
            return (
              <div
                {...restProps}
                key={key}
                className={`w-5 h-5 rounded-full bg-white border-2 flex justify-center items-center shadow-md outline-none transition-all duration-200 ${
                  isDragged 
                    ? "border-[var(--main-web-color)] scale-125 shadow-lg" 
                    : "border-gray-200"
                }`}
              >
                {/* Modern Inner Detail */}
                <div 
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    isDragged ? "bg-[var(--main-web-color)]" : "bg-gray-300"
                  }`} 
                />
              </div>
            );
          }}
        />
      </div>

      {/* Quick Min/Max Labels */}
      <div className="flex justify-between text-[10px] font-medium text-gray-400 -mt-2">
        <span>₹{MIN}</span>
        <span>₹{MAX}+</span>
      </div>

      {/* Animated Reset Button */}
      <AnimatePresence>
        {(filter.price[0] !== MIN || filter.price[1] !== MAX) && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilter((prev: any) => ({ ...prev, price: [MIN, MAX] }))}
            className="w-full py-2 mt-2 text-sm font-semibold text-red-500 bg-red-50/50 hover:bg-red-50 rounded-xl transition-colors border border-red-100/50"
          >
            Reset Price
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PriceRange;