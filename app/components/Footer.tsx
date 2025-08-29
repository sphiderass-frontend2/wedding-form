import { Facebook, Linkedln, InstagramOutline, LogoText } from "@/public/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#010136] text-white transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="p-4 sm:p-6 md:py-16 md:px-8">
        <div className="flex md:flex-row flex-col items-start gap-6 md:gap-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <Image src={LogoText} alt="Richlist Logo" />

            <p className="text-gray text-base leading-relaxed">
              Stay connected with RichList for the latest events, updates, and
              exclusive offers.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <Image src={Facebook} alt="Facebook" width={20} height={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <Image src={Linkedln} alt="LinkedIn" width={20} height={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <Image
                  src={InstagramOutline}
                  alt="Instagram"
                  width={20}
                  height={20}
                />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Company</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#"
                  className="text-gray hover:text-white transition-colors duration-300"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray hover:text-white transition-colors duration-300"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray hover:text-white transition-colors duration-300"
                >
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Product</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#"
                  className="text-gray hover:text-white transition-colors duration-300"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray hover:text-white transition-colors duration-300"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray hover:text-white transition-colors duration-300"
                >
                  News
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray hover:text-white transition-colors duration-300"
                >
                  Help desk
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray hover:text-white transition-colors duration-300"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Services</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#"
                  className="text-gray hover:text-white transition-colors duration-300"
                >
                  Featured Event
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray hover:text-white transition-colors duration-300"
                >
                  Movie Premieres
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray hover:text-white transition-colors duration-300"
                >
                  Trending restaurants
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray hover:text-white transition-colors duration-300"
                >
                  Club bookings
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Legal</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#"
                  className="text-gray hover:text-white transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray hover:text-white transition-colors duration-300"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray hover:text-white transition-colors duration-300"
                >
                  Return Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4 bg-[#161C2D] p-6 rounded-2xl flex flex-col items-start">
            <Image src={LogoText} alt="Richlist Logo" width={100} />
            <h3 className="font-semibold text-lg">
              Subscribe to our newsletter
            </h3>
            <div className="flex gap-3 flex-1 p-2 rounded-full bg-gray-800 border-1 border-gray ">
              <input
                type="email"
                placeholder="email address"
                className="focus:outline-none flex-1 bg-transparent text-sm placeholder-gray-400"
              />
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-medium transition-colors duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white">
        <div className="p-4 sm:p-6 md:px-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-gray text-sm">
            ©2024 VisionSpace. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a
              href="#"
              className="text-gray hover:text-white transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray hover:text-white transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray hover:text-white transition-colors duration-300"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
