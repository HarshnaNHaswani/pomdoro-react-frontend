import { Outlet } from "react-router-dom";
import { Footer } from "components/Footer.jsx";
import { Header } from "components/Header/Header.jsx";

import { NavigateSite } from "components/NavigateSite";


export const MainLayout = () => {

  return (
    <>
      <Header />
      <NavigateSite></NavigateSite>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
