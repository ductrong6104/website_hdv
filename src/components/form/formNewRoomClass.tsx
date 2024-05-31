'use client'
import React, { useEffect, useState } from 'react';
import styles from "./form.module.css"
import { addRoomClass } from '@/modules/roomClass/service';
import { useRouter } from 'next/navigation';
const FrmAddRoomClass = ({params}) => {
    const router = useRouter();
    const [roomClassData, setRoomClassData] = useState({
        roomClassName: '',
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!roomClassData.roomClassName) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
          }
        addRoomClass(roomClassData).then((res) => {
            if (res.status == 200){
                alert("them hang phong moi thanh cong")
                router.push(`/hotel/${params.hotelId}/roomClass`)
              }
              else if (res.status == 400){
                alert("them hang phong moi that bai, ten hang phong da ton tai")
                router.push(`/hotel/${params.hotelId}/roomClass`)
              }
        }) ;  
    }
   
    const handleChange = (e:any ) => {
        const { name, value } = e.target;
        setRoomClassData({
          ...roomClassData,
          [name]: value,
        });
      };

    return (
        <div className='flex flex-col items-center'>
            <h1>Thêm hạng phòng</h1>
            <div className='flex justify-center'>
                
                <form onSubmit={handleSubmit} className={`${styles.sizeForm} bg-blue-300 p-4 rounded-md border-2`}>
                    <div className='flex justify-between items-center mb-4'>
                        <label>Tên hạng phòng: </label>
                        <input className='p-1 border-2 rounded-md' type='text' name='roomClassName' value={roomClassData.roomClassName} onChange={handleChange} required></input>
                    </div>
                    <div className='flex justify-end'>
                        <button className='bg-green-400 p-2 rounded-md border-2' type='submit'>Lưu</button>
                    </div>
                </form>
             </div>
        </div>
        
    )
}
export default FrmAddRoomClass