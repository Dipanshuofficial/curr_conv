import { Link } from "react-router-dom";
import { Links } from "../constants/links";

const header = () => {
  return (
    <header className="z-[999] relative flex items-center justify-center">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 h-[4.5rem] w-full rounded-none border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full"></div>
      <nav className=" mt-1 flex fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
        <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[1.5rem] font-bold text-black sm:w-[initial] sm:flex-nowrap sm:gap-5">
          {Links.map((link) => (
            <li
              className="h-3/4 flex items-center justify-center relative px-5"
              key={link.title}
            >
              <Link to={link.href}>{link.title}</Link>
            </li>
            //   <span className="bg-white/50 rounded-full absolute inset-0 -z-10 p-7"></span>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default header;
