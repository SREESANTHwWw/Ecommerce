import { useEffect, useState } from "react";
import { TextController, Typography } from "../../AppForm/Form";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import {

  useGoogleAuthenticationMutation,
  useSendUserotpMutation,
} from "../Login/LoginApi";
import SpinnerLoading from "../Loading/SpinnerLoading";
import NotificationMessage from "../../AppForm/NotificationMessage";
import RegisterOtp from "./RegisterOtp";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../FireBase/FireBase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { SaveFormData } from "../FormSlice/FomSlice";
import { loginSlice } from "../../../AuthSlice/AuthSlice";
import toast from "react-hot-toast";

const Signuping = () => {
  const { handleSubmit, control, watch, register } = useForm();

  const [sendUserotp] = useSendUserotpMutation();
  const [googleAuthentication] = useGoogleAuthenticationMutation();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<null | any>(null);
  const [showOtpForm, setShowOtpForm] = useState(false);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const terms = watch("terms");
  const email = watch("email");
  const password = watch("password");
  const firstname = watch("firstname");
  const lastname = watch("lastname");

  useEffect(() => {
    if (email || password || firstname || lastname) {
      setShowOtpForm(false);
    }
  }, [email, password, firstname, lastname]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await sendUserotp({
        email: data.email,
        firstname: data.firstname,
      }).unwrap();
      setLoading(false);
       toast.success(res.msg, {
        style: {
          borderRadius: '15px',
          background: '#333',
          color: '#fff',
        },
      });
      dispatch(
        SaveFormData({
          email: data.email,
          password: data.password,
          firstname: data.firstname,
          lastname: data.lastname,
          terms: data.terms,
          registerToken: res.registerToken,
        })
      );
      setShowOtpForm(true);
    } catch (err: any) {
      setLoading(false);
      const backendMsg = err?.data?.err || "Something went wrong";
       toast.error(backendMsg, {
        style: {
          borderRadius: '15px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const payload = {
        firstname: user.displayName,
        email: user.email,
        terms: true,
      };

      const res = await googleAuthentication(payload).unwrap();

      setLoading(false);
      setNotification({ type: "success", msg: res.msg });
      dispatch(
        loginSlice({
          token: res.token,
          userId: res.user.id,
        })
      );
      localStorage.setItem("token", res.token);
      localStorage.setItem("userId", res.user.id);
       toast.success(res.msg, {
        style: {
          borderRadius: '15px',
          background: '#333',
          color: '#fff',
        },
      });
      navigate("/");
    } catch (error: any) {
      setLoading(false);
      const backendMsg = error?.data?.err || "Something went wrong";
       toast.error(backendMsg, {
        style: {
          borderRadius: '15px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  if (loading) {
    return <SpinnerLoading />;
  }

  return (
    <div className="flex justify-center h-full  items-center w-full mt-10   ">
      {notification && (
        <NotificationMessage
          variant={notification.type}
          message={notification.msg}
        />
      )}

      <div
        className={`${
          showOtpForm
            ? "hidden shadow  w-full md:w-[50%] md:flex flex-col bg-[var(--main-bg-color)]"
            : "shadow rounded p-6  w-full md:w-[40%] flex flex-col bg-[var(--main-bg-color)] "
        }    `}
      >
        <motion.div
          initial={{ y: -120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col   items-center gap-2 w-full"
        >
          <Typography className="md:text-4xl text-3xl font-bold text-gray-700">
            Create an account
          </Typography>
          <Typography className="text-sm">
            Already have an account...?{" "}
            <a href="/login" className="text-blue-600">
              Login
            </a>
          </Typography>
        </motion.div>

        <motion.div
          initial={{ x: -120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col gap-2 p-10     "
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-2  ">
              <TextController
                type="text"
                id="firstname"
                name="firstname"
                label="First Name"
                control={control}
                placeholder="First Name"
                rules={{
                  required: "First name is required",
                }}
              />

              <TextController
                type="text"
                id="lastname"
                name="lastname"
                label="Last Name"
                control={control}
                placeholder=" Last Name"
                rules={{ required: "Last Name is required " }}
              />
            </div>

            <TextController
              type="email"
              id="email"
              name="email"
              label="Email"
              control={control}
              placeholder="Email"
              rules={{ required: "Email is  required" }}
            />

            <TextController
              type="password"
              id="password"
              name="password"
              label="Password"
              control={control}
              placeholder="Password"
              rules={{ required: "Password is required" }}
            />

            <div className="flex items-center gap-3 ">
              <input
                type="checkbox"
                id="terms"
                {...register("terms", { required: true })}
                className="w-4 h-4 accent-[var(--main-web-color-2)] cursor-pointer"
              />

              <Typography className="text-sm text-gray-600 cursor-pointer">
                I agree to the{" "}
                <a
                  href="/terms&conditions"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Terms & Conditions
                </a>
              </Typography>
            </div>

            <div className="flex flex-col gap-10 mt-3">
              <button
                disabled={loading || !terms || showOtpForm}
                type="submit"
                className="w-full bg-[var(--main-web-color-2)]  disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-[var(--main-web-color)] text-white py-2 rounded-lg font-medium transition"
              >
                <Typography>Sign Up</Typography>
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-grow h-px bg-gray-300"></div>
                <Typography className="text-sm text-gray-500">
                  OR register with
                </Typography>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleAuth}
                className="w-full flex items-center justify-center gap-3 cursor-pointer"
              >
                <FcGoogle size={32} />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
      {showOtpForm && (
        <div className="flex md:w-[50%] bg-[var(--main-web-color)] p-8 rounded shadow-2xl  w-full justify-center items-center">
          <RegisterOtp setShowOtpForm={setShowOtpForm} />
        </div>
      )}
    </div>
  );
};

export default Signuping;
