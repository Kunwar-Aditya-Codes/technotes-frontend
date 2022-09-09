import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { useGetUsersQuery } from '../../app/slices/userApiSlice';
import { memo } from 'react';

const User = ({ userId }) => {
  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);

    const userRolesString = user.roles.toString().replaceAll(',', ', ');

    return (
      <tr className='text-center border-b font-light tracking-wider border-zinc-700 text-zinc-200'>
        <td className='py-4 '>{user.username}</td>
        <td className='py-4 '>{userRolesString}</td>
        <td>
          <button onClick={handleEdit} className='py-4'>
            <FiEdit />
          </button>
        </td>
      </tr>
    );
  } else {
    return null;
  }
};

const memoizedUser = memo(User);

export default memoizedUser;
