import React from "react";

export default function SideBar({children}) {
  return (
    <aside
      id="logo-sidebar"
      className="top-0 left-0 z-40 w-96 h-full"
      aria-label="Sidebar"
    >
      <div className="h-full w-full px-3 pt-8 pb-4 bg-violet-50 overflow-y-auto">
        <ul className="flex flex-col gap-2 font-medium">
            {children}
        </ul>
      </div>
    </aside>
  );
}
