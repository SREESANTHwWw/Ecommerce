import React, { useState, useRef, useEffect } from "react";
import {
  useRegisterMutation,
  useSendUserotpMutation,
  useUserOtpVerifyMutation,
} from "../Login/LoginApi";
import { TextController, Typography } from "../../AppForm/Form";
import { useNavigate } from "react-router-dom";
import NotificationMessage from "../../AppForm/NotificationMessage";
import SpinnerLoading from "../Loading/SpinnerLoading";
import { GrRefresh } from "react-icons/gr";
import { TbPasswordUser } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const RegisterOtp = ({setShowOtpForm}:any) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [registerUser] = useRegisterMutation();
  const [userOtpVerify] = useUserOtpVerifyMutation();

  const { control } = useForm();

  const [notification, setNotification] = useState<null | any>(null);
  const [loading, setLoading] = useState(false);
  const [sendUserotp] = useSendUserotpMutation();
  const navigate = useNavigate();
  const [resendTimer, setResendTimer] = useState(0);
  const formData = useSelector((state: any) => state?.RegisterData?.data);

  console.log(formData);

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const res = await sendUserotp({
        email: formData?.email,
        firstname: formData?.firstname,
      }).unwrap();
      setLoading(false);
      toast.success(res.msg, {
        style: {
          borderRadius: '15px',
          background: '#333',
          color: '#fff',
        },
      });
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
    setResendTimer(30);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const value = e.target.value;

    if (/^[0-9]?$/.test(value)) {
      // allow only single digit
      const newOtp: string[] = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input
      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pasteData: string = e.clipboardData.getData("text").slice(0, 6);
    const newOtp: string[] = [...otp];
    pasteData.split("").forEach((char: string, i: number) => {
      if (/^[0-9]$/.test(char)) newOtp[i] = char;
    });
    setOtp(newOtp);
    const nextInput: HTMLInputElement | null =
      inputsRef.current[Math.min(pasteData.length, 5)];
    if (nextInput) {
      nextInput.focus();
    }
  };

  useEffect(() => {
    if (formData?.registerToken) navigate("/register");
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const otpValue = otp.join("");

      // Step 1: verify OTP
      const res = await userOtpVerify({
        email: formData.email,
        otp: otpValue,
        registerToken: formData.registerToken,
      }).unwrap();

      console.log(res);

      // If OTP failed -> stop immediately
      if (!res.success) {
        setLoading(false);
        toast.error(res.msg, {
        style: {
          borderRadius: '15px',
          background: '#333',
          color: '#fff',
        },
      });
        setOtp(new Array(6).fill(""));
        inputsRef.current[0]?.focus();
        return;
      }
      if (res.success) { toast.success(res.msg, {
        style: {
          borderRadius: '15px',
          background: '#333',
          color: '#fff',
        },
      });
        setLoading(false);
        setNotification({ type: "success", msg: res.msg });
      }
  
      // OTP success
      const tToken = res.RegisterToken;
      setLoading(true);
      // Step 2: register user after OTP verify
      const createUser = await registerUser({
        ...formData,
        registerToken: tToken,
      }).unwrap();

      if (createUser.success) {
        setLoading(false);
       toast.success(createUser.msg, {
        style: {
          borderRadius: '15px',
          background: '#333',
          color: '#fff',
        },
      });
        navigate("/login");
      } else {
          toast.error(createUser.err, {
        style: {
          borderRadius: '15px',
          background: '#333',
          color: '#fff',
        },
      });
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
       if(error?.data?.expiredPage){

        setTimeout(() => {
           setShowOtpForm(false);
        }, 2000);
       
       }
      const backendMsg = error?.data?.err || "Something went wrong";
      setNotification({ type: "error", msg: backendMsg });
      setOtp(new Array(6).fill(""));
      inputsRef.current[0]?.focus();
    }
  };
  if (loading) {
    return <SpinnerLoading />;
  }

  return (
    <div className="flex flex-col bg-[var(--main-web-color)]   items-center gap-4 ">
      {notification && (
        <NotificationMessage
          variant={notification.type}
          message={notification.msg}
        />
      )}

      <motion.div
        initial={{ x: 120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center bg-[var(--main-bg-color)] shadow rounded p-7 gap-4"
      >
        <Typography className="text-2xl font-bold text-[var(--main-web-color)]">
          Confirm OTP
        </Typography>
        <Typography className="text-sm text-[var(--main-web-color)] ">
          Please check your email for the OTP
        </Typography>

        <div className="flex justify-center">
          <TbPasswordUser size={56} color="var(--button-bg-color-2)" />
        </div>

        <div className=" w-full">
          <TextController
            type="email"
            id="email1"
            name="email"
            label="Email"
            className="w-full"
            readOnly
            defaultValue={formData?.email}
            control={control}
            placeholder="Email"
            rules={{ required: "Email is  required" }}
          />
        </div>

        <div className="grid grid-cols-1 gap-10  ">
          <Typography className="text-sm text-[var(--main-web-color)] ">
            Please enter the OTP sent to your email address
          </Typography>
        </div>

        <div className="flex gap-2 ">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-[var(--main-web-color)] border border-[var(--main-web-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-lime-600"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-[var(--main-web-color)]  text-white  cursor-pointer hover:text-[var(--main-bg-color)]  rounded hover:bg-[var(--bg-color-ca)]"
        >
          <Typography> Verify OTP</Typography>
        </button>

        <button
          disabled={resendTimer > 0}
          onClick={handleResendOtp}
          className={`mt-2 flex items-center underline gap-2 text-sm  text-[var(--main-web-color)] px-4 py-2 cursor-pointer rounded-md 
    ${resendTimer > 0 ? "opacity-50 cursor-not-allowed" : " "} `}
        >
          <GrRefresh className="text-sm " />
          <Typography>
            {" "}
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
          </Typography>
        </button>
      </motion.div>
    </div>
  );
};

export default RegisterOtp;
