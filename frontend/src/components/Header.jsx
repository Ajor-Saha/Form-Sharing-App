import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='bg-slate-200 py-5'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold'>FromSharing App</h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li>Home</li>
          </Link>
          <Link to='/createForm'>
            <li>CreateForm</li>
          </Link>
          <Link to='/getallForms'>
            <li>My Forms</li>
          </Link>
          <Link to='/profile'>
          {currentUser ? (
              <li>My Profile</li>
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}

{/* <Link to='/profile'>
          {currentUser ? (
              <li>My Profile</li>
            ) : (
              <li>Sign In</li>
            )}
          </Link> */}