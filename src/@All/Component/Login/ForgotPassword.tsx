import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextController, Typography } from "../../AppForm/Form";
import {
  useForgetPasswordMutation,
  useForgetPasswordsendotpMutation,
  useForgetPasswordVerifyotpMutation,
} from "./LoginApi";
import NotificationMessage from "../../AppForm/NotificationMessage";
import SpinnerLoading from "../Loading/SpinnerLoading";
import { motion } from "framer-motion";
import { GrRefresh } from "react-icons/gr";
const ForgotPassword = () => {
  const { control, handleSubmit, } = useForm({
    defaultValues: { email: "", otp: "", password: "" },
  });

  const navigate = useNavigate();
  const [forgetPasswordsendotp] = useForgetPasswordsendotpMutation();
  const [forgetPasswordVerifyotp] = useForgetPasswordVerifyotpMutation();
  const [forgetPassword] = useForgetPasswordMutation();

  const [Enableverify, setEnableverify] = useState(false);
  const [enablePassword, setEnablePassword] = useState(false);
  const [resetToken, setresetSessionToken] = useState("");
  const [notification, setNotification] = useState<null | any>(null);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
 

  const handleOTPSend = (data: any) => {
    setLoading(true);
    forgetPasswordsendotp(data)
      .unwrap()
      .then((res) => {
        setEnableverify(true);
        setNotification({ type: "success", msg: res.msg });
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        const backendMsg = err?.data?.err || "Something went wrong";
        setNotification({ type: "error", msg: backendMsg });
      });
  };

  const handleVerifyOTP = (data: any) => {
    setLoading(true);
    forgetPasswordVerifyotp({ ...data, resetToken })
      .unwrap()
      .then((res) => {
        if (res.success) {
          setLoading(false);
          setEnableverify(false);
          setNotification({ type: "success", msg: res.msg });
          setEnablePassword(true);
          setresetSessionToken(res.resetToken);
        }
      })
      .catch((err: any) => {
        setLoading(false);
        const backendMsg = err?.data?.err || "Something went wrong";
        setNotification({ type: "error", msg: backendMsg });
      });
  };

  const handlePassword = (data: any) => {
    setLoading(true);
    try {
      forgetPassword({ ...data, resetToken })
        .unwrap()
        .then((res) => {
          if (res.success) {
            setLoading(false);
            setNotification({ type: "success", msg: res.msg });
            navigate("/login");
          }
        });
    } catch (err: any) {
      setLoading(false);
      const backendMsg = err?.data?.err || "Something went wrong";
      setNotification({ type: "error", msg: backendMsg });
    }
  };

  const handleResendOtp = async (email: any) => {
    setLoading(true);
    forgetPasswordsendotp(email)
      .unwrap()
      .then((res) => {
        setEnableverify(true);
        setNotification({ type: "success", msg: res.msg });
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        const backendMsg = err?.data?.err || "Something went wrong";
        setNotification({ type: "error", msg: backendMsg });
      });

    setResendTimer(30); // 30 seconds timer
  };

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification(null);
    }, 1000);

    return () => clearTimeout(timer);
  }, [notification]);
  useEffect(() => {
    if (resendTimer === 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  if (loading) {
    return <SpinnerLoading />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 px-4">
      <motion.div
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img
          src="/bgremoveLogo.png"
          alt="Logo"
          className="w-24 h-24 object-cover md:block hidden"
        />
      </motion.div>
      <motion.div
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex justify-center items-center h-full  "
      >
        <div className="bg-white shadow-lg grid grid-cols-1 gap-4 rounded-lg p-8 w-full max-w-md">
          {notification && (
            <NotificationMessage
              key={Date.now()}
              variant={notification.type}
              message={notification.msg}
            />
          )}
          <motion.div
            initial={{ y: -120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex justify-center   "
          >
            <img
              src="/bgremoveLogo.png"
              alt="Logo"
              className="w-32 h-32 object-cover md:hidden block "
            />
          </motion.div>

          <Typography className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Forgot Password
          </Typography>

          <form
            onSubmit={handleSubmit(
              enablePassword
                ? handlePassword
                : Enableverify
                ? handleVerifyOTP
                : handleOTPSend
            )}
            className="space-y-5"
          >
            {/* Email */}
            <TextController
              type="email"
              placeholder="Enter your email"
              control={control}
              name="email"
              id="email"
              label="Email"
              readOnly={Enableverify}
            />

            {/* OTP */}
            {Enableverify && !enablePassword && (
              <TextController
                type="text"
                placeholder="Enter OTP"
                control={control}
                name="otp"
                id="otp"
                label="OTP"
              />
            )}

            {/* Password */}
            {enablePassword && (
              <TextController
                type="password"
                placeholder="Enter new password"
                control={control}
                name="password"
                id="password"
                label="Password"
              />
            )}

            <button
              type="submit"
              className="w-full cursor-pointer bg-[var(--main-web-color-2)] hover:bg-[var(--main-web-color)] text-white font-semibold py-2 rounded-lg"
            >
              <Typography>
                {enablePassword
                  ? "Change Password"
                  : Enableverify
                  ? "Verify OTP"
                  : "Send OTP"}{" "}
              </Typography>
            </button>

            <button
              disabled={resendTimer > 0}
              onClick={handleResendOtp}
            
              className={`mt-2 flex  items-center underline gap-2 text-sm text-[var(--main-web-color-2)] px-4 py-2 cursor-pointer rounded-md 
            ${resendTimer > 0 ? "opacity-50 cursor-not-allowed" : " "} `}
            >
              <GrRefresh className="text-sm " />
              <Typography>
                {" "}
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
              </Typography>
            </button>
          </form>

          <Typography className="text-sm text-gray-500 text-center mt-4">
            Remember your password?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </Typography>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
