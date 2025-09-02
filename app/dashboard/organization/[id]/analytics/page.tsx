"use client";

import React, { useState, useRef, useEffect } from "react";
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
import { useWedding } from "@/app/hooks/useWedding";

// This will be populated with real data from the API
const getInfoCards = (statistics: any) => [
  {
    id: 1,
    icon: Receipt,
    name: "Invitation Cards",
    no: statistics?.totalInvitations?.toString() || "0",
    secondIcon: Arrowup,
    percent: statistics?.changes?.invitationChange || "0%",
  },
  {
    id: 2,
    icon: VR,
    name: "Invitation Accepted",
    no: statistics?.invitationsAccepted?.toString() || "0",
    secondIcon: Arrowup,
    percent: statistics?.changes?.acceptanceChange || "0%",
  },
  {
    id: 3,
    icon: Sponsor,
    name: "Invitation Declined",
    no: statistics?.invitationsDeclined?.toString() || "0",
    secondIcon: ArrowDown,
    percent: statistics?.changes?.declineChange || "0%",
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
  const { getEventDashboard, getEventRSVPs, updateRSVPStatus } = useWedding();
  const [activeTab, setActiveTab] = useState<
    "attendees" | "vendors" | "refunds"
  >("attendees");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Updated to match API limit
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

  // New state for API data
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // RSVP data state
  const [rsvpData, setRsvpData] = useState<any>(null);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [rsvpError, setRsvpError] = useState<string | null>(null);

  // Function to fetch RSVP data
  const fetchRSVPData = async (
    eventId: string,
    status?: string,
    page: number = 1
  ) => {
    try {
      setRsvpLoading(true);
      setRsvpError(null);

      console.log(
        "Fetching RSVP data for event ID:",
        eventId,
        "status:",
        status,
        "page:",
        page
      );
      const data = await getEventRSVPs(eventId, status, page, itemsPerPage);
      console.log("RSVP data received:", data);

      setRsvpData(data);
    } catch (err: any) {
      console.error("Error fetching RSVP data:", err);
      setRsvpError(err.message || "Failed to load RSVP data");
    } finally {
      setRsvpLoading(false);
    }
  };

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get event ID from localStorage or use test ID
        const eventId =
          localStorage.getItem("_id") || "68b6c62d259827d44d2907e3";

        if (!eventId) {
          throw new Error("No event ID found. Please create an event first.");
        }

        console.log("Fetching dashboard data for event ID:", eventId);
        const data = await getEventDashboard(eventId);
        console.log("Dashboard data received:", data);

        setDashboardData(data);

        // Fetch initial RSVP data (all RSVPs)
        await fetchRSVPData(eventId, undefined, 1);
      } catch (err: any) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [getEventDashboard, getEventRSVPs]);

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

  // Get data from API response
  const rsvpList = rsvpData?.data || [];
  const pagination = rsvpData?.pagination || {
    totalPages: 0,
    currentPage: 1,
    totalCount: 0,
  };
  const totalPages = pagination.totalPages;
  const totalItems = pagination.totalCount;
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Fetch new page data
      const eventId = localStorage.getItem("_id") || "68b6c62d259827d44d2907e3";
      const status =
        activeTab === "attendees"
          ? undefined
          : activeTab === "vendors"
          ? "accepted"
          : "declined";
      fetchRSVPData(eventId, status, page);
    }
  };

  const handleTabChange = (tab: "attendees" | "vendors" | "refunds") => {
    setActiveTab(tab);
    setCurrentPage(1);

    const eventId = localStorage.getItem("_id") || "68b6c62d259827d44d2907e3";
    const status =
      tab === "attendees"
        ? undefined
        : tab === "vendors"
        ? "accepted"
        : "declined";

    fetchRSVPData(eventId, status, 1);
  };

  const handleRSVPStatusUpdate = async (
    rsvpId: string,
    status: "accepted" | "declined"
  ) => {
    try {
      await updateRSVPStatus(rsvpId, status);

      // Refresh the current tab data
      const eventId = localStorage.getItem("_id") || "68b6c62d259827d44d2907e3";
      const currentStatus =
        activeTab === "attendees"
          ? undefined
          : activeTab === "vendors"
          ? "accepted"
          : "declined";

      await fetchRSVPData(eventId, currentStatus, currentPage);

      // Also refresh dashboard data to update statistics
      const dashboardData = await getEventDashboard(eventId);
      setDashboardData(dashboardData);
    } catch (err: any) {
      console.error("Error updating RSVP status:", err);
      setRsvpError(err.message || "Failed to update RSVP status");
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

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-md p-6 max-w-md">
            <h3 className="text-lg font-medium text-red-800 mb-2">
              Error Loading Dashboard
            </h3>
            <p className="text-red-700 mb-4">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white"
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Get the info cards with real data
  const infoCards = getInfoCards(dashboardData?.statistics);

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
                {dashboardData?.event?.brideName || "Event Dashboard"}
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
              Event Date:{" "}
              <span className="text-black">
                {dashboardData?.event?.eventDate
                  ? new Date(dashboardData.event.eventDate).toLocaleDateString()
                  : "Date not available"}
              </span>
            </p>
            <p className="text-gray mt-5 sm:mt-7 text-base sm:text-xl">
              {dashboardData?.event?.description ||
                "Event description not available"}
            </p>
          </div>

          {/* Info Cards */}
          <div className="flex flex-wrap gap-5 mt-10">
            {infoCards.map((ana: any, index: number) => (
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
            <EngagementGraph
              data={dashboardData?.engagementData || sampleData}
            />
          </div>

          {/* Tabs & Filter */}
          <section className="bg-tab-secondary p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-10">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleTabChange("attendees")}
                className={`px-4 py-2 text-sm sm:text-xl rounded-t-lg cursor-pointer ${
                  activeTab === "attendees"
                    ? "bg-[#4D67FE33] text-accent"
                    : "text-gray"
                }`}
              >
                RSVP List
                {rsvpData?.summary?.statusBreakdown?.pending && (
                  <span className="bg-blue-500 ml-1 text-white font-bold rounded-full px-2 py-0 text-xs">
                    {rsvpData.summary.statusBreakdown.pending}
                  </span>
                )}
              </button>
              <button
                onClick={() => handleTabChange("vendors")}
                className={`px-4 py-2 text-sm sm:text-xl rounded-t-lg cursor-pointer ${
                  activeTab === "vendors"
                    ? "bg-[#4D67FE33] text-accent"
                    : "text-gray"
                }`}
              >
                Accepted Invitation
                {rsvpData?.summary?.statusBreakdown?.confirmed && (
                  <span className="bg-green-500 ml-1 text-white font-bold rounded-full px-2 py-0 text-xs">
                    {rsvpData.summary.statusBreakdown.confirmed}
                  </span>
                )}
              </button>
              <button
                onClick={() => handleTabChange("refunds")}
                className={`px-4 py-2 text-sm sm:text-xl rounded-t-lg cursor-pointer ${
                  activeTab === "refunds"
                    ? "bg-[#4D67FE33] text-accent"
                    : "text-gray"
                }`}
              >
                Declined Invitation
                {rsvpData?.summary?.statusBreakdown?.declined && (
                  <span className="bg-red-500 ml-1 text-white font-bold rounded-full px-2 py-0 text-xs">
                    {rsvpData.summary.statusBreakdown.declined}
                  </span>
                )}
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
                <tr>
                  <th className="font-normal">Full Name</th>
                  <th className="font-normal">Email</th>

                  {activeTab === "attendees" ? (
                    <th className="font-normal">Date & Time</th>
                  ) : (
                    <th className="font-normal">Relation</th>
                  )}
                  {activeTab === "attendees" && (
                    <th className="font-normal">Action</th>
                  )}
                  {(activeTab === "vendors" || activeTab === "refunds") && (
                    <th className="font-normal">Status</th>
                  )}
                </tr>
              </thead>

              <tbody className="cursor-pointer">
                {rsvpLoading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent mr-2"></div>
                        Loading RSVPs...
                      </div>
                    </td>
                  </tr>
                ) : rsvpError ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-red-500">
                      Error loading RSVPs: {rsvpError}
                    </td>
                  </tr>
                ) : rsvpList.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-500">
                      No RSVPs found
                    </td>
                  </tr>
                ) : (
                  rsvpList.map((rsvp: any, idx: number) => (
                    <tr
                      key={rsvp.id}
                      className="border-y border-gray rounded-lg relative"
                    >
                      <td className="py-3">
                        <div>
                          <div className="font-medium">{rsvp.fullName}</div>
                          <div className="text-sm text-gray-500">
                            {rsvp.guestTitle}
                          </div>
                        </div>
                      </td>
                      <td>{rsvp.emailAddress}</td>

                      {activeTab === "attendees" ? (
                        <td>{rsvp.requestedAt}</td>
                      ) : (
                        <td>{rsvp.rsvpStatus}</td>
                      )}

                      <td>
                        {activeTab === "attendees" &&
                          rsvp.rsvpStatus === "pending" && (
                            <div className="flex gap-2">
                              <Button
                                className="bg-[#009311] text-white text-sm"
                                onClick={() =>
                                  handleRSVPStatusUpdate(rsvp.id, "approved")
                                }
                              >
                                Accept
                              </Button>
                              <Button
                                className="text-red-500 font-semibold bg-transparent"
                                onClick={() =>
                                  handleRSVPStatusUpdate(rsvp.id, "declined")
                                }
                              >
                                Decline
                              </Button>
                            </div>
                          )}
                        {activeTab === "attendees" &&
                          rsvp.rsvpStatus !== "pending" && (
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                rsvp.rsvpStatus === "accepted"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {rsvp.rsvpStatus}
                            </span>
                          )}
                        {(activeTab === "vendors" ||
                          activeTab === "refunds") && (
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              rsvp.rsvpStatus === "accepted"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {rsvp.rsvpStatus}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPreviousPage}
                className="px-3 py-1 text-gray-500 disabled:opacity-50"
              >
                ← Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded ${
                      page === pagination.currentPage
                        ? "bg-blue-500 text-white"
                        : "text-gray-600"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className="px-3 py-1 text-gray-500 disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          )}

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
