import { useNavigate } from "react-router-dom";
import { Button } from "@/components";

export const HomeView = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <section className="w-full max-w-3xl space-y-8 text-center">
        <h1 className="font-bold text-5xl tracking-tight">TMDB Browser</h1>
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          <img
            alt="LeBron James"
            className="h-64 w-64 rounded-2xl object-cover shadow-lg"
            src="https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png"
          />
          <img
            alt="Transformers"
            className="h-64 w-64 rounded-2xl object-cover shadow-lg"
            src="https://pbs.twimg.com/media/FYyBeNkVQAAhvuw.jpg"
          />
        </div>
        <p className="text-gray-400 text-lg"> Explore movies and discover people using a fast, modern interface.</p>
        <Button onClick={() => navigate("/movies/category/popular")}>Enter </Button>
        <footer className="pt-10 text-gray-500 text-sm">Built with React, Vite, Tailwind, React Router, and the TMDB API</footer>
      </section>
    </main>
  );
};
