"use client";
import { Hamburger, HamburgerLight, Logo } from "@/public/assets";
import Image from "next/image";
import Link from "next/link";
// import { Button } from "./ui/button";
import { ThemeToggle } from "./ui/theme-toggle";
import { useState } from "react";
import { useTheme } from "../lib/theme-provider";
// import { clear } from "console";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between gap-6 bg-background p-4 rounded-full w-full md:w-auto transition-colors duration-300">
        <Image src={Logo} alt="logo" width={50} />

        {/* Links */}
        <div className="md:flex gap-8 items-center text-black/60 dark:text-gray-300 hidden">
          <Link href={"#"}>Home</Link>
          <Link href={"#"}>Events</Link>
          <Link href={"#"}>About us</Link>
          <Link href={"#"}>Contacts</Link>
        </div>

        <div className="md:flex gap-2 items-center hidden">
          <ThemeToggle />
          <Link
            href={"/signup"}
            className="border-0 hover:bg-background hover:text-accent hover:border-2 hover:border-accent transition-all duration-300 ease-out bg-accent text-white rounded-4xl px-[20px] py-[14px] has-[>svg]:px-3"
          >
            Sign Up
          </Link>
          <Link
            href={"/signin"}
            className="hover:bg-accent  hover:text-white transition-all duration-300 ease-out rounded-4xl gap-1.5  border-2 border-accent bg-background text-accent px-[20px] py-[14px] has-[>svg]:px-3"
          >
            Log In
          </Link>
        </div>

        <button className="md:hidden z-50 relative" onClick={toggleMenu}>
          <span
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            {theme === "light" && !isOpen ? (
              <Image src={Hamburger} alt="icon" width={20} height={30} />
            ) : (
              <Image src={HamburgerLight} alt="icon" width={20} height={30} />
            )}
          </span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white dark:bg-gray-900 z-40 md:hidden transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Mobile Menu Content */}
        <div
          className={`flex flex-col items-center justify-center h-full px-8 transition-all duration-700 ease-out ${
            isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Mobile Links */}
          <div className="flex flex-col gap-8 items-center text-center mb-12">
            <Link
              href={"#"}
              onClick={closeMenu}
              className="text-3xl font-medium text-black/80 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors duration-300 hover:scale-105 transform"
            >
              Home
            </Link>
            <Link
              href={"#"}
              onClick={closeMenu}
              className="text-3xl font-medium text-black/80 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors duration-300 hover:scale-105 transform"
            >
              Events
            </Link>
            <Link
              href={"#"}
              onClick={closeMenu}
              className="text-3xl font-medium text-black/80 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors duration-300 hover:scale-105 transform"
            >
              About us
            </Link>
            <Link
              href={"#"}
              onClick={closeMenu}
              className="text-3xl font-medium text-black/80 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors duration-300 hover:scale-105 transform"
            >
              Contacts
            </Link>
          </div>

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <div className="flex justify-center mb-4">
              <ThemeToggle />
            </div>
            <Link
              href={"/signup"}
              className="border-0 hover:bg-background hover:text-accent hover:border-2 hover:border-accent transition-all duration-300 ease-out bg-accent text-white rounded-4xl px-[20px] py-[14px] has-[>svg]:px-3"
              onClick={closeMenu}
            >
              Sign Up
            </Link>
            <Link
              href={"/signin"}
              className="hover:bg-accent  hover:text-white transition-all duration-300 ease-out rounded-4xl gap-1.5  border-2 border-accent bg-background text-accent px-[20px] py-[14px] has-[>svg]:px-3"
              onClick={closeMenu}
            >
              Log In
            </Link>
          </div>
        </div>
      </div>

      {/* Background overlay to close menu when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={closeMenu}
        />
      )}
    </>
  );
};

export default Nav;
