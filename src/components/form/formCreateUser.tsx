
"use client"

import { getAllHotel } from '@/modules/hotel/service';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation';
import UserSession from '@/utils/user';
import { getAccountToken } from '@/modules/auths/service';
import { addNewAccount, getAccountByEmail, getUserByAccountId } from '@/modules/account/services';
import { addNewUser } from '@/modules/user/service';


function FrmCreateUser({params}) {
  const [formData, setFormData] = useState({ "username": '', "idAccount": '', "idRole": '' });
  const router = useRouter()
  const pathname = usePathname();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    formData.idAccount = params.accountId;
    formData.idRole = '2';

    // alert(JSON.stringify(formData))
    // Lưu thông tin người dùng vào Singleton
    // const userSession = UserSession.getInstance();
    // userSession.setUser(1);
    // router.push('/hotel');
    console.log("aaa")
    addNewUser(formData).then((res) => {
        if (res.code == 200){
            alert("them username thành công! chuyển đến dashboard")
            const userSession = UserSession.getInstance();
            userSession.setUser(res.data.id);
            
            router.push("/hotel");
        }
        else {
            alert("them username that bai")
        }
    })
    
  }

  return (
    <div className='h-screen bg-blue-400 flex items-center justify-center'>
        <form onSubmit={handleSubmit} className='w-96 bg-white rounded-md p-6 flex flex-col' method='POST'>
            <div className='flex text-2xl mb-2 justify-center text-blue-500'>Hotelier</div>
            <div className='flex text-xl mb-2'>Vui lòng nhập username</div>
            <div className='flex flex-col mb-2'>
                <span>Username: </span>
                <input className='rounded-md border-black border-2 p-2' type="text" name="username" value={formData.username} onChange={handleInputChange} required/>
            </div>
            

            <Link href="/sigup" className='underline mb-2'>Đăng ký</Link>
            <button className="bg-orange-300 p-2 border-2 rounded-md border-orange-300 mb-2" type="submit">Đăng nhập</button>
            </form>
    </div>
    
  );
}

export default FrmCreateUser; 