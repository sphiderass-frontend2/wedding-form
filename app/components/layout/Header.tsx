"use client";
import React, { useState, useRef, useEffect } from "react";
// import { MenuIcon, ChevronDown } from "lucide-react";
import { SMS, Notification, Location, Search, Hamburger, HamburgerLight } from "@/public/assets";
import Avatar from '@/public/assets/images/Avatar.png'
import Image from "next/image";
import { useTheme } from "../../lib/theme-provider";
import Link from "next/link";
import { ThemeToggle } from "../../components/ui/theme-toggle";
import { Logo } from "@/public/assets";
import { useRouter } from "next/navigation";
import { Home, OrganizationIcon, Wallet, Support, EventIcon } from "@/public/assets";
import { usePathname } from "next/navigation";
import ToggleMode from "../../components/ui/toggle-mode";
import LayoutFooter from "@/public/assets/images/layoutFooter.png"



const MobileNavItem = [
  { icon: Home, text: "Home", href: "/dashboard" },

  {
    icon: EventIcon,
    text: "Event",
    href: "/dashboard/event",
  },

  {
    icon: OrganizationIcon,
    text: "Organization",
    href: "/dashboard/organization",
  },

  {
    icon: Wallet,
    text: "Wallet",
    href: "",
  },
  {
    icon: Support,
    text: "Support",
    href: "",
  }
];

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const router = useRouter()
    const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };



  return (
    <>
  
    <header className="border-gray-200 sticky right-0 top-0 z-50 h-20 w-full bg-background md:px-10 px-5 hidden md:block">
      <div className="flex h-full items-center justify-between md:pr-4">
        <div className="flex items-center">
        
          <button
            type="button"
            aria-label="Toggle Menu"
            onClick={toggleSidebar}
            className="hover:bg-gray-100 rounded-md p-2 focus:outline-none lg:hidden"
          >
            {/* <MenuIcon size={20} /> */}
          </button>
        </div>


        <div className="w-[30%]">

            <div className="border-2 rounded-2xl w-full bg-[#FFFFFF4D] border-gray flex items-center gap-3 px-7 py-4">
                <Image src={Search} alt="search"  width={10} height={20} />
                <input type="text" className="outline-none w-full" placeholder="Search for events" />
            </div>

        </div>


        <div className="flex items-center gap-5">


            <div className="flex gap-3">
                <p className="bg-tab-primary p-2 rounded-2xl">
                    <Image src={Notification} alt="notify"  width={10} height={20} />
                </p>
                <p className="bg-tab-primary p-2 rounded-2xl">
                    <Image src={SMS} alt="notify"  width={10} height={20} />
                </p>
            </div>

            <div className="flex gap-2 text-text-primary " onClick={() => router.push("/dashboard/profile")}>
            <Image src={Avatar} alt="avatar" />
            <div className="space-y-1">
                <p>sinmi_ogedengbe</p>
                <p className="flex items-center text-gray text-base"> <Image src={Location} alt="locate" width={10} height={20}  /> Ikeja,Lagos</p>
            </div>


            </div>
        </div>

     
      </div>
    </header>
    
  {/* Navbar */}
<nav className="flex items-center justify-between gap-6 bg-background mt-2 z-50 shadow-2xl p-4 rounded-full w-full md:w-auto transition-colors duration-300 md:hidden">
  <div>
    <Image src={Logo} alt="logo" width={50} />
  </div>

  <button className="md:hidden relative" onClick={toggleMenu}>
    <span
      className={`transition-transform duration-300 ${
        isOpen ? "rotate-180" : ""
      }`}
    >
      {theme === "light" && !isOpen ? (
        <Image src={Hamburger} alt="icon"  width={10} height={20} />
      ) : (
        <Image src={HamburgerLight} alt="icon"  width={10} height={20} />
      )}
    </span>
  </button>
</nav>

<div
  className={`absolute top-0 left-0 w-full pb-8 min-h-screen bg-tab-primary md:hidden transition-opacity duration-500 ease-in-out z-40 ${
    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
  }`}
>
  <div
    className={`flex flex-col items-start w-full px-6 pt-20 transition-all duration-700 ease-out ${
      isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
    }`}
  >
    {/* Nav Items */}
    <div className="flex flex-col gap-8 mb-12 w-full">
      {MobileNavItem.map((nav, index) => (
        <Link
          key={index}
          href={nav.href}
          onClick={closeMenu}
          className={`flex items-center gap-5 text-xl font-medium text-black/80 dark:text-gray-200 hover:text-black dark:hover:text-white w-full transition-colors duration-300 px-4 py-2 rounded-md ${
            pathname === nav.href ? "bg-[var(--accent)]" : "hover:bg-[var(--accent)]"
          }`}
        >
          <Image src={nav.icon} alt="icon"  width={10} height={20} />
          {nav.text}
        </Link>
      ))}
    </div>

    {/* Profile Section */}
    <div
      className="flex gap-3 items-center w-full px-4 py-3 rounded-md hover:bg-[var(--accent)] transition-colors cursor-pointer text-text-primary"
      onClick={() => {
        router.push("/dashboard/profile");
        setIsOpen(false);
      }}
    >
      <Image src={Avatar} alt="avatar" className="w-12 h-12 rounded-full" />
      <div className="space-y-1">
        <p className="font-semibold">sinmi_ogedengbe</p>
        <p className="flex items-center text-gray text-sm gap-1">
          <Image src={Location} alt="locate" className="w-4 h-4"  width={10} height={20} /> Ikeja, Lagos
        </p>
      </div>
    </div>

    {/* Footer Section */}
    <div className="mt-10 w-full">
    
      <div className="flex justify-center mb-6">
        <Image src={LayoutFooter} alt="layoutFooter"  width={10} height={20} />
      </div>
      <div className="flex justify-center ">
        <ToggleMode />
      </div>
    </div>
  </div>
</div>

   
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={closeMenu}
        />
      )}

    </>
  );
};

export default Header;
