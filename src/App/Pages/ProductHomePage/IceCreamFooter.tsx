import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Typography } from "../../../@All/AppForm/Form";
import { motion } from "framer-motion";

const IceCreamFooter: React.FC = () => {
  return (
    <footer className="relative bg-[var(--main-web-color)]  text-white pt-24 pb-10 overflow-hidden">
      {/* Decorative Wave Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
        <svg className="relative block w-full h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.41,133.73,118.07,198.8,107.7Z" 
            fill="#fafafa" // Matches your page background
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <Typography className="text-3xl font-black text-[var(--main-bg-color)] tracking-tighter">
              Groviya<Typography className="text-white ">.</Typography>
            </Typography>
            <Typography className="text-gray-400 leading-relaxed max-w-sm">
              Crafting happiness since 2024. We use only the finest organic cream and hand-picked flavors to make every scoop a celebration.
            </Typography>
            <div className="flex gap-4">
              {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ y: -5, scale: 1.1 }}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-[var(--main-web-color)] hover:text-white transition-all shadow-xl"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 lg:col-span-2">
            <Typography className="text-sm font-black uppercase tracking-[0.2em] text-white mb-6">
              Shop treats
            </Typography>
            <ul className="flex flex-col gap-4">
              {["Home", "All Flavors", "Monthly Special", "Our Story", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm font-medium">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Location */}
          <div className="md:col-span-2 lg:col-span-2">
            <Typography className="text-sm font-black uppercase tracking-[0.2em] text-white mb-6">
              Find Us
            </Typography>
            <Typography className="text-gray-400 text-sm leading-relaxed">
              123 Scoop Street,<br />
              Dessert Valley, CA 90210<br />
              <span className="block mt-4 font-bold text-white underline">hello@groviya.com</span>
            </Typography>
          </div>

          {/* Newsletter Section */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <Typography className="text-sm font-black uppercase tracking-[0.2em] text-white">
              Stay Chilled
            </Typography>
            <Typography className="text-gray-400 text-sm leading-relaxed">
              Join our newsletter for secret flavors and early access to "Free Scoop Friday" events!
            </Typography>
            <form className="relative flex items-center group">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white/5 border border-white/10 p-4 pr-32 rounded-2xl focus:outline-none focus:border-[var(--main-web-color)]  transition-all text-sm"
              />
              <button
                type="submit"
                className="absolute right-2 bg-[var(--main-web-color)]  text-white px-5 py-2.5 rounded-xl font-bold cursor-pointer text-xs hover:bg-[var(--main-web-color-2)] transition-all shadow-lg active:scale-95"
              >
                Join Now
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <Typography className="text-gray-500 text-xs font-medium uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Groviya Co. Made with ❤️ and cream.
          </Typography>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Subtle Background Glow */}
      <div className="absolute bottom-[-10%] left-[20%] w-[300px] h-[300px] bg-[var(--main-web-color-2)] rounded-full blur-[100px] pointer-events-none" />
    </footer>
  );
};

export default IceCreamFooter;