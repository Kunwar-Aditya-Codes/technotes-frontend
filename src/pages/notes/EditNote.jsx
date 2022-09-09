import { useParams } from 'react-router-dom';
import { useGetNotesQuery } from '../../app/slices/notesApiSlice';
import { useGetUsersQuery } from '../../app/slices/userApiSlice';
import useAuth from '../../hooks/useAuth';
import EditNoteForm from './EditNoteForm';
import PulseLoader from 'react-spinners/PulseLoader';

const EditNote = () => {
  const { id } = useParams();

  const { username, isManager, isAdmin } = useAuth();

  const { note } = useGetNotesQuery('notesList', {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });

  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!note || !users?.length) return <PulseLoader />;

  if (!isManager && !isAdmin) {
    if (note.username !== username) {
      return <p>No Access!</p>;
    }
  }

  const content = <EditNoteForm note={note} users={users} />;

  return content;
};
export default EditNote;
