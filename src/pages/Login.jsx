import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../app/slices/authApiSlice";
import { setCredentials } from "../app/slices/authSlice";
import usePersist from "../hooks/usePersist";

const Login = () => {
  const userRef = useRef();
  const errorRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePersist = () => setPersist((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { accessToken } = await login({
        username,
        password,
      }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (error) {
      if (!error.status) {
        setErrMsg("Server is not available!");
      } else if (error.status === 400) {
        setErrMsg("Missing username or password!");
      } else if (error.status === 401) {
        setErrMsg("Unathorized!");
      } else {
        setErrMsg(error?.data?.message);
      }

      errorRef.current.focus();
    }
  };

  const errClass = errMsg
    ? "bg-zinc-900 text-center py-3 px-6 text-fuchsia-500 font-medium tracking-wider"
    : "";

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-black min-h-screen text-white flex flex-col  items-center justify-evenly text-lg">
      <p ref={errorRef} className={errClass}>
        {errMsg}
      </p>
      <h1>
        <span className="font-extralight text-zinc-400 text-2xl md:text-3xl lg:text-4xl tracking-wider underline underline-offset-8">
          Employee Login
        </span>
      </h1>
      <form
        className="grid space-y-4  p-6 rounded-md shadow-2xl border-b-4 border-t-4 border-fuchsia-400"
        onSubmit={handleSubmit}
      >
        <div className="grid space-y-2">
          <label className="font-light " htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={onUsernameChange}
            name="username"
            autoComplete="off"
            required
            autoFocus
            className=" bg-zinc-800 rounded-md px-2 py-1 text-base border-b border-fuchsia-500 outline-none"
          />
        </div>
        <div className="grid space-y-2">
          <label className="font-light" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            value={password}
            onChange={onPasswordChange}
            required
            className=" bg-zinc-800 rounded-md px-2 py-1 text-base border-b border-fuchsia-500 outline-none "
          />
        </div>
        <button
          disabled={!username || !password}
          type="submit"
          className="bg-fuchsia-500 hover:bg-fuchsia-600 transition ease-in-out py-1 rounded-md text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-zinc-500"
        >
          Login
        </button>
        <label htmlFor="persist" className="font-light tracking-wider ">
          <input
            type="checkbox"
            id="persist"
            checked={persist}
            onChange={handlePersist}
            className="ml-1 mr-2 "
          />
          Trust this device
        </label>
      </form>

      <Link to="/">
        <footer className="bg-zinc-800 hover:bg-zinc-900 border border-zinc-700 px-4 py-2 font-light rounded-md transition ease-linear">
          Back to Home
        </footer>
      </Link>
    </div>
  );
};
export default Login;
