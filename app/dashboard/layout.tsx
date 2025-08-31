"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import DesktopSidebar from "../components/layout/DesktopSidebar";
import Header from "../components/layout/Header";
import { Home, OrganizationIcon, Wallet, Support } from "@/public/assets";
import { ThemeProvider } from "../lib/theme-provider";

const sidebarItems = [
  { icon: Home, text: "Home", href: "" },
  { icon: Home, text: "Event", href: "/dashboard" },
  { icon: OrganizationIcon, text: "Organization", href: "/dashboard/organization" },
  { icon: Wallet, text: "Wallet", href: "/dashboard/wallet" },
  { icon: Support, text: "Support", href: "/dashboard/support" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarExpanded(false);
        setIsMobile(true);
        setMobileMenuOpen(false);
      } else {
        setIsMobile(false);
        setMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setSidebarExpanded(!sidebarExpanded);
    }
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setIsDarkMode(theme === "dark");
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider>
      <div className="flex h-full min-h-screen max-w-full gap-6 bg-tab-secondary antialiased">
        <DesktopSidebar
          sidebarExpanded={sidebarExpanded}
          sidebarItems={sidebarItems}
          toggleSidebar={toggleSidebar}
          settingPage=""
          pathname={pathname}
        />

        <div
          className={`flex-1 ${
            !sidebarExpanded ? "lg:ml-[120px]" : "lg:ml-[280px]"
          } transition-all duration-400 ease-in-out`}
        >
          <div className="absolute md:relative w-full z-50 px-5 h-[64px]">
            <Header toggleSidebar={toggleSidebar} />
          </div>

          {/* ✅ just use <main>, no <body> */}
          <main className="min-h-[calc(100vh-64px)] md:w-[98%] overflow-y-auto md:p-4 md:mt-4">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
