import { store } from '../../app/store';
import { usersApiSlice } from '../../app/slices/userApiSlice';
import { notesApiSlice } from '../../app/slices/notesApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true })
    );
    store.dispatch(
      usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true })
    );
  }, []);

  return <Outlet />;
};
export default Prefetch;
