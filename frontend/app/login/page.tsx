'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { login } from '@/redux/slices/authSlice';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password,
      });

      const data = res.data;
      console.log("data--", data)
      dispatch(login(data));
      router.push('/');
    } catch (error) {
      alert('Login failed');
    }
  };
  return (
    <div className='h-screen border-2 flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 to-purple-300 '>
    <div className='flex flex-col justify-center items-center gap-6 border rounded-lg border-gray-400 w-fit p-6 bg-white'>
    <h1 className='text-2xl font-bold'>Welcome to Workflow!</h1>
  <form className="w-96 mx-auto " onSubmit={handleLogin} >
    <div className="mb-5">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 " placeholder="Your Email" required />
    </div>
    <div className="mb-5">
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 " placeholder='Password' required />
    </div>
    <button type="submit" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center ">Login</button>
    <div className="flex  mt-5 justify-center">
      <p className='text-xs text-center'>Don&apos; have an account? <Link href='/login' className='text-purple-500'>Signup</Link></p>
    </div>
  </form>
    </div>
    </div>
  );
};

export default Login;
