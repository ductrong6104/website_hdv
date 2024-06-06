
"use client"

import { getAllHotel } from '@/modules/hotel/service';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation';
import UserSession from '@/utils/user';
import { getAccountToken } from '@/modules/auths/service';
import { getAccountByEmail, getUserByAccountId } from '@/modules/account/services';
import { exit } from 'process';
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
  const pathname = usePathname();
  const [accessToken, setAccessToken] = useState();
  const [accountId, setAccountId] = useState();

 
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(JSON.stringify(formData));
    // Lưu thông tin người dùng vào Singleton
    // const userSession = UserSession.getInstance();
    // userSession.setUser(1);
    // router.push('/hotel');
    console.log("aaa")
    getAccountToken(formData).then((res) => {
      if (res.code == 200){
        setAccessToken(res.data.accessToken);
        
        console.log("getAccountToken")
        getAccountByEmail(formData.email).then((res) => {
          if (res.code == 200){
            setAccountId(res.data.id);
            console.log(`id account: ${res.data.id}`)
            console.log("getAccountByEmail")
            let idAccount = res.data.id;
            getUserByAccountId(idAccount).then((res) => {
              if (res.code == 200){
                let checkCreateUser = 1;
                res.data.forEach((user: any) => {
                  // neu ton tai user co role la hotelier thi khoi tao user cho hotelier nua
                  if (user.idRole == 2){
                    checkCreateUser = 0;
                    alert("đăng nhập thành công! chuyển đến dashboard")
                    const userSession = UserSession.getInstance();
                    userSession.setUser(user.id);
                    router.push("/hotel");
                    
                  }
                })
                console.log(`checkCreateUser ${checkCreateUser}`);
                // kiem tra xem co can tao user khong
                if (checkCreateUser == 1){
                  console.log(`res data id ${idAccount}`)
                  router.push(`${pathname}/${idAccount}/createUser`)
                }
                
              }
            })
          }
        })
      }
      
    })
    

    
    
    
  }

  return (
    <div className='h-screen bg-blue-400 flex items-center justify-center'>
        <form onSubmit={handleSubmit} className='w-96 bg-white rounded-md p-6 flex flex-col' method='POST'>
            <div className='flex text-2xl mb-2 justify-center text-blue-500'>Hotelier</div>
            <div className='flex text-xl mb-2'>Welcom back!</div>
            <div className='flex text-sm mb-2'>Log in to manage your accommodation from checking reservations to managing room availability!</div>
            <div className='flex flex-col mb-2'>
                <span>Your email address:</span>
                <input className='rounded-md border-black border-2 p-2' type="text" name="email" value={formData.email} onChange={handleInputChange} required/>
            </div>
            
            <div className='flex flex-col mb-2'>
                <span>Password</span>  
                <input className='rounded-md border-black border-2 p-2' type="password" name="password" value={formData.password} onChange={handleInputChange} required/>
            </div>
            <Link href="/sigup" className='underline mb-2'>Đăng ký</Link>
            <button className="bg-orange-300 p-2 border-2 rounded-md border-orange-300 mb-2" type="submit">Đăng nhập</button>
            </form>
    </div>
    
  );
}

export default FrmSigin; 