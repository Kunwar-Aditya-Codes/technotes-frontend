import { useGetUsersQuery } from "../../app/slices/userApiSlice";
import User from "./User";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetUsersQuery("UsersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError)er
    content = (
      <p className="flex items-center justify-center h-[32rem] text-2xl text-fuchsia-500">
        Error: {error?.data?.message}
      </p>
    );

  if (isSuccess) {
    const { ids } = users;

    const tableContent =
      ids?.length && ids.map((userId) => <User key={userId} userId={userId} />);

    content = (
      <div className="my-12 max-w-7xl mx-auto px-3">
        <table className="w-full">
          <thead className="text-center text-zinc-400">
            <tr className="border-2 decoration-rounded-md border-fuchsia-500 text-lg md:text-xl">
              <td className="p-2">User</td>
              <td className="p-2">Role</td>
              <td className="p-2">Edit</td>
            </tr>
          </thead>
          <tbody className="text-center">{tableContent}</tbody>
        </table>
      </div>
    );
  }

  return content;
};

export default UsersList;
