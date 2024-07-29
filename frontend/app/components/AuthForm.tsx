'use client';

import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { login, signup } from '../../redux/slices/authSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

interface AuthFormProps {
  mode: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const dispatch = useAppDispatch();
  const router=useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      dispatch(login(email, password));
      router.push('/')
    } else {
      dispatch(signup(email, password));
      router.push('/login')
    }
  };

  return (

<div className='h-screen border-2 flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 to-purple-300 '>
  <div className='flex flex-col justify-center items-center gap-6 border rounded-lg border-gray-400 w-fit p-6 bg-white'>
  <h1 className='text-2xl font-bold'>Welcome to Workflow!</h1>
<form className="w-96 mx-auto " onSubmit={handleSubmit} >
  <div className="mb-5">
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 " placeholder="Your Email" required />
  </div>
  <div className="mb-5">
    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 " placeholder='Password' required />
  </div>
  <button type="submit" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center ">{mode === 'login' ? 'Login' : 'Signup'}</button>
  <div className="flex  mt-5 justify-center">
    <p className='text-xs text-center'>{mode === 'login'? 'Don&apos;t have an account? Create' : 'Already have an account? '} <Link href={mode === 'login' ? '/signup' : '/login'} className='text-purple-500'>{mode === 'login' ? 'new account' : 'Login'}</Link></p>
  </div>
</form>
  </div>
  </div>


  );
};

export default AuthForm;
