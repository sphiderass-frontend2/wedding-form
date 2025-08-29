"use client";

import { useAuth } from "@/src/app/(auth)/utils/actions";
import { useAuth as useAuthContext } from "@/src/app/contexts/auth";
import Avatar from "@/public/svg/placeholder-user.svg";
import Logo from "@/public/svg/richlist.svg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight, FaWallet } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { HiOfficeBuilding } from "react-icons/hi";
import { HiTicket } from "react-icons/hi2";
import { IoMdArrowBack, IoMdOptions } from "react-icons/io";
import { PiWallet } from "react-icons/pi";
import { RiAccountPinCircleFill, RiSettings4Fill } from "react-icons/ri";
import { TbLogout2, TbMessage } from "react-icons/tb";
import { VscAdd } from "react-icons/vsc";
import Backdrop from "../backdrop/backdrop";
import "./sidebar.scss";

interface SidebarOptionProps {
  path: string;
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  isOpen: boolean;
  activeTab: string | null;
  handleNavigation: (path: string) => void;
}

const SidebarOption: React.FC<SidebarOptionProps> = ({
  path,
  Icon,
  label,
  isOpen,
  activeTab,
  handleNavigation,
}) => (
  <div
    className={`sidebar-option ${activeTab === path ? "active" : ""}`}
    onClick={() => handleNavigation(path)}
  >
    <Icon className="icon" />
    <span>{isOpen && label}</span>
  </div>
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { logout } = useAuth();
  const { user, isAuthenticated, isVerified } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user) {
      setProfileImage(user.image?.profile || Avatar.src);
    }
  }, [user]);

  useEffect(() => {
    const pathMap: { [key: string]: string } = {
      "/search": "/search",
      "/profile": "/profile",
      "/walletbcq": "/walletbcq",
      "/messages": "/messages",
      "/event/create": "/event/create",
      "/profile/me/organizations": "/profile/me/organizations",
    };
    setActiveTab(pathMap[pathname as string] || "/home");
  }, [pathname]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleOptionsMenu = () => setShowOptionsMenu(!showOptionsMenu);
  const handleNavigation = (path: string) => {
    if (pathname !== path) {
      router.push(path);
      setActiveTab(path);
    }
  };
  const handleLogout = () => {
    logout();
    handleNavigation("/login");
  };
  const handleBackdropClick = () => setShowOptionsMenu(false);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNavigation(`/search?q=${searchQuery}`);
    }
  };
  const handleSearchIconClick = () => {
    if (!isOpen) setIsOpen(true);
    handleNavigation(`/search?query=${searchQuery}`);
  };

  return (
    <div className={`sidebar-container ${isOpen ? "open" : "closed"}`}>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="toggle-button" onClick={toggleSidebar} role="button">
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </div>

        <div className="logo-container">
          <Image alt="Richlist Logo" src={Logo} className="richlist-logo" />
        </div>

        <div
          className="avatar-container"
          onClick={() => handleNavigation("/profile/me")}
        >
          <Image
            alt="user-image"
            src={profileImage || Avatar}
            className="user-image"
            width={50}
            height={50}
          />
        </div>

        <div className="search-container">
          <BsSearch className="search-icon" onClick={handleSearchIconClick} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyPress}
            className="search-input"
          />
        </div>

        <div className="icon-container">
          <SidebarOption
            path="/home"
            Icon={GoHomeFill}
            label="Home"
            isOpen={isOpen}
            activeTab={activeTab}
            handleNavigation={handleNavigation}
          />
          <SidebarOption
            path="/event/create"
            Icon={HiTicket}
            label="Events"
            isOpen={isOpen}
            activeTab={activeTab}
            handleNavigation={handleNavigation}
          />
          <SidebarOption
            path="/chat"
            Icon={BiSolidMessageSquareDetail}
            label="Messages"
            isOpen={isOpen}
            activeTab={activeTab}
            handleNavigation={handleNavigation}
          />
          <SidebarOption
            path="/walletbcq"
            // Icon={FaWallet}
            Icon={HiOfficeBuilding}
            label="Coming Soon"
            isOpen={isOpen}
            activeTab={activeTab}
            handleNavigation={handleNavigation}
          />
          <SidebarOption
            path="/profile/me/organizations"
            Icon={HiOfficeBuilding}
            label="Organizations"
            isOpen={isOpen}
            activeTab={activeTab}
            handleNavigation={handleNavigation}
          />
        </div>

        {isAuthenticated && isVerified && (
          <div className="sidebar-bottom-container">
            <SidebarOption
              path="/profile/me/edit"
              Icon={RiSettings4Fill}
              label="Settings"
              isOpen={isOpen}
              activeTab={activeTab}
              handleNavigation={handleNavigation}
            />
            <div className="sidebar-option" onClick={handleLogout}>
              <TbLogout2 className="icon" />
              <span>{isOpen && "Logout"}</span>
            </div>
          </div>
        )}

        <div className="mobile-navigation">
          <SidebarOption
            path="/event/create"
            Icon={VscAdd}
            label=""
            isOpen={isOpen}
            activeTab={activeTab}
            handleNavigation={handleNavigation}
          />
          <SidebarOption
            path="/search"
            Icon={CiSearch}
            label=""
            isOpen={isOpen}
            activeTab={activeTab}
            handleNavigation={handleNavigation}
          />
          <SidebarOption
            path="/home"
            Icon={GoHomeFill}
            label=""
            isOpen={isOpen}
            activeTab={activeTab}
            handleNavigation={handleNavigation}
          />
          <SidebarOption
            path="/profile/me"
            Icon={RiAccountPinCircleFill}
            label=""
            isOpen={isOpen}
            activeTab={activeTab}
            handleNavigation={handleNavigation}
          />
          <div className="mobile-option" onClick={toggleOptionsMenu}>
            <IoMdOptions />
          </div>
        </div>

        {showOptionsMenu && (
          <>
            <div className="sub-options">
              <p onClick={() => handleNavigation("/walletbcq")}>
                {/* <PiWallet /> Coming Soon */}
                <TbMessage /> Coming Soon
              </p>
              <p onClick={() => handleNavigation("/chat")}>
                <TbMessage /> Messages
              </p>
              <p onClick={handleLogout}>
                <IoMdArrowBack /> Logout
              </p>
            </div>
            <Backdrop isOpen={true} handleClick={handleBackdropClick} />
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
