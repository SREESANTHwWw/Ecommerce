
import { Typography } from "../../../AppForm/Form";

const CardAdress = () => {
  const address = [
    {
      name: "Sreesanth",
      pincode: "676101",
      delAdress: "marath house south annara tirur",
    },
  ];

  return (
    <div className="w-full h-32 bg-[var(--grad)] p-4 rounded">
      <div className="flex flex-col gap-2">
        {address.map((item, index) => (
          <div key={index} className="flex flex-col text-[var(--main-web-color)]  gap-2">
            <div className="flex gap-4">
              <Typography >Deliver to {item.name},</Typography>
              <Typography>{item.pincode}</Typography>
              <div className="ml-auto">
                <button className="w-full bg-[var(--main-web-color)] p-4  disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-[var(--main-web-color-2)] text-white py-2 rounded-lg font-medium transition">
                  <Typography>Change Address</Typography>{" "}
                </button>
              </div>
            </div>

            <Typography>{item.delAdress}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardAdress;
