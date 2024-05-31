
"use client"

import { getAllHotel } from '@/modules/hotel/service';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
import { useRouter } from 'next/navigation'

import UserSession from '@/utils/user';
interface FormProps {
  onSubmit: (data: FormData) => void;
}

interface FormData {
  email: string;
  password: string;
}

function FrmSigin() {
  const [formData, setFormData] = React.useState<FormData>({ email: '', password: '' });
  const router = useRouter()
  
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Lưu thông tin người dùng vào Singleton
    const userSession = UserSession.getInstance();
    userSession.setUser(1);
    router.push('/hotel');
    console.log("aaa")
    
    
    
    
  }

  return (
    <div className='h-screen bg-blue-400 flex items-center justify-center'>
        <form onSubmit={handleSubmit} className='w-96 bg-white rounded-md p-6 flex flex-col' method='POST'>
            <div className='flex text-2xl mb-2 justify-center text-blue-500'>Hotelier</div>
            <div className='flex text-xl mb-2'>Welcom back!</div>
            <div className='flex text-sm mb-2'>Log in to manage your accommodation from checking reservations to managing room availability!</div>
            <div className='flex flex-col mb-2'>
                <span>Your email address:</span>
                <input className='rounded-md border-black border-2 p-2' type="text" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
            
            <div className='flex flex-col mb-2'>
                <span>Password</span>  
                <input className='rounded-md border-black border-2 p-2' type="password" name="password" value={formData.password} onChange={handleInputChange} />
            </div>
            <Link href="/forgetPass" className='underline mb-2'>Forgot your password?</Link>
            <button className="bg-orange-300 p-2 border-2 rounded-md border-orange-300 mb-2" type="submit">Log in</button>
            </form>
    </div>
    
  );
}

export default FrmSigin; 