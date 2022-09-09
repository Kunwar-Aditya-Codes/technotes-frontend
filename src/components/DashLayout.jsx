import { Outlet } from 'react-router-dom';
import DashFooter from './DashFooter';
import DashHeader from './DashHeader';

const DashLayout = () => {
  return (
    <div className='min-h-screen bg-black text-white flex flex-col justify-between'>
      <div>
        <DashHeader />
        <div>
          <Outlet />
        </div>
      </div>
      <DashFooter />
    </div>
  );
};
export default DashLayout;
