import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} from "../../app/slices/notesApiSlice";
import useAuth from "../../hooks/useAuth";

const EditNoteForm = ({ users, note }) => {
  const { isManager, isAdmin } = useAuth();

  const [updateNote, { isLoading, error, isSuccess, isError }] =
    useUpdateNoteMutation();

  const [
    deleteNote,
    { isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError },
  ] = useDeleteNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [userId, setUserId] = useState(note.user);
  const [completed, setCompleted] = useState(note.completed);

  useEffect(() => {
    if (isSuccess || isDeleteSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      setCompleted(false);
      navigate("/dash/notes");
    }
  }, [isSuccess, isDeleteSuccess, navigate]);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onTextChange = (e) => {
    setText(e.target.value);
  };

  const onUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const onCompletedChange = () => {
    setCompleted((prev) => !prev);
  };

  const canSave = title && text && userId && !isLoading;

  const onUpdateNoteClicked = async (e) => {
    e.preventDefault();

    if (canSave) {
      await updateNote({
        id: note._id,
        title,
        text,
        user: userId,
        completed,
      });
    }
  };

  const onDeleteNoteClicked = async () => {
    await deleteNote({
      id: note._id,
    });
  };

  const options = users.map((user) => {
    return (
      <option key={user?._id} value={user?._id}>
        {user?.username}
      </option>
    );
  });

  const errClass =
    isError || isDeleteError
      ? "bg-zinc-900 text-center py-3 text-fuchsia-500 font-medium tracking-wider"
      : "";

  let deleteButton = null;
  if (isManager || isAdmin) {
    deleteButton = (
      <button
        type="submit"
        title="Delete"
        onClick={onDeleteNoteClicked}
        className="bg-zinc-900 border border-red-500 px-6 py-2 rounded-md mb-4  "
      >
        Delete
      </button>
    );
  }

  return (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <form
        onSubmit={onUpdateNoteClicked}
        className="flex flex-col items-center mb-8"
      >
        <h2 className="my-6 text-2xl underline underline-offset-8 decoration-fuchsia-500">
          Update Note
        </h2>
        <div className="flex flex-col items-center space-y-4 p-4 ">
          <label
            htmlFor="title"
            className="text-lg md:text-xl font-light tracking-wide"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            autoComplete="off"
            value={title}
            onChange={onTitleChange}
            className={`text-black md:text-lg px-2 rounded-md`}
          />

          <label
            htmlFor="text"
            className="text-lg md:text-xl font-light tracking-wide"
          >
            Text
          </label>
          <textarea
            type="text"
            id="text"
            name="text"
            autoComplete="off"
            cols={25}
            rows={5}
            value={text}
            onChange={onTextChange}
            className={`text-black md:text-lg px-2 rounded-md`}
          />
          <div className="flex items-center space-x-4">
            <label
              htmlFor="completed"
              className="text-lg md:text-xl font-light tracking-wide"
            >
              Completed:{" "}
            </label>
            <input
              type="checkbox"
              id="completed"
              name="completed"
              checked={completed}
              onChange={onCompletedChange}
              className="text-black md:text-lg px-2 rounded-md"
            />
          </div>
          <label
            htmlFor="username"
            className="text-lg md:text-xl font-light tracking-wide"
          >
            Assigned To
          </label>
          <select
            id="username"
            name="username"
            value={userId}
            onChange={onUserIdChange}
            className={`text-black md:text-lg overflow-hidden rounded-md px-4 py-2 bg-white`}
          >
            {options}
          </select>
        </div>
        <button
          type="submit"
          title="Save"
          disabled={!canSave}
          className="disabled:bg-zinc-600 disabled:border-none disabled:cursor-not-allowed bg-zinc-900 border border-fuchsia-500 px-6 py-2 rounded-md mt-4"
        >
          Save
        </button>
      </form>
      <div className="w-full mx-auto flex  justify-center">{deleteButton}</div>
    </>
  );
};
export default EditNoteForm;
