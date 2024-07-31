'use client'

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { checkAuth } from '@/redux/slices/authSlice';
import { RootState } from '@/redux/store';
import KanbanBoard from './components/KanbanBoard';

const Home = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (token && email) {
      dispatch(checkAuth());
    } else {
      router.push('/login');
    }
    setCheckingAuth(false);
  }, [dispatch, router]);

  if (checkingAuth) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  return (
    <div>
      {isLoggedIn ? <KanbanBoard /> : null}
    </div>
  );
};

export default Home;
