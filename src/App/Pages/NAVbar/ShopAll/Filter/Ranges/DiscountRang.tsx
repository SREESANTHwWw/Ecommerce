import { Range, getTrackBackground } from "react-range";
import { motion, AnimatePresence } from "framer-motion";
import { Typography } from "../../../../../../@All/AppForm/Form";

const DiscountRang = ({ filter, setFilter }: any) => {
  const MIN = 0;
  const MAX = 100;

  return (
    <div className="w-72 flex flex-col gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-50">
      <div className="flex justify-between items-center">
        <Typography className="text-lg font-bold text-gray-800">
          Discount Range
        </Typography>
        <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-[var(--main-web-color)] rounded-lg">
          {filter.discount[0]}% - {filter.discount[1]}%
        </span>
      </div>

      <div className="px-2 pt-4 pb-2">
        <Range
          step={1}
          min={MIN}
          max={MAX}
          values={filter.discount}
          onChange={(values) => setFilter((prev: any) => ({ ...prev, discount: values }))}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{ ...props.style }}
              className="h-7 flex w-full"
            >
              <div
                ref={props.ref}
                className="h-2 w-full rounded-full self-center"
                style={{
                  background: getTrackBackground({
                    values: filter.discount,
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
                className={`w-5 h-5 rounded-full bg-white border-2 flex justify-center items-center shadow-md outline-none transition-colors duration-200 ${
                  isDragged ? "border-[var(--main-web-color)] scale-110" : "border-gray-200"
                }`}
              >
                {/* Visual detail inside the thumb */}
                <div className={`w-1.5 h-1.5 rounded-full ${isDragged ? "bg-[var(--main-web-color)]" : "bg-gray-300"}`} />
              </div>
            );
          }}
        />
      </div>

      {/* Animated Reset Button */}
      <AnimatePresence>
        {(filter.discount[0] !== MIN || filter.discount[1] !== MAX) && (
          <motion.button
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onClick={() => setFilter((prev: any) => ({ ...prev, discount: [MIN, MAX] }))}
            className="w-full py-2 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
          >
            Reset Filters
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiscountRang;