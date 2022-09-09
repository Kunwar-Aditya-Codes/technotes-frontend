import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewUserMutation } from "../../app/slices/userApiSlice";
import { Roles } from "../../config/Roles";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, error, isSuccess, isError }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onRoleChange = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();

    if (canSave) {
      await addNewUser({
        username,
        password,
        roles,
      });
    }
  };

  const options = Object.values(Roles).map((role) => (
    <option
      key={role}
      value={role}
      className="px-4 py-1 rounded-md text-white decoration-none border-2 border-fuchsia-500 mb-3"
    >
      {role}
    </option>
  ));

  const errClass = isError
    ? "bg-zinc-900 text-center py-3 text-fuchsia-500 font-medium tracking-wider"
    : "";
  const validUsernameClass = username && !validUsername ? " bg-zinc-700" : "";
  const validPasswordClass = password && !validPassword ? "bg-zinc-700" : "";
  const valideRolesClass = roles && !Boolean(roles.length) ? "bg-zinc-700" : "";

  return (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <form
        onSubmit={onSaveUserClicked}
        className="flex flex-col items-center mb-8"
      >
        <h2 className="my-6 text-2xl underline underline-offset-8 decoration-fuchsia-500">
          New User
        </h2>
        <div className="flex flex-col items-center space-y-4 p-4 ">
          <label
            htmlFor="username"
            className="text-lg md:text-xl font-light tracking-wide"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="off"
            value={username}
            onChange={onUsernameChange}
            className={`text-black ${validUsernameClass} md:text-lg px-2 rounded-md`}
          />

          <label
            htmlFor="password"
            className="text-lg md:text-xl font-light tracking-wide"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            value={password}
            onChange={onPasswordChange}
            className={`text-black ${validPasswordClass} md:text-lg px-2 rounded-md`}
          />

          <label
            htmlFor="roles"
            className="text-lg md:text-xl font-light tracking-wide"
          >
            Roles
          </label>
          <select
            id="roles"
            multiple={true}
            size={3}
            name="roles"
            value={roles}
            onChange={onRoleChange}
            className={`text-black ${valideRolesClass} md:text-lg overflow-hidden rounded-md p-4 w-[10rem] h-[10rem]   bg-zinc-700`}
          >
            {options}
          </select>
        </div>
        <button
          type="submit"
          title="Save"
          disabled={!canSave}
          className="disabled:bg-zinc-600 disabled:border-none disabled:cursor-not-allowed bg-zinc-900 border border-fuchsia-500 px-6 py-2 rounded-md"
        >
          Save
        </button>
      </form>
    </>
  );
};

export default NewUserForm;
