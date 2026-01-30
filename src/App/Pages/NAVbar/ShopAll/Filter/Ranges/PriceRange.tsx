import { Range } from "react-range";
import { Typography } from "../../../../../../@All/AppForm/Form";
const PriceRange = ({ filter, setFilter }: any) => {
  return (
    <div className="w-72 flex flex-col gap-2 p-4">
      <Typography className="text-xl font-bold text-[var(--main-web-color-2)] ">
        Price
      </Typography>
      <Range
        step={50}
        min={0}
        max={5000}
        values={filter.price}
        onChange={(values) =>
          setFilter((item: any) => ({ ...item, price: values }))
        }
        renderTrack={({ props, children }) => {
            const { key, ...restProps }:any = props;
          return (
            <div {...restProps} key={key} className="h-2 w-full bg-gray-300 rounded">
              <div
                className="h-2 bg-[var(--main-web-color)] rounded"
                style={{
                  marginLeft: `${(filter.price[0] / 5000) * 100}%`,
                  width: `${
                    ((filter.price[1] - filter.price[0]) / 5000) * 100
                  }%`,
                }}
              />
              {children}
            </div>
          );
        }}
        renderThumb={({ props }) => {
          const { key, ...restProps }:any = props;

          return (
            <div
              {...restProps}
              key={key}
              className="w-4 h-4 bg-[var(--main-web-color)] rounded-full border-2 absolute top-[1px] border-white shadow cursor-pointer"
            />
          );
        }}
      />
      <Typography className="mb-2 font-semibold">
        ₹{filter.price[0]} - ₹{filter.price[1]}
      </Typography>
       {
        (filter.price[0] !== 0 || filter.price[1] !== 5000)  &&(
          <button
           className="cursor-pointer"
           onClick={()=>setFilter((item:any)=> ({...item,price:[0,5000]}))}
          >
            <Typography className="text-[var(--main-web-color-2)] font-semibold">
              reset
            </Typography>
          </button>
        )
       }
    </div>
  );
};

export default PriceRange;
