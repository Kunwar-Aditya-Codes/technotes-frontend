import { useGetNotesQuery } from "../../app/slices/notesApiSlice";
import Note from "./Note";
import useAuth from "../../hooks/useAuth";

const NotesList = () => {
  const { isManager, isAdmin, username } = useAuth();
  const {
    data: notes,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetNotesQuery("NotesList", {
    pollingInterval: 20000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError)
    content = (
      <p className="flex items-center justify-center h-[32rem] text-2xl text-fuchsia-500">
        Error: {error?.data?.message || "Internal Server Error"}
      </p>
    );

  if (isSuccess) {
    const { ids, entities } = notes;

    let filterIds;
    if (isManager || isAdmin) {
      filterIds = [...ids];
    } else {
      filterIds = ids.filter(
        (noteId) => entities[noteId].username === username
      );
    }

    const tableContent =
      ids?.length &&
      filterIds.map((noteId) => <Note key={noteId} noteId={noteId} />);

    content = (
      <div className="my-12 max-w-7xl mx-auto px-3">
        <table className="w-full">
          <thead className="text-center text-zinc-400">
            <tr className="border-2 decoration-rounded-md border-fuchsia-500 text-lg md:text-xl">
              <td className="p-2">Status</td>
              <td className="p-2">Title</td>
              <td className="p-2 hidden md:table-cell">User</td>
              <td className="p-2 hidden md:table-cell">Created</td>
              <td className="p-2 hidden md:table-cell">Updated</td>
              <td className="p-2">Edit</td>
            </tr>
          </thead>
          <tbody className="text-center ">{tableContent}</tbody>
        </table>
      </div>
    );
  }

  return content;
};

export default NotesList;
