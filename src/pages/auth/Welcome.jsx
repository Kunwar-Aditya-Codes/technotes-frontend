import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Welcome = () => {
  const { username, isManager, isAdmin } = useAuth();
  const date = new Date();

  const today = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
  return (
    <div className="max-w-7xl mx-auto p-4 my-2">
      <p className="border-b-2 border-fuchsia-500 py-3 md:text-lg lg:text-xl text-zinc-400">
        {today}
      </p>
      <div>
        <h1 className="mt-4 md:mt-5 lg:mt-6 xl:mt-8 mb-8 md:mb-9 lg:mb-10 xl:mb-12 py-2 text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-zinc-400">
          Welcome Back {username}
        </h1>
        <div className="flex flex-col items-center space-y-6 lg:space-y-8  md:text-lg">
          <h1 className="font-light text-xl underline decoration-wavy underline-offset-4">
            Notes
          </h1>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:items-center md:space-x-3 border border-zinc-800 shadow-2xl p-3 rounded-md">
            <Link to="/dash/notes">
              <p className="bg-zinc-900 px-4 py-2 rounded-md shadow-2xl border-b-2 border-fuchsia-500 hover:bg-zinc-800 transition ease-in-out ">
                View technotes
              </p>
            </Link>
            <Link to="/dash/notes/new">
              <p className="bg-zinc-900 px-4 py-2 rounded-md shadow-2xl border-b-2 border-fuchsia-500 hover:bg-zinc-800 transition ease-in-out ">
                Add new technotes
              </p>
            </Link>
          </div>
          {(isManager || isAdmin) && (
            <>
              <h1 className="font-light text-xl underline decoration-wavy underline-offset-4">
                Users
              </h1>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:items-center md:space-x-3 border border-zinc-800 shadow-2xl p-3 rounded-md">
                <Link to="/dash/users">
                  <p className="bg-zinc-900 px-4 py-2 rounded-md shadow-2xl border-b-2 border-fuchsia-500 hover:bg-zinc-800 transition ease-in-out ">
                    View user settings
                  </p>
                </Link>

                <Link to="/dash/users/new">
                  <p className="bg-zinc-900 px-4 py-2 rounded-md shadow-2xl border-b-2 border-fuchsia-500 hover:bg-zinc-800 transition ease-in-out ">
                    Add new user
                  </p>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Welcome;
