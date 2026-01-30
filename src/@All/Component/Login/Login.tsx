import { TextController, Typography } from "../../AppForm/Form";
import { useForm } from "react-hook-form";
import { useGoogleAuthenticationMutation, useLoginMutation } from "./LoginApi";

import NotificationMessage from "../../AppForm/NotificationMessage";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../FireBase/FireBase";
import { useDispatch } from "react-redux";
import { loginSlice } from "../../../AuthSlice/AuthSlice";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const { control, handleSubmit, register } = useForm<any>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [googleAuthentication] = useGoogleAuthenticationMutation();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<null | any>(null);
  const dispatch = useDispatch();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await login(data).unwrap();
      console.log(res);
      setLoading(false);
      setNotification({
        type: "success",
        msg: res.msg,
      });
      toast.success(res.msg)
      dispatch(
        loginSlice({
          token: res.token,
          userId: res.user.id,
        })
      );
      navigate("/");
      localStorage.setItem("token", res.token);
      localStorage.setItem("userId", res.user.id);
    
    } catch (err: any) {
      setLoading(false);
      const backendMsg = err?.data?.err || "Something went wrong";
      setNotification({ type: "error", msg: backendMsg });
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
     navigate("/")
    } catch (error: any) {
      setLoading(false);
      const backendMsg = error?.data?.err || "Something went wrong";
      setNotification({ type: "error", msg: backendMsg });
    }
  };

  return (
    <div className="flex w-full justify-center items-center  h-full ">
      {notification && (
        <NotificationMessage
          key={Date.now()}
          variant={notification.type}
          message={notification.msg}
        />
      )}

      <div className="flex justify-center w-full items-center  ">
        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={
            " md:w-[40%] w-full flex h-[80vh] flex-col md:shadow mt-5  justify-center rounded-2xl  bg-[var(--main-bg-color)]"
          }
        >
          <div className="flex flex-col items-center gap-2">
            <Typography className="md:text-4xl text-3xl font-bold text-gray-700">
              Welcome back
            </Typography>
            <Typography className="text-sm">
              Don&apos;t have an account...?{" "}
              <a href="/register" className="text-blue-600">
                Sign Up
              </a>
            </Typography>
          </div>

          <motion.div
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="grid grid-cols-1 gap-2 p-10     "
          >
            <form onSubmit={handleSubmit(onSubmit)}>
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
              <div className="flex justify-between  items-center gap-3 ">
                <div className="flex gap-4">
                  <input
                    type="checkbox"
                    id="remember"
                    {...register("remember")}
                    className="w-4 h-4 accent-[var(--main-web-color-2)] cursor-pointer"
                  />

                  <Typography className="text-sm text-gray-600 cursor-pointer">
                    Remember me
                  </Typography>
                </div>

                <div>
                  <Typography className="text-sm text-gray-600 cursor-pointer">
                    <a
                      href="/forgot-password"
                      className="text-blue-600"
                      target="_blank"
                    >
                      Forgot Password..?
                    </a>
                  </Typography>
                </div>
              </div>

              <div className="flex flex-col gap-10 mt-3">
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-[var(--main-web-color-2)]  disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-[var(--main-web-color)] text-white py-2 rounded-lg font-medium transition"
                >
                  <Typography>Sign Up</Typography>
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex-grow h-px bg-gray-300"></div>
                  <Typography className="text-sm text-gray-500">
                    OR continue with
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
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
