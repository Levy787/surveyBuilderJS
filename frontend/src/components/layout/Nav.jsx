import React from "react";

export default function NavBar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-violet-900 text-white h-20">
      <div className="px-3 py-5 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <span className="self-center text-xl sm:text-2xl font-semibold whitespace-nowrap">
            ESG Reporter
          </span>
        </div>
      </div>
    </nav>
  );
}
