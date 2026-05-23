import { FaGithub, FaLinkedin, FaWikipediaW } from 'react-icons/fa';
 
export const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-800 bg-gray-900 text-gray-500">
      <div className="max-w-5xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <p>Built with React, Vite, Tailwind, React Router, and the TMDB API</p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/jjahamezz" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition">
            <FaGithub />
            <span>GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/stephen-chen-377b543a9/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition">
            <FaLinkedin />
            <span>LinkedIn</span>
          </a>
          <a href="https://en.wikipedia.org/wiki/LeBron_James" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition">
            <FaWikipediaW />
            <span>LeBron James</span>
            </a>
        </div>
      </div>
    </footer>
  );
};
 