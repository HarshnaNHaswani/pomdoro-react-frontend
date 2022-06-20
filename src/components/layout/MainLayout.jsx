import { Outlet } from "react-router-dom";
import { Footer } from "../Footer";
import { Header } from "../Header/Header";
import { NavigateSite } from "../NavigateSite";


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
