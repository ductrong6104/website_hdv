'use client'
import React, { useEffect, useState } from 'react';
import styles from "./form.module.css"
import { addRoomClass } from '@/modules/roomClass/service';
import { useRouter } from 'next/navigation';
import { addRoomClassForHotel, getHotel_roomClassRoomByHotelId, getRoomClassByHotelId, getRoomClassNotByHotelId } from '@/modules/hotel_roomClass/service';
import Combobox from '../combobox';
import { addRoomClass_bedType, getBedTypesNotByHotel_roomClassId } from '@/modules/roomClass_bedType/service';
const FrmApplyBedType = ({params}) => {
 
    const [reload, setReload] = useState(false);
    const [bedTypeData, setBedTypeData] = useState({
        hotel_roomClassId: '',
        bedTypeId: '',
        number: ''
    });

    const [bedTypes, setBedTypes] = useState([]);
    const [roomClasses, setRoomClasses] = useState([]);
    useEffect(()=>{
        getHotel_roomClassRoomByHotelId(params.hotelId).then((res)=>{
            if (res.status === 200){
                setRoomClasses(res.data.map((roomClass: any) => ({
                    value: roomClass.id,
                    label: roomClass.roomClassName,
                })))
                console.log(roomClasses)
            }
            
        })
    }, [reload])

    useEffect(()=>{
        if (bedTypeData.hotel_roomClassId){
            getBedTypesNotByHotel_roomClassId(bedTypeData.hotel_roomClassId).then((res)=>{
                if (res.status === 200){
                    setBedTypes(res.data.map((bedType: any) => ({
                        value: bedType.id,
                        label: bedType.bedTypeName,
                    })))
                    console.log(bedTypes)
                }
                
            })
        }
        
    }, [bedTypeData.hotel_roomClassId, reload])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!bedTypeData.hotel_roomClassId) {
            alert('Vui lòng chọn hạng phòng.');
            return;
          }
          if (!bedTypeData.bedTypeId) {
            alert('Vui lòng chọn loại giường.');
            return;
          }
          if (!bedTypeData.number)
            {
                alert('Vui lòng chọn số lượng.');
                return;
              }
        //   alert(JSON.stringify(bedTypeData))
         
        addRoomClass_bedType(bedTypeData).then((res) => {
            if (res.status == 200){
                setReload(!reload);
                alert("them loại giường cho hạng phòng thanh cong")
              }
            // router.push(`/hotel/${params.hotelId}/roomClass/roomClassApply`)
            
        }) ;  
    }
   
    const handleChange = (e:any ) => {
        const { name, value } = e.target;
        setBedTypeData({
          ...bedTypeData,
          [name]: value,
        });
      };

    return (
        <div className='flex flex-col items-center'>
            <h1>Áp dụng loại giường cho hạng phòng</h1>
            <div className='flex justify-center'>
                
                <form onSubmit={handleSubmit} className={`${styles.sizeForm} bg-blue-300 p-4 rounded-md border-2`}>
                    <Combobox options={roomClasses} label="Chọn hạng phòng:" onChange={handleChange} name="hotel_roomClassId"/>
                    <Combobox options={bedTypes} label="Chọn loại giường:" onChange={handleChange} name="bedTypeId"/>
                    <div className='flex justify-between items-center mb-4'>
                        <label>Số lượng: </label>
                        <input className='p-1 border-2 rounded-md' type='number' min={1} name='number' value={bedTypeData.number} onChange={handleChange} required></input>
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