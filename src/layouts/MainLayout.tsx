import { Outlet } from "react-router-dom";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col text-white">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
