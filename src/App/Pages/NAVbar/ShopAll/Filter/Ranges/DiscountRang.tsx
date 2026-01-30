import { Range } from "react-range";
import { Typography } from "../../../../../../@All/AppForm/Form";

const DiscountRang = ({ filter, setFilter }: any) => {
  return (
    <div className="w-72 flex flex-col gap-2 p-4">
      <Typography className="text-xl font-bold text-[var(--main-web-color-2)] ">
        Discount
      </Typography>

      <Range
        step={1}
        min={0}
        max={100}
        values={filter.discount}
        onChange={(item) => setFilter((e: any) => ({ ...e, discount: item }))}
        renderTrack={({ props, children }) => {
             const {key ,...restProps }:any = props;

          return (
            <div {...restProps} key={key} className="h-2 w-full bg-gray-300 rounded">
              <div
                className="h-2 bg-[var(--main-web-color)] rounded"
                style={{
                  marginLeft: `${(filter.discount[0] / 100) * 100}%`,
                  width: `${
                    ((filter.discount[1] - filter.discount[0]) / 100) * 100
                  }%`,
                }}
              ></div>
              {children}
            </div>
          );
        }}
        renderThumb={({ props }) => {
           const {key ,...restProps }:any = props;

          return(
            <div
              {...restProps}
              key={key}
              className="w-4 h-4 bg-[var(--main-web-color)] border-2  border-white absolute top-[1px] rounded-full shadow cursor-pointer"
            ></div>
          )
        } }
      />
      <Typography className="mb-2 font-semibold">
        {filter.discount[0]}% - {filter.discount[1]}%
      </Typography>
      {
        (filter.discount[0] !==0 || filter.discount[1] !==100 ) &&(
          <button
              onClick={()=> setFilter((item:any)=> ({...item,discount:[0,100]}))}
            className="cursor-pointer"
          >
             <Typography className="text-[var(--main-web-color-2)] font-semibold"> reset </Typography>
          </button>
        )
      }
    </div>
  );
};

export default DiscountRang;
