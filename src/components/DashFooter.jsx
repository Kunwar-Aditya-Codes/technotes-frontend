import { FaHome } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashFooter = () => {
  const { username, status } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleHomeClick = () => navigate("/dash");

  let homeButton = null;

  if (pathname !== "/dash") {
    homeButton = (
      <button title="Home" onClick={handleHomeClick}>
        <FaHome />
      </button>
    );
  }
  return (
    <div className="border-t-2 border-zinc-800 p-4 flex flex-col md:flex-row md:justify-around space-y-2 md:items-center md:space-y-0">
      {homeButton}
      <p className="font-light text-lg">
        Current User:
        <span className="ml-2 text-fuchsia-500 font-normal  tracking-wider  ">
          {username}
        </span>
      </p>
      <p className="font-light text-lg">
        Status:
        <span className="ml-2 text-fuchsia-500 font-normal  tracking-wider  ">
          {status}
        </span>
      </p>
    </div>
  );
};
export default DashFooter;
