import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewNoteMutation } from "../../app/slices/notesApiSlice";

const NewNoteForm = ({ users }) => {
  const [addNewNote, { isLoading, error, isSuccess, isError }] =
    useAddNewNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(users[0]?._id);

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onTextChange = (e) => {
    setText(e.target.value);
  };

  const onUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const canSave = title && text && userId && !isLoading;

  const onSaveNoteClicked = async (e) => {
    e.preventDefault();

    if (canSave) {
      await addNewNote({
        title,
        text,
        user: userId,
      });
    }
  };

  const options = users.map((user) => {
    return (
      <option key={user?._id} value={user?._id}>
        {user?.username}
      </option>
    );
  });

  const errClass = isError
    ? "bg-zinc-900 text-center py-3 text-fuchsia-500 font-medium tracking-wider"
    : "";

  const validTitleClass = !title ? " bg-zinc-700" : "";
  const validTextClass = !text ? "bg-zinc-700" : "";

  return (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <form
        onSubmit={onSaveNoteClicked}
        className="flex flex-col items-center mb-8"
      >
        <h2 className="my-6 text-2xl underline underline-offset-8 decoration-fuchsia-500">
          New Note
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
            className={`text-black ${validTitleClass} md:text-lg px-2 rounded-md`}
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
            className={`text-black ${validTextClass} md:text-lg px-2 rounded-md`}
          />
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
            className={`text-black md:text-lg overflow-hidden rounded-md px-4    bg-white`}
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
export default NewNoteForm;
