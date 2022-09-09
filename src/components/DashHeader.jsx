import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSignoutMutation } from "../app/slices/authApiSlice";
import useAuth from "../hooks/useAuth";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const { isManager, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [signout, { isLoading, error, isSuccess, isError }] =
    useSignoutMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const onSignoutClicked = () => signout();

  const onNewNoteClicked = () => navigate("/dash/notes/new");
  const onNewUserClicked = () => navigate("/dash/users/new");
  const onNotesClicked = () => navigate("/dash/notes");
  const onUsersClicked = () => navigate("/dash/users");

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "";
  }

  let newNoteButton = null;
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button
        className="text-base md:text-lg font-light  hover:text-zinc-400 transition ease-in-out"
        title="New Note"
        onClick={onNewNoteClicked}
      >
        Add New Note
      </button>
    );
  }

  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button
        className="text-base md:text-lg font-light  hover:text-zinc-400 transition ease-in-out"
        title="New User"
        onClick={onNewUserClicked}
      >
        Add New User
      </button>
    );
  }

  let usersButton = null;
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
      usersButton = (
        <button
          className="text-base md:text-lg font-light  hover:text-zinc-400 transition ease-in-out"
          title="Users"
          onClick={onUsersClicked}
        >
          View Users
        </button>
      );
    }
  }

  let notesButton = null;
  if (!NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
    notesButton = (
      <button
        className="text-base md:text-lg font-light  hover:text-zinc-400 transition ease-in-out"
        title="Notes"
        onClick={onNotesClicked}
      >
        View Notes
      </button>
    );
  }

  const logoutButton = (
    <button
      className="text-base md:text-lg font-light  hover:text-zinc-400 transition ease-in-out"
      title="Logout"
      onClick={onSignoutClicked}
    >
      Logout
    </button>
  );

  const errClass = isError ? "text-fuchsia-500 bg-zinc-900" : "";

  let buttonContent = null;
  if (isLoading) {
    buttonContent = <p>Loggin out</p>;
  } else {
    buttonContent = (
      <>
        {usersButton}
        {notesButton}
        {newUserButton}
        {newNoteButton}
        {logoutButton}
      </>
    );
  }

  return (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <div
        className={`${dashClass} flex flex-col md:flex-row md:items-center md:justify-around text-center py-4 text-4xl tracking-wider font-semibold border-b-2 border-zinc-800 shadow-lg shadow-zinc-900`}
      >
        <Link to="/dash">Technotes</Link>
        <nav className="space-x-4 md:space-x-8">{buttonContent}</nav>
      </div>
    </>
  );
};
export default DashHeader;
