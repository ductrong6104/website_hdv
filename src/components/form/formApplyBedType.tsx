'use client'
import React, { useEffect, useState } from 'react';
import styles from "./form.module.css"
import { addRoomClass } from '@/modules/roomClass/service';
import { useRouter } from 'next/navigation';
import { addRoomClassForHotel, getRoomClassByHotelId, getRoomClassNotByHotelId } from '@/modules/hotel_roomClass/service';
import Combobox from '../combobox';
const FrmApplyBedType = ({params}) => {
 
    const [reload, setReload] = useState(false);
    const [roomClassData, setRoomClassData] = useState({
        roomClassId: '',
        roomPrice: '',
        hotelId: ''
    });

    const [bedTypes, setBedTypes] = useState([]);
    const [roomClasses, setRoomClasses] = useState([]);
    useEffect(()=>{
        getRoomClassByHotelId(params.hotelId).then((res)=>{
            if (res.status === 200){
                setRoomClasses(res.data.map((roomClass: any) => ({
                    value: roomClass.id,
                    label: roomClass.roomClassName,
                })))
                console.log(roomClasses)
            }
            
        })
    }, [])
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        roomClassData.hotelId = params.hotelId;
        if (!roomClassData.roomClassId) {
            alert('Vui lòng chọn hạng phòng.');
            return;
          }
        //   alert(JSON.stringify(roomClassData))
         
        addRoomClassForHotel(roomClassData).then((res) => {
            if (res.status == 200){
                setReload(!reload);
                alert("them hang phong cho khach san thanh cong")
              }
            // router.push(`/hotel/${params.hotelId}/roomClass/roomClassApply`)
            
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
                    <Combobox options={roomClasses} label="Chọn hạng phòng:" onChange={handleChange} name="roomClassId"/>
                    <div className='flex justify-between items-center mb-4'>
                        <label>Số lượng: </label>
                        <input className='p-1 border-2 rounded-md' type='number' min={1} name='roomPrice' value={roomClassData.roomPrice} onChange={handleChange} required></input>
                    </div>
                    <div className='flex justify-end'>
                        <button className='bg-green-400 p-2 rounded-md border-2' type='submit'>Lưu</button>
                    </div>
                </form>
             </div>
        </div>
        
    )
}
export default FrmApplyBedType