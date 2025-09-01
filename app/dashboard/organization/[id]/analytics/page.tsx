"use client";

import React, { useState, useRef } from "react";
import Corona from "@/public/assets/images/corona.png";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Inguiry,
  QrCode,
  Sponsor,
  Receipt,
  VR,
  Arrowup,
  ArrowDown,
  Filtering,
} from "@/public/assets";
import ScanCode from "../../component/modals/ScanCode";
import EventDetails from "../../component/modals/EventDetails";
import EngagementGraph from "../../component/EngagementGraph";
import { MoreVerticalIcon } from "lucide-react";
import { BrowserQRCodeReader } from "@zxing/browser";
import { Button } from "@/app/components/ui/button";

const Info = [
  {
    id: 1,
    icon: Receipt,
    name: "Invitation Cards",
    no: "100",
    secondIcon: Arrowup,
    percent: "10%",
  },
  {
    id: 2,
    icon: VR,
    name: "Invitation Accepted",
    no: "90",
    secondIcon: Arrowup,
    percent: "10%",
  },
  {
    id: 3,
    icon: Sponsor,
    name: "Invitation Declined",
    no: "4",
    secondIcon: ArrowDown,
    percent: "2%",
  },
];

type Attendee = {
  username: string;
  prize: string;
  date: string;
  ticket: string;
  status: string;
  category?: string;
  brand?: string;
  email?: string;
  amount?: string;
  refund?: boolean;
};

type Vendor = {
  username: string;
  prize?: string;
  ticket?: string;
  amount: string;
  category: string;
  brand: string;
  email: string;
  date: string;
  status?: string;
  refund?: boolean;
};

const sampleData = [
  { date: "Oct 1", value: 20 },
  { date: "Oct 3", value: 45 },
  { date: "Oct 5", value: 80 },
  { date: "Oct 7", value: 95 },
  { date: "Oct 9", value: 70 },
  { date: "Oct 11", value: 60 },
];

function Analytics() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "attendees" | "vendors" | "refunds"
  >("attendees");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [modals, setModals] = useState({
    code: false,
    event: false,
    dropdown: false,
  });
  const [activeDropdownRow, setActiveDropdownRow] = React.useState<
    number | null
  >(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [scanned, setScanned] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);

  const startScanner = async () => {
    setScanning(true);
    setScanned(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      alert(
        "Camera not supported in this browser. Please use Chrome or Safari over HTTPS."
      );
      setScanning(false);
      return;
    }

    const codeReader = new BrowserQRCodeReader();

    try {
      const result = await codeReader.decodeOnceFromVideoDevice(
        undefined,
        videoRef.current!
      );
      setScanned(result.getText());
      setScanning(false);
    } catch (err) {
      console.error("QR Scan Error:", err);
      setScanning(false);
    }
  };

  const attendeesData: Attendee[] = [
    {
      username: "Chris Brown",
      prize: "chrisbrown@email.com",
      date: "2023-10-02, 11:30 AM",
      ticket: "Accept",
      status: "Decline",
      refund: true,
    },
    {
      username: "Mark Wilson",
      prize: "markwilson@email.com",
      date: "2023-10-03, 09:45 AM",
      ticket: "Accept",
      status: "Decline",
      refund: false,
    },
    {
      username: "Esther Jackson",
      prize: "estherj@email.com",
      date: "2023-10-03, 01:15 PM",
      ticket: "Accept",
      status: "Decline",
      refund: true,
    },
    {
      username: "Ping Lee",
      prize: "pinglee@email.com",
      date: "2023-10-03, 04:00 PM",
      ticket: "Accept",
      status: "Decline",
      refund: true,
    },
    {
      username: "Sarah Johnson",
      prize: "sarahj@email.com",
      date: "2023-10-04, 10:00 AM",
      ticket: "Accept",
      status: "Decline",
      refund: false,
    },
  ];

  const vendorsData: Vendor[] = [
    {
      username: "Charles Chiwendu",
      amount: "₦100,000,000",
      category: "Sponsor",
      brand: "CocaCola NG",
      email: "cocacolang@gmail.com",
      date: "2025-10-21, 2:00 PM",
    },
    {
      username: "Collins Grey",
      amount: "₦100,000",
      category: "Vendor",
      brand: "KK Chops",
      email: "kkfoods@gmail.com",
      date: "2025-10-21, 2:00 PM",
    },
    {
      username: "David Ojo",
      amount: "₦800,000",
      category: "Sponsor",
      brand: "MTN",
      email: "mtnng@gmail.com",
      date: "2025-10-21, 2:00 PM",
    },
    {
      username: "Chelsea Green",
      amount: "₦55,000",
      category: "Vendor",
      brand: "Chops n Grills",
      email: "-",
      date: "2025-10-21, 2:00 PM",
    },
    {
      username: "Adesewa Susan",
      amount: "₦80,000",
      category: "Vendor",
      brand: "Sewa Foods",
      email: "adesewafood@gmail.com",
      date: "2025-10-21, 2:00 PM",
    },
  ];

  const data = activeTab === "attendees" ? attendeesData : vendorsData;
  const totalItems =
    activeTab === "attendees"
      ? attendeesData.length
      : activeTab === "refunds"
      ? attendeesData.filter((item) => item.refund === true).length
      : vendorsData.length;

  const refundTotal = attendeesData.filter(
    (item) => item.refund === true
  ).length;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData =
    activeTab === "attendees"
      ? attendeesData.slice(startIndex, startIndex + itemsPerPage)
      : activeTab === "refunds"
      ? attendeesData
          .filter((item) => item.refund === true) // only refunds
          .slice(startIndex, startIndex + itemsPerPage)
      : vendorsData.slice(startIndex, startIndex + itemsPerPage);
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusClasses = (status: string | undefined) => {
    switch (status) {
      case "Approved":
        return "bg-[#F3FFF4] text-[#009311] border border-[#00931133]";
      case "Not Admitted":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getCategoryClasses = (category: string | undefined) => {
    switch (category) {
      case "Vendor":
        return "bg-[#F3FFF4] text-[#009311] border border-[#00931133]";
      case "Sponsor":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <>
      <div
        className="relative w-full h-[70vh] md:h-[400px] bg-cover bg-center rounded-t-2xl"
        style={{ backgroundImage: `url(${Corona.src})` }}
      >
        <div className="absolute inset-0 bg-black/50 rounded-t-2xl" />

        <div className="absolute top-4 left-4 z-20">
          <Button onClick={() => router.back()} className="hidden md:block">
            ← Back
          </Button>
        </div>
      </div>

      <section className="px-2 md:px-0">
        <section className="bg-tab-primary rounded-2xl w-full p-5 mt-10">
          <div className="space-y-3 text-text-primary">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h1 className="font-bold text-2xl sm:text-3xl">
                Shola & Yusuf's Wedding
              </h1>

              <div>
                {!scanning ? (
                  <Button
                    className="flex items-center gap-2 w-full sm:w-auto justify-center"
                    //  onClick={() => setModals({ ...modals, code: true })}
                    onClick={startScanner}
                  >
                    <Image src={QrCode} alt="qrcode" />
                    Scan QR Code
                  </Button>
                ) : (
                  <div className="flex flex-col items-center">
                    <video
                      ref={videoRef}
                      style={{ width: "300px", height: "300px" }}
                    />
                    <p className="mt-2 text-gray-600">
                      Point your camera at a QR code...
                    </p>
                  </div>
                )}
              </div>
            </div>

            <p className="text-gray font-normal text-sm sm:text-base">
              Event Date: <span className="text-black">October 20th</span>
            </p>
            <p className="text-gray mt-5 sm:mt-7 text-base sm:text-xl">
              A beautiful celebration of love, joy, and unity. Surrounded by
              family and friends, this special day will be filled with warmth,
              elegance, and heartfelt moments that will be cherished forever.
            </p>
          </div>

          {/* Info Cards */}
          <div className="flex flex-wrap gap-5 mt-10">
            {Info.map((ana, index) => (
              <div key={index} className="bg-tab-secondary rounded-2xl p-6">
                <div className="flex flex-col items-start gap-3">
                  <p className="bg-[#4D67FE1A] p-5 rounded-2xl">
                    <Image src={ana.icon} alt="icon" />
                  </p>

                  <p className="font-semibold text-xl text-text-primary">
                    {ana.no}
                  </p>
                  <p className="text-[#6C6C6C] text-lg">{ana.name}</p>

                  <div className="border-[#00931133] bg-[#F3FFF4] flex items-center rounded-xl p-2 text-[#009311] gap-2 border-2">
                    <Image src={ana.secondIcon} alt="second" />
                    <p>{ana.percent}</p>
                    <p className="text-sm">vs Last week</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Graph */}
          <div className="p-6 text-text-primary">
            <EngagementGraph data={sampleData} />
          </div>

          {/* Tabs & Filter */}
          <section className="bg-tab-secondary p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-10">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setActiveTab("attendees");
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 text-sm sm:text-xl rounded-t-lg cursor-pointer ${
                  activeTab === "attendees"
                    ? "bg-[#4D67FE33] text-accent"
                    : "text-gray"
                }`}
              >
                RSVP List
              </button>
              <button
                onClick={() => {
                  setActiveTab("vendors");
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 text-sm sm:text-xl rounded-t-lg cursor-pointer ${
                  activeTab === "vendors"
                    ? "bg-[#4D67FE33] text-accent"
                    : "text-gray"
                }`}
              >
                Accepted Invitation
              </button>
              <button
                onClick={() => {
                  setActiveTab("refunds");
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 text-sm sm:text-xl rounded-t-lg cursor-pointer ${
                  activeTab === "refunds"
                    ? "bg-[#4D67FE33] text-accent"
                    : "text-gray"
                }`}
              >
                Declined Invitation{" "}
                <span className="bg-error ml-1 text-white font-bold rounded-full px-2 py-0 text-xs">
                  {refundTotal}
                </span>
              </button>
            </div>

            <div className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto flex justify-center"
              >
                <Image src={Filtering} alt="filter" />
                Filter by
              </Button>
            </div>
          </section>

          <div className="mt-5 max-w-sm md:max-w-full  overflow-x-auto no-scrollbar rounded-lg">
            <table className="min-w-[1000px] md:min-w-full border-separate border-spacing-y-2  p-5 rounded-md text-text-primary text-sm sm:text-base">
              <thead className="text-left text-gray">
                {activeTab === "attendees" || activeTab === "refunds" ? (
                  <tr>
                    <th className="font-normal">Full Name</th>
                    <th className="font-normal">Email</th>
                    <th className="font-normal">Date & Time</th>
                    <th className="font-normal">Action</th>
                  </tr>
                ) : (
                  <tr>
                    <th className="font-normal">Username</th>
                    <th className="font-normal">Amount</th>
                    <th className="font-normal">Category</th>
                    <th className="font-normal">Brand</th>
                    <th className="font-normal">Email</th>
                    <th className="font-normal">Date & Time</th>
                  </tr>
                )}
              </thead>

              <tbody className="cursor-pointer">
                {activeTab === "attendees" || activeTab === "refunds"
                  ? paginatedData.map((item, idx) => (
                      <tr
                        key={idx}
                        className="border-y border-gray rounded-lg relative"
                      >
                        <td
                          className="py-3"
                          onClick={() => setModals({ ...modals, event: true })}
                        >
                          {item.username}{" "}
                          {/* {item.refund === true && (
                            <span className="bg-error w-2 h-2 ml-5 rounded-full px-3 py-0"></span>
                          )} */}
                        </td>
                        <td>{item.prize}</td>
                        <td>{item.date}</td>
                        <td>
                          <div className="flex gap-2">
                            <Button className="bg-[#009311] text-white ">
                              Accept
                            </Button>
                            <button className="text-red-500 cursor-pointer">
                              Decline
                            </button>
                          </div>
                        </td>
{/* 
                        <td
                          onClick={() =>
                            setActiveDropdownRow(
                              activeDropdownRow === idx ? null : idx
                            )
                          }
                          className="relative"
                        >
                          <MoreVerticalIcon />
                        </td> */}

                        {activeDropdownRow === idx && (
                          <div className="bg-tab-primary rounded-2xl absolute right-12 mt-2 p-3 z-50 shadow-lg">
                            <button
                              onClick={() =>
                                setModals({ ...modals, event: true })
                              }
                              className="cursor-pointer w-full text-left"
                            >
                              View details
                            </button>
                          </div>
                        )}
                      </tr>
                    ))
                  : paginatedData.map((item, idx) => (
                      <tr
                        key={idx}
                        className="border-y border-gray rounded-lg relative"
                      >
                        <td
                          className="py-3"
                          onClick={() => setModals({ ...modals, event: true })}
                        >
                          {item.username}
                        </td>
                        <td>{item.amount}</td>
                        <td>
                          <span
                            className={`px-3 py-1 rounded-xl text-sm ${getCategoryClasses(
                              item.category
                            )}`}
                          >
                            {item.category}
                          </span>
                        </td>
                        <td>{item.brand}</td>
                        <td>{item.email}</td>
                        <td>{item.date}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-gray-500 disabled:opacity-50"
            >
              ← Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : "text-gray-600"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-gray-500 disabled:opacity-50"
            >
              Next →
            </button>
          </div>

          {modals.code && (
            <ScanCode onClose={() => setModals({ ...modals, code: false })} />
          )}
          {modals.event && (
            <EventDetails
              onClose={() => setModals({ ...modals, event: false })}
            />
          )}
        </section>
      </section>
    </>
  );
}

export default Analytics;
