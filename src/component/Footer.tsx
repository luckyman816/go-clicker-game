import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname); // Initialize state with current pathname
  useEffect(() => {
    // Update the state whenever the location changes
    setPath(location.pathname);
  }, [location]);
  return (
    <div className="Footer max-sm:w-full max-sm:px-10 max-sm:bottom-3 absolute left-1/2 transform -translate-x-1/2 bottom-10 grid grid-cols-3 gap-10 justify-center items-center">
      <Link to="/ranking" className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${path === "/ranking" ? "scale-[110%] opacity-100" : "opacity-50 text-white"}`}>
        <img src="/image/ranking.png" alt="ranking" className="w-12 h-12" />
        <p className="text-sm max-sm:text-sm text-white">RANKING</p>
      </Link>
      <Link to="" className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${path === "/" ? "scale-[110%] opacity-100" : "opacity-50 text-white"}`}>
        <img src="/image/play.png" alt="play" className="w-12 h-12" />
        <p className="text-sm max-sm:text-sm text-white">PLAY</p>
      </Link>
      <Link to="/quest" className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${path === "/quest" ? "scale-[110%] opacity-100" : "opacity-50 text-white"}`}>
        <img src="/image/quest.png" alt="quest" className="w-12 h-12" />
        <p className="text-sm max-sm:text-sm text-white">QUESTS</p>
      </Link>
    </div>
  );
}
