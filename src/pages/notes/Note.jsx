import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { useGetNotesQuery } from '../../app/slices/notesApiSlice';
import { memo } from 'react';

const Note = ({ noteId }) => {
  const { note } = useGetNotesQuery('notesList', {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
    }),
  });

  const navigate = useNavigate();

  if (note) {
    const created = new Date(note.createdAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
    });

    const updated = new Date(note.updatedAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
    });

    const handleEdit = () => navigate(`/dash/notes/${noteId}`);

    return (
      <tr className='text-center border-b font-light tracking-wider border-zinc-700 text-zinc-200'>
        <td className='py-4 '>
          {note.completed ? (
            <span className='text-green-500'>✅</span>
          ) : (
            <span className='text-red-500'>❌</span>
          )}
        </td>
        <td className='py-4'>{note.title}</td>
        <td className='py-4 hidden md:table-cell'>{note.username}</td>
        <td className='py-4 hidden md:table-cell'>{created}</td>
        <td className='py-4 hidden md:table-cell'>{updated}</td>

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

const memoizedNote = memo(Note);

export default memoizedNote;
