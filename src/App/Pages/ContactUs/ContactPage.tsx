import { motion } from "framer-motion";
import { Typography } from "../../../@All/AppForm/Form";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const ContactPage = () => {
  return (
    <div className="w-full p-8 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
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
          <Typography className="text-gray-600 text-lg  ">
            Have a question, feedback, or craving? We’re here to help you.
            Reach out and our team will get back to you quickly.
          </Typography>
        </motion.div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          
          {/* LEFT INFO */}
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
                value: "+91 98765 43210",
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

          {/* RIGHT FORM */}
          <motion.form
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 space-y-6"
          >
            <Typography className="text-2xl font-extrabold mb-2">
              Send Us a Message
            </Typography>

            <input
              type="text"
              placeholder="Your Name"
              className="w-full rounded-xl border border-gray-200 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full rounded-xl border border-gray-200 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <textarea
              rows={5}
              placeholder="Your Message"
              className="w-full rounded-xl border border-gray-200 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-[var(--main-web-color)] cursor-pointer hover:bg-[var(--main-web-color-2)] text-white rounded-xl py-3 font-semibold shadow-lg"
            >
            <Typography>Send Message</Typography>  
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
