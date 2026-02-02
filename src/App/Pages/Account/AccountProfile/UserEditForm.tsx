import React from "react";
import { useForm } from "react-hook-form";
import { TextController, Typography } from "../../../../@All/AppForm/Form";
import {
  useUpdateMeMutation,
  useGetMeQuery,
} from "../../../../@All/Component/APIs/UserApi";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { X, User, Loader2, Save } from "lucide-react";

type FormValues = {
  firstname: string;
  lastname: string;
  username: string;
  phonenumber?: string;
};

const UserEditForm = ({ onClose, userdata }: any) => {
  const { data: apiData } = useGetMeQuery();
  const [updateMe, { isLoading }] = useUpdateMeMutation();

  // 1. Initialize with userdata prop for instant filling
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      firstname: userdata?.firstname || "",
      lastname: userdata?.lastname || "",
      username: userdata?.username || "",
      phonenumber: userdata?.phonenumber || "",
    },
  });

  React.useEffect(() => {
    const currentData = apiData?.data || userdata;
    if (currentData) {
      reset({
        firstname: currentData.firstname || "",
        lastname: currentData.lastname || "",
        username: currentData.username || "",
        phonenumber: currentData.phonenumber || "",
      });
    }
  }, [apiData, userdata, reset]);

  const onSubmit = async (formData: FormValues) => {
    try {
      await updateMe(formData).unwrap();
      toast.success("Profile updated successfully", {
        style: { borderRadius: "15px", background: "#333", color: "#fff" },
      });
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Update failed", {
        style: { borderRadius: "15px", background: "#333", color: "#fff" },
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        <div className="bg-[var(--main-web-color)] p-8 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-6 cursor-pointer right-6 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
              <User size={28} />
            </div>
            <div className="flex flex-col">
              <Typography className="text-2xl font-black tracking-tight">
                Edit Profile
              </Typography>
              <Typography className="text-indigo-100 text-sm">
                Update your personal information
              </Typography>
            </div>
          </div>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  First Name
                </label>
                <TextController
                  id="firstname"
                  name="firstname"
                  type="text"
                  control={control}
                  rules={{ required: "First Name Required" }}
                  placeholder="First Name"
                  className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 mt-1 transition-all"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Last Name
                </label>
                <TextController
                  id="lastname"
                  name="lastname"
                  type="text"
                  control={control}
                  placeholder="Last Name"
                  className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 mt-1  transition-all"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Username
              </label>
              <TextController
                id="username"
                name="username"
                type="text"
                control={control}
                rules={{ required: "Username is required" }}
                placeholder="@username"
                className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 mt-1  transition-all"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Phone Number
              </label>
              <TextController
                id="phonenumber"
                name="phonenumber"
                type="text"
                control={control}
                rules={{
                  required: "Phone number is required",
                  minLength: {
                    value: 10,
                    message: "Phone number must be 10 digits",
                  },
                  maxLength: {
                    value: 10,
                    message: "Phone number must be 10 digits",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Only numbers are allowed",
                  },
                }}
                placeholder="Phone Number"
                className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 mt-1  transition-all"
              />
            </motion.div>

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 w-full h-12 cursor-pointer  border-2 border-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-50 transition-all"
              >
                <Typography>Cancel</Typography>
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="flex-[2] px-4 py-4 w-full h-12 cursor-pointer bg-[var(--main-web-color)] text-white font-bold rounded-2xl shadow-xl hover:bg-[var(--main-web-color-2)] transition-all disabled:bg-gray-400 flex items-center justify-center gap-2"
              >
                <Typography>
                  {" "}
                  {isLoading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <div className="flex gap-2">
                      <Save size={18} /> Save Changes
                    </div>
                  )}
                </Typography>
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UserEditForm;
