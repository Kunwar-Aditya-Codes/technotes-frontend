import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../app/slices/userApiSlice";
import { Roles } from "../../config/Roles";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, error, isSuccess, isError }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess || isDeleteSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDeleteSuccess, navigate]);

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

  const onActiveChange = () => setActive((prev) => !prev);

  const onSaveUserClicked = async (e) => {
    e.preventDefault();

    console.log(username);

    if (password) {
      await updateUser({
        id: user.id,
        username,
        password,
        roles,
        active,
      });
    } else {
      await updateUser({
        id: user.id,
        username,
        roles,
        active,
      });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  let canSave;

  if (password) {
    canSave =
      [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

  const options = Object.values(Roles).map((role) => (
    <option
      key={role}
      value={role}
      className="px-4 py-1 rounded-md text-white decoration-none border-2 border-fuchsia-500 mb-3"
    >
      {role}
    </option>
  ));

  const errClass =
    isError || isDeleteError
      ? "bg-zinc-900 text-center py-3 text-fuchsia-500 font-medium tracking-wider"
      : "";
  const validUsernameClass = !validUsername ? " bg-zinc-700" : "";
  const validPasswordClass = password && !validPassword ? "bg-zinc-700" : "";
  const valideRolesClass = !Boolean(roles.length) ? "bg-zinc-700" : "";
  const errContent = (error?.data?.message || deleteError?.data?.message) ?? "";

  return (
    <>
      <p className={errClass}>{errContent}</p>
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
          <div className="flex items-center space-x-4">
            <label htmlFor="active">ACTIVE: </label>
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={active}
              onChange={onActiveChange}
              className="text-black md:text-lg px-2 rounded-md"
            />
          </div>

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
      <div className="w-full mx-auto flex  justify-center">
        <button
          type="submit"
          title="Delete"
          onClick={onDeleteUserClicked}
          className="bg-zinc-900 border border-red-500 px-6 py-2 rounded-md mb-4  "
        >
          Delete
        </button>
      </div>
    </>
  );
};
export default EditUserForm;
