"use client";

import { Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo + Socials */}
          <div className="flex flex-col items-start space-y-4">
            <img 
              src="wavyNode_dark_mode.svg" 
              alt="Wavy Node Logo" 
              className="h-10 w-auto"
            />
            <div className="flex space-x-4">
              <a 
                href="https://x.com/WavyNode" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/104947152" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">For developers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">For businesses</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Team</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Advisors</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Other</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Terms</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Divider + dRPC logo */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col items-center">
          <a
            href="https://drpc.org?ref=7d04bb"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
          >
            <img
              src="https://drpc.org/images/external/powered-by-drpc-dark.svg"
              alt="Powered by dRPC"
              className="w-[218px] h-[54px]"
            />
          </a>
          <p className="mt-4 text-xs text-gray-500 text-center">
            &copy; 2025 Wavy Node. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
