import React from "react";
import { Outlet } from "react-router-dom"; 
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="shadow">
        <Navbar />
      </header>

      <main className="flex-1 min-h-[calc(100vh-380px)] px-4 py-6">
        <Outlet />
      </main>

      <footer className="bg-gray-50 border-t border-gray-200">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
