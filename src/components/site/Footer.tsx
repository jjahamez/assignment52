import { FaGithub, FaLinkedin, FaWikipediaW } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="w-full border-gray-800 border-t bg-gray-900 text-gray-500">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 py-5 text-sm sm:flex-row">
        <p>Built with React, Vite, Tailwind, React Router, and the TMDB API</p>
        <div className="flex items-center gap-4">
          <a
            className="flex items-center gap-2 transition hover:text-white"
            href="https://github.com/jjahamezz"
            rel="noreferrer"
            target="_blank"
          >
            <FaGithub />
            <span>GitHub</span>
          </a>
          <a
            className="flex items-center gap-2 transition hover:text-white"
            href="https://www.linkedin.com/in/stephen-chen-377b543a9/"
            rel="noreferrer"
            target="_blank"
          >
            <FaLinkedin />
            <span>LinkedIn</span>
          </a>
          <a
            className="flex items-center gap-2 transition hover:text-white"
            href="https://en.wikipedia.org/wiki/LeBron_James"
            rel="noreferrer"
            target="_blank"
          >
            <FaWikipediaW />
            <span>LeBron James</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
