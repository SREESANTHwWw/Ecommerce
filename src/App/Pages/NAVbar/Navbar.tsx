import { useEffect, useState } from "react";
import MobileNavbar from "./MobileNavbar/MobileNavbar";
import DesktopNavbar from "./DesktopNavbar/DesktopNavbar";
import SearchModal from "./Search/SearchModal";
import SideBar from "./SideBar/SideBar";

const Navbar = () => {
  const [searchTab, setSearchTab] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(!(currentScrollY > lastScrollY && currentScrollY > 80));
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSearchTab(false);
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [searchTab]);

  useEffect(() => {
    document.body.style.overflow = searchTab ? "hidden" : "auto";
  }, [searchTab]);

  return (
    <>
      {isMobile ? (
        <MobileNavbar
          setSearchTab={setSearchTab}
          setIsSidebarOpen={setIsSidebarOpen}
          showNavbar={showNavbar}
        />
      ) : (
        <DesktopNavbar
          setSearchTab={setSearchTab}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          showNavbar={showNavbar}
        />
      )}

      <SearchModal searchTab={searchTab} setSearchTab={setSearchTab} />

      {isSidebarOpen && (
        <SideBar
          onClose={() => setIsSidebarOpen(false)}
          setSearchTab={setSearchTab}
        />
      )}
    </>
  );
};

export default Navbar;
