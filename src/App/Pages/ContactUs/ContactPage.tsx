import { motion } from "framer-motion";
import { TextController, Typography } from "../../../@All/AppForm/Form";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import { useRef } from "react";
import toast from "react-hot-toast";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactPage = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const { control, handleSubmit, reset } = useForm<ContactFormData>();

  const onSubmit = () => {
    if (!formRef.current) return;

    emailjs
      .sendForm(
        "service_gb5ldzd",
        "template_5j5myka",
        formRef.current,
        "Xr8Df2ZzKjdft0x7Z"
      )
      .then(() => {
        toast.success("Message sent successfully!", {
          style: {
            borderRadius: "15px",
            background: "#333",
            color: "#fff",
          },
        });
        reset({
            name: "",
            email: "",
            message: "",
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to send message", {
          style: {
            borderRadius: "15px",
            background: "#333",
            color: "#fff",
          },
        });
      });
  };

  return (
    <div className="w-full p-8 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
      
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20 flex flex-col items-start"
        >
          <Typography className="text-xl uppercase tracking-widest text-[var(--main-web-color)] font-semibold mb-3">
            Contact Us
          </Typography>
          <Typography className="text-4xl md:text-5xl font-extrabold mb-4">
            Let’s Talk Ice Cream 🍦
          </Typography>
          <Typography className="text-gray-600 text-lg">
            Have a question, feedback, or craving? We’re here to help you.
          </Typography>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
         
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {[
              {
                icon: <FiMail size={22} />,
                title: "Email",
                value: "support@groviya.com",
              },
              {
                icon: <FiPhone size={22} />,
                title: "Phone",
                value: "+91 9567641722",
              },
              {
                icon: <FiMapPin size={22} />,
                title: "Address",
                value: "Groviya Ice Creams, Calicut, Kerala",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-5 bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="p-4 rounded-xl bg-[var(--grad)] text-[var(--main-web-color)]">
                  {item.icon}
                </div>
                <div className="flex gap-3 items-center">
                  <Typography className="font-bold text-lg">
                    {item.title}
                  </Typography>
                  <Typography className="text-gray-600">
                    {item.value}
                  </Typography>
                </div>
              </motion.div>
            ))}
          </motion.div>

         
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 space-y-6"
          >
            <Typography className="text-2xl font-extrabold mb-2">
              Send Us a Message
            </Typography>

            <TextController
            type="text"
            id="name"
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              placeholder="Sreeshanth"
            />

            <TextController
               id="email"
              name="email"
              type="email"
              control={control}
              rules={{ required: "Email is required" }}
              placeholder="Sreeshanth@example.com"
            />

            <TextController
            id="message"
              type="text"
              name="message"
              control={control}
              rules={{ required: "Message is required" }}
              placeholder="Tell us about your craving..."
              className="h-32 resize-none"
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-[var(--main-web-color)] cursor-pointer hover:bg-[var(--main-web-color-2)] text-white rounded-xl py-3 font-semibold shadow-lg"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
