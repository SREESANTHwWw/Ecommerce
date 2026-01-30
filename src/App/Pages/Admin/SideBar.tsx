import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import { FaBars, FaTimes } from "react-icons/fa";
import menu from "./Menu";
import { useState } from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { Typography } from "../../../@All/AppForm/Form";



const SideBar = ({  isOpen, setIsOpen }: any) => {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (title: any) => {
    setExpanded(expanded === title ? null : title);
  };

  return (
    <motion.div
      animate={{ width: isOpen ? 200 : 90 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 h-screen bg-white z-40 flex flex-col shadow"
      style={{
        
       
        width: isOpen ? 200 : 90,
      }}
    >
    
      <div className="flex justify-between items-center  p-3">
        <img
          src="/bgremoveLogo.png"
          alt="logo"
          className="w-32 h-20 object-cover"
        />
        <button
          className="ml-4 p-2 rounded transition-colors duration-200 z-20 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <FaTimes size={18}  />
          ) : (
            <FaBars size={18}  />
          )}
        </button>
      </div>

     
      <nav className="flex flex-col gap-1 mt-6 px-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const hasChildren = item?.children && item?.children.length > 0;

          return (
            <div key={item.title}>
              <div className="flex flex-col">
                {hasChildren ? (
                  <div className="px-4 py-2 flex items-center justify-between gap-2 rounded cursor-pointer transition-colors duration-200">
                    <Link
                      to={`/admin${item.url}`}
                      className="flex items-center gap-2"
                    >
                      <Icon size={18} />
                      {isOpen && <Typography>{item.title}</Typography>}
                    </Link>

                    <button
                      onClick={() => toggleExpand(item.title)}
                      className="ml-auto cursor-pointer transition-colors duration-200"
                    >
                      {expanded === item.title ? (
                        <KeyboardArrowUpOutlinedIcon />
                      ) : (
                        <KeyboardArrowDownOutlinedIcon />
                      )}
                    </button>
                  </div>
                ) : (
                  <Link
                    to={`/admin${item.url}`}
                    className="px-4 py-2 flex items-center gap-2 rounded cursor-pointer transition-colors duration-200"
                  >
                    <Icon size={18} />
                    {isOpen && <Typography>{item.title}</Typography>}
                  </Link>
                )}
              </div>

             
              <AnimatePresence>
                {expanded === item.title && hasChildren && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-6 flex flex-col"
                  >
                    {item?.children &&
                      item.children.map((child) => {
                        const ChilIcon = child.icon;
                        return (
                          <Link
                            key={child.url}
                            to={`/admin${child.url}`}
                            className="px-2 py-2 flex items-center gap-2 rounded cursor-pointer transition-colors duration-200"
                          >
                            <ChilIcon size={18} />
                            {isOpen && (
                              <Typography className="text-sm">
                                {child.title}
                              </Typography>
                            )}
                          </Link>
                        );
                      })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </motion.div>
  );
};

export default SideBar;
