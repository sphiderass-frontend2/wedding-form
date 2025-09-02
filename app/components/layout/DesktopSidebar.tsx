"use client";

import React, { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Logo, Logout } from "@/public/assets";
import ToggleMode from "../../components/ui/toggle-mode";
import LayoutFooter from "@/public/assets/images/layoutFooter.png";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";

interface SidebarItem {
  icon: string;
  text: string;
  href: string;
}

interface DesktopSidebarProps {
  sidebarItems: SidebarItem[];
  sidebarExpanded: boolean;
  toggleSidebar: () => void;
  settingPage?: string;
  pathname: string;
}

const DesktopSidebar: FC<DesktopSidebarProps> = ({
  sidebarItems,
  sidebarExpanded,
  toggleSidebar,
  pathname,
}) => {
  const route = useRouter();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    route.push("/signin");
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarExpanded ? "250px" : "100px" }}
      className="fixed left-0 top-0 z-50 hidden h-screen flex-col bg-background shadow-md lg:flex transition-all duration-300 ease-in-out"
    >
      {/* Toggle Button */}
      <button
        type="button"
        aria-label="Toggle Sidebar"
        onClick={toggleSidebar}
        className="absolute -right-4 top-5 flex size-8 items-center justify-center rounded-full shadow-2xl bg-tab-primary  cursor-pointer text-text-primary font-bold"
      >
        {/* Toggle Icon Here */}
        {" < "}
      </button>

      {/* Sidebar Content */}
      <div className="flex h-full flex-col gap-y-2 overflow-y-auto">
        {/* Header */}
        <div
          className={`flex items-center justify-center px-2 text-3xl font-semibold text-accent ${
            sidebarExpanded ? "py-4" : "py-2"
          }`}
        >
          {" "}
          {sidebarExpanded ? (
            <p className="flex items-center">
              <Image src={Logo} alt="logo" width={50} height={50} />
              Richlist
            </p>
          ) : (
            <p>
              <Image src={Logo} alt="logo" width={50} height={50} />
            </p>
          )}
        </div>

        {/* Menu Items */}
        <div className="flex w-full flex-col gap-y-2">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center py-4 text-text-primary pl-10 hover:bg-[var(--accent)] ${
                pathname === item.href ? "bg-[var(--accent)]" : ""
              }`}
            >
              <Image
                src={item.icon}
                alt={item.text}
                width={24}
                height={24}
                className="object-contain"
              />
              {sidebarExpanded && <span className="ml-4">{item.text}</span>}
            </Link>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-auto flex flex-col gap-4 py-2 px-4 text-text-primary">
          <Image src={LayoutFooter} alt="layoutFooter" />

          <button onClick={handleLogout} className="flex items-center gap-2 cursor-pointer">
            <Image src={Logout} alt="logutr" width={50} height={80} />
            <p> Logout</p>
          </button>

          <div>
            <ToggleMode />
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default DesktopSidebar;
