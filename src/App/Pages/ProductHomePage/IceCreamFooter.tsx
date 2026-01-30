import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Typography } from "../../../@All/AppForm/Form";

const IceCreamFooter: React.FC = () => {
  return (
    <footer className="text-white py-10 ">
      {" "}
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between gap-10">
        <div className="md:w-1/3 flex flex-col">
          <Typography className="text-2xl font-bold text-[var(--main-web-color)]">
           Groviya
          </Typography>
          <Typography className="mt-4 text-white">
            Bringing smiles with every scoop! Explore our delicious flavors and
            indulge in creamy goodness.
          </Typography>
          <div className="flex mt-4 space-x-4">
            <a
              href="#"
              className="text-white hover:text-[var(--main-web-color-2)]"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="text-white hover:text-[var(--main-web-color-2)]"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-white hover:text-[var(--main-web-color-2)]"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:w-1/4">
          <h2 className="text-lg font-semibold mb-4">
            <Typography>Quick Links</Typography>
          </h2>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-white hover:text-[var(--main-web-color-2)]"
              >
                <Typography>Home</Typography>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white hover:text-[var(--main-web-color-2)]"
              >
                <Typography>Flavors</Typography>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white hover:text-[var(--main-web-color-2)]"
              >
                <Typography>Menu</Typography>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white hover:text-[var(--main-web-color-2)]"
              >
                <Typography>Contact</Typography>
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:w-1/3">
          <h2 className="text-lg font-semibold mb-4">
            <Typography>Subscribe to our Newsletter</Typography>
          </h2>
          <p className="text-white mb-4">
            <Typography>
              Get updates on new flavors and special offers!
            </Typography>
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded border border-gray-300 flex-1 focus:outline-none focus:ring-2 focus:ring-pink-300 text-black"
            />
            <button
              type="submit"
              className="bg-[var(--main-web-color)] text-white px-4 py-2 rounded hover:bg-[var(--main-web-color-2)] transition-colors"
            >
              <Typography>Subscribe</Typography>
            </button>
          </form>
        </div>
      </div>
      <div className="text-center text-white mt-10 border-t border-gray-300 pt-4 hover:text-[var(--main-web-color-2)] transition-colors">
        <Typography>
          {" "}
          &copy; {new Date().getFullYear()} CreamyDelight. All rights reserved.
        </Typography>
      </div>
    </footer>
  );
};

export default IceCreamFooter;
