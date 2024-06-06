
"use client"

import { getAllHotel } from '@/modules/hotel/service';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import UserSession from '@/utils/user';
import { stringify } from 'querystring';
import { addNewAccount } from '@/modules/account/services';
import { exit } from 'process';

interface FormProps {
  onSubmit: (data: FormData) => void;
}



function FrmSigup() {
  
  const [frmAccount, setFrmAccount] = useState({
    "email": '',
    "password": '',
    "firstName":'',
    "lastName":'',
    "gender":'',
    "birthDay":''
    });
  const router = useRouter()
  const [selectedGender, setSelectedGender] = useState(null);
    const [passwordAgain, setPasswordAgain] = useState(null);
  const handleGenderChange = (e: any) => {
    const value = parseInt(e.target.value, 10); 
    setFrmAccount({ ...frmAccount, gender: value });
    setSelectedGender(value);
  };
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFrmAccount({ ...frmAccount, [name]: value });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // alert(JSON.stringify(frmAccount));
    if (frmAccount.password != passwordAgain){
      alert("kiem tra lai password nhap lai");
    
    }
    addNewAccount(frmAccount).then((res)=>{
        if (res.code === 201){
            // console.log(res.data);
          alert("them account thanh cong")
          router.push("/sigin");
        }
        else if (res.code === 500){
          alert("them account that bai, email da ton tai")
        }
            
    })
    return
    // Lưu thông tin người dùng vào Singleton
    const userSession = UserSession.getInstance();
    userSession.setUser(1);
    router.push('/hotel');


    console.log("aaa")
    
    
    
    
  }

  return (
    <div className=' bg-blue-400 flex items-center justify-center'>
        <form onSubmit={handleSubmit} className='w-96 bg-white rounded-md p-6 flex flex-col' method='POST'>
            <div className='flex text-2xl mb-2 justify-center text-blue-500'>Hotelier</div>
            
            <div className='flex flex-col mb-2'>
                <span>Địa chỉ email:</span>
                <input className='rounded-md border-black border-2 p-2' type="text" name="email" value={frmAccount.email} onChange={handleInputChange} />
            </div>
            <div className='flex flex-col mb-2'>
                <span>Mật khẩu: </span>
                <input className='rounded-md border-black border-2 p-2' type="password" name="password" value={frmAccount.password} onChange={handleInputChange} />
            </div>
            <div className='flex flex-col mb-2'>
                <span>Nhập lại mật khẩu: </span>
                <input className='rounded-md border-black border-2 p-2' type="password" name="passwordAgain" value={passwordAgain} onChange={(e: any) => setPasswordAgain(e.target.value)} />
            </div>
            <div className='flex flex-col mb-2'>
                <span>Họ: </span>
                <input className='rounded-md border-black border-2 p-2' type="text" name="firstName" value={frmAccount.firstName} onChange={handleInputChange} />
            </div>
            <div className='flex flex-col mb-2'>
                <span>Tên: </span>
                <input className='rounded-md border-black border-2 p-2' type="text" name="lastName" value={frmAccount.lastName} onChange={handleInputChange} />
            </div>
            
            <div className='flex flex-col mb-2'>
                <span>Ngày sinh: </span>  
                <input className='rounded-md border-black border-2 p-2' type="date" name="birthDay" value={frmAccount.birthDay} onChange={handleInputChange} />
            </div>
            <div className='flex flex-col mb-2'>
                <h2>Chọn giới tính</h2>
                <div className='flex'>
                <div className='mr-2'>
                        <label>
                        <input
                            type="checkbox"
                            value={0}
                            checked={selectedGender === 0}
                            onChange={handleGenderChange}
                        />
                        Nam
                        </label>
                    </div>
                    <div>
                        <label>
                        <input
                            type="checkbox"
                            value={1}
                            checked={selectedGender === 1}
                            onChange={handleGenderChange}
                        />
                        Nữ
                        </label>
                    </div>
                </div>
                
            </div>
            
            <Link href="/sigin" className='underline mb-2'>Đăng nhập</Link>
            <button className="bg-orange-300 p-2 border-2 rounded-md border-orange-300 mb-2" type="submit">Đăng ký</button>
            </form>
    </div>
    
  );
}

export default FrmSigup; 