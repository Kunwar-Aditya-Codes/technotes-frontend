import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../../app/slices/userApiSlice';
import EditUserForm from './EditUserForm';
import PulseLoader from 'react-spinners/PulseLoader';

const EditUser = () => {
  const { id } = useParams();

  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  if (!user) return <PulseLoader />;

  const content = <EditUserForm user={user} />;

  return content;
};

export default EditUser;
