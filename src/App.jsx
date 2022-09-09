import { Routes, Route } from 'react-router-dom';
import DashLayout from './components/DashLayout';
import Layout from './components/Layout';
import Welcome from './pages/auth/Welcome';
import Login from './pages/Login';
import Public from './pages/Public';
import NotesList from './pages/notes/NotesList';
import UsersList from './pages/users/UsersList';
import EditUser from './pages/users/EditUser';
import EditNote from './pages/notes/EditNote';
import NewNote from './pages/notes/NewNote';
import NewUserForm from './pages/users/NewUserForm';
import Prefetch from './pages/auth/Prefetch';
import PersistLogin from './components/PersistLogin';
import RequireAuth from './components/RequireAuth';
import { Roles } from './config/Roles';
import useTitle from './hooks/useTitle';

function App() {
  useTitle('Repair Shop');
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public */}
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />

        {/* Protected */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(Roles)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path='dash' element={<DashLayout />}>
                <Route index element={<Welcome />} />
                <Route
                  element={
                    <RequireAuth allowedRoles={[Roles.Manager, Roles.Admin]} />
                  }
                >
                  <Route path='users'>
                    <Route index element={<UsersList />} />
                    <Route path=':id' element={<EditUser />} />
                    <Route path='new' element={<NewUserForm />} />
                  </Route>
                </Route>
                <Route path='notes'>
                  <Route index element={<NotesList />} />
                  <Route path=':id' element={<EditNote />} />
                  <Route path='new' element={<NewNote />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
