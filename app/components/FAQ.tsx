"use client";

import { PatternBottom, PatternTop } from "@/public/assets";
import Image from "next/image";
import { useState, useEffect } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Track theme changes
  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setIsDarkMode(theme === "dark");
    };

    // Check initial theme
    checkTheme();

    // Create observer to watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const faqs = [
    {
      question: "How do I buy tickets on Richlist?",
      answer:
        "Simply browse through listed events, select the one you're interested in, choose your ticket type, and complete your payment securely. Your e-ticket will be sent instantly via email and accessible in your dashboard.",
    },
    {
      question: "Can I sell tickets for my event on Richlist?",
      answer:
        "Yes! Richlist allows event organizers to list and sell tickets for their events. Simply create an account, submit your event details for approval, and start selling tickets to our community of event-goers.",
    },
    {
      question: "What types of events are available on Richlist?",
      answer:
        "Richlist features a diverse range of events including concerts, conferences, workshops, sports events, comedy shows, networking events, and much more. We curate events to ensure quality and variety for our users.",
    },
    {
      question: "Is my payment information safe?",
      answer:
        "Absolutely! We use industry-standard SSL encryption and secure payment gateways to protect your payment information. Your data is never stored on our servers and all transactions are processed through trusted payment providers.",
    },
    {
      question: "What if I don't receive my ticket?",
      answer:
        "If you don't receive your e-ticket within 5 minutes of purchase, please check your spam folder first. If you still haven't received it, contact our support team and we'll resend your ticket immediately.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="p-4 sm:p-6 md:py-40 md:px-8 bg-background h-auto relative w-full space-y-8 transition-colors duration-300">
      {/* Vector Graphics */}
      <Image
        className="absolute top-0 right-0 z-0"
        src={PatternTop}
        alt="pattern"
      />
      <Image
        className="absolute bottom-0 left-0 z-0"
        src={PatternBottom}
        alt="pattern"
      />

      {/* Header */}
      <div className="flex flex-col items-center justify-center z-10 relative text-center">
        <div className="space-y-8">
          <h5 className="font-bold text-xl text-text-primary">FAQ</h5>
          <h1 className="font-bold text-4xl md:text-7xl lg:text-7xl text-text-primary md:max-w-4xl">
            <span className="outline-text">FREQUENTLY</span> ASKED QUESTIONS
          </h1>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="w-full">
            <button
              onClick={() => toggleFAQ(index)}
              className={`w-full p-6 md:p-8 rounded-2xl transition-all duration-300 text-left ${
                openIndex === index
                  ? "bg-card-background text-white"
                  : isDarkMode
                  ? "text-text-primary hover:opacity-80"
                  : "bg-gradient-to-t from-0% from-[#ABABAB0F] to-[26%] to-white text-text-primary border border-input-border hover:opacity-80"
              }`}
              style={{
                background:
                  openIndex === index
                    ? "var(--color-card-background)"
                    : isDarkMode
                    ? "var(--color-background)"
                    : undefined, // Let Tailwind gradient handle light mode
                color:
                  openIndex === index ? "#ffffff" : "var(--color-text-primary)",
                borderColor:
                  openIndex === index
                    ? "transparent"
                    : !isDarkMode
                    ? "var(--color-input-border)"
                    : "transparent",
              }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <svg
                      className="w-6 h-6 text-white transform rotate-0 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 transform rotate-0 transition-transform duration-200 hover:scale-110"
                      style={{ color: "var(--color-text-primary)" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div>
                  <p
                    className="text-base md:text-lg font-light leading-relaxed"
                    style={{ color: "#ffffff" }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
