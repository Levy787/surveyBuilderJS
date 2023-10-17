import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Nav";

export default function Layout() {
  return (
    <>
      <NavBar />
      <div className="fixed pt-20 bottom-0 bg-purple-100 h-full w-full">
        <Outlet />
      </div>
    </>
  );
}
