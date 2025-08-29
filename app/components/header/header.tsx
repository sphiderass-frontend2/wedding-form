"use client";

import ProfilePicture from "@/public/svg/profile-pict.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { FaBell } from "react-icons/fa";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { useState } from "react";
import "./header.scss";

const MobileMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
      <div className="mobile-menu-header">
        <IoMdClose onClick={onClose} />
      </div>
      <div className="mobile-menu-links">
        <FaBell className="header-icon" color="#A1A0BD" size={24} />
        <BiSolidMessageSquareDetail
          className="header-icon"
          color="#A1A0BD"
          size={24}
        />
        <div className="user-profile-container">
          <Image src={ProfilePicture} className="header-profile" alt="" />
        </div>
      </div>
    </div>
  );
};

export default function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleProfileClick = () => {
    router.push("/profile/me");
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="header">
      <IoMdMenu
        className="user-option-toggle"
        color="#A1A0BD"
        size={30}
        onClick={handleMobileMenuToggle}
      />
      <div className="user-options">
        <FaBell className="header-icon" color="#A1A0BD" size={24} />
        <BiSolidMessageSquareDetail
          className="header-icon"
          color="#A1A0BD"
          size={24}
        />
        <div className="user-profile-container">
          <Image
            src={ProfilePicture}
            className="header-profile"
            alt=""
            onClick={handleProfileClick}
          />
        </div>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleMobileMenuToggle} />
    </div>
  );
}
