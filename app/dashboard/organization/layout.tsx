"use client"

import React from 'react';
import BgPicture from "@/public/assets/images/organization.png";
import CreateOrg from "@/public/assets/images/createOrg.png";

import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/app/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const onBack = () => {
    router.back();
  };

  const isCreatePage = pathname === "/dashboard/organization/createOrganization";
  const isDetailOrAnalyticsPage =
    pathname?.match(/^\/dashboard\/organization\/[^\/]+\/(detail|analytics)$/);

  const backgroundImage = isCreatePage ? CreateOrg.src : BgPicture.src;
  const title = isCreatePage ? "Create an Organization" : "Organizations";
  const subtitle = isCreatePage 
    ? "To create events on Richlist, you must first create an organization."
    : "";

  return (
    <>
      {!isDetailOrAnalyticsPage && (
        <div 
          className="relative w-full h-[300px] md:h-[400px] bg-cover bg-center flex items-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute top-4 left-4 z-20">
            <Button onClick={onBack}>
              ← Back
            </Button>
          </div>

          <div className="relative z-10 text-white px-6 md:left-[35%] md:right-[45%] md:px-14">
            <h1 className="text-5xl font-semibold mb-2">{title}</h1>
            {subtitle && <p className="text-lg text-white">{subtitle}</p>}
          </div>
        </div>
      )}

      <main className=" md:px-4 md:mt-10">
        {children}
      </main>
    </>
  );
}

export default Layout;
