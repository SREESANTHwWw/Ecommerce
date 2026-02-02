import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, Trash2, CheckCircle2 } from "lucide-react";
import {
  useDeleteAddressMutation,
  useGetUserAddressesQuery,
} from "../../../../@All/Component/Addresses/AddressesApi";
import { Typography } from "../../../../@All/AppForm/Form";
import SpinnerLoading from "../../../../@All/Component/Loading/SpinnerLoading";
import { useState } from "react";
import AddressForm from "../../../../@All/Component/Addresses/AddressForm/AddressForm";
import ChangeAddressForm from "../../../../@All/Component/Addresses/AddressForm/ChangeAddressForm";
import toast from "react-hot-toast";
import CommonAlert from "../../../../@All/AppForm/CommonAlert";

const SavedAddresses = () => {
  const { data: address, isLoading, refetch } = useGetUserAddressesQuery();
  const [deleteAddress] = useDeleteAddressMutation();

  const [addressAdd, setshowAddForm] = useState(false);
  const [changeAddress, setChangeFrom] = useState(false);
  const [alert, setAlert] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<any>(null);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
  };
  const onConfirmDelete = (id: string) => {
    setAddressToDelete(id);
    setAlert(true);
  };

  const handleDelete = async () => {
    if (!addressToDelete) return;

    try {
      await deleteAddress(addressToDelete).unwrap();
      refetch();
      toast.success("Address deleted successfully!", {
        style: {
          borderRadius: "15px",
          background: "#333",
          color: "#fff",
        },
      });

      setAlert(false);
      setAddressToDelete(null);
    } catch (error) {
      toast.error("Failed to delete address", {
        style: {
          borderRadius: "15px",
          background: "#333",
          color: "#fff",
        },
      });
      console.error(error);
    }
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col ">
          <Typography className="text-2xl font-bold text-gray-800">
            Saved Addresses
          </Typography>
          <Typography className="text-gray-500 text-sm">
            Manage your delivery locations
          </Typography>
        </div>
        <motion.button
          onClick={() => setshowAddForm(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-5 py-2.5 bg-[var(--main-web-color)] cursor-pointer text-white rounded-xl text-sm font-semibold shadow-lg flex items-center gap-2"
        >
          <Typography> + Add New</Typography>
        </motion.button>
      </div>
      {addressAdd && <AddressForm setshowAddForm={setshowAddForm} />}
      {changeAddress && <ChangeAddressForm setChangeFrom={setChangeFrom} />}
      <CommonAlert
        isOpen={alert}
        message="Remove this address?"
        onConfirm={handleDelete}
        onCancel={() => {
          setAlert(false);
          setAddressToDelete(null);
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {
          address?.addresses?.length > 0 ?(
            address?.addresses?.map((addr: any) => (
            <motion.div
              key={addr._id}
              layout
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className={`relative p-5 rounded-2xl border-2 transition-colors ${
                addr.isDefault
                  ? "border-[var(--main-web-color)] bg-indigo-50/30"
                  : "border-gray-100 bg-white"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-3 rounded-lg ${addr.isDefault ? "bg-[var(--main-web-color)] text-white" : "bg-gray-100 text-gray-500"}`}
                >
                  {addr.type === "Home" ? (
                    <Home size={20} />
                  ) : (
                    <Briefcase size={20} />
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {addr.isDefault && (
                    <Typography className="text-[10px] font-bold uppercase tracking-wider text-[var(--main-web-color)] bg-indigo-100 px-2 py-1 rounded-md">
                      Default
                    </Typography>
                  )}
                  {/* <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreVertical size={18} />
                  </button> */}
                </div>
              </div>

              <div className="space-y-1 flex flex-col">
                <Typography className="font-bold flex  text-gray-800  items-center gap-2">
                  {addr.type}
                  {addr.isDefault && (
                    <CheckCircle2
                      size={14}
                      className="text-[var(--main-web-color)]"
                    />
                  )}
                </Typography>
                <Typography className="text-gray-600 text-sm leading-relaxed">
                  {addr.street}
                  <br />
                  {addr.city}, {addr.pincode}
                </Typography>
                <Typography className="text-gray-600 text-sm leading-relaxed">
                  {addr.country}
                  {addr.state}
                </Typography>
              </div>

              <div className="mt-6 pt-4 border-t border-dashed border-gray-200 flex justify-between items-center">
                <button
                  onClick={() => setChangeFrom(true)}
                  className="text-sm font-medium text-[var(--main-web-color)]hover:underline cursor-pointer"
                >
                  <Typography> Edit Details</Typography>
                </button>
                <motion.button
                  onClick={() => onConfirmDelete(addr._id)}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ color: "#ef4444" }}
                  className="text-gray-400 transition-colors cursor-pointer"
                >
                  <Trash2 size={18} />
                </motion.button>
              </div>
            </motion.div>
          ))
          ):(

            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <Typography className="text-gray-400 text-lg mb-4">
                No saved addresses found.
              </Typography>
             
            </div>
          )
          
          
          
          
          }
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SavedAddresses;
