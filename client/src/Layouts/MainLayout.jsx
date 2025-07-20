import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <>
      <header>
        <nav>
            <Navbar>

            </Navbar>
        </nav>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  );
};

export default MainLayout;
