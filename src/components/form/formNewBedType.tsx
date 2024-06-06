'use client'
import React, { useEffect, useState } from 'react';
import styles from "./form.module.css"

import { addBedType } from '@/modules/bedType/service';
const FrmAddBedType = () => {

    const [bedTypeData, setBedTypeData] = useState({
        bedTypeName: '',
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!bedTypeData.bedTypeName) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
          }
        addBedType(bedTypeData).then((res) => {
            if (res.status == 200){
                alert("them loai phong moi thanh cong")
                setBedTypeData({bedTypeName: ''})
              }
              else if (res.status == 400){
                alert("them loai phong moi that bai, ten hang phong da ton tai")
                
              }
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
            <h1>Thêm loại giường</h1>
            <div className='flex justify-center'>
                
                <form onSubmit={handleSubmit} className={`${styles.sizeForm} bg-blue-300 p-4 rounded-md border-2`}>
                    <div className='flex justify-between items-center mb-4'>
                        <label>Tên loại giường: </label>
                        <input className='p-1 border-2 rounded-md' type='text' name='bedTypeName' value={bedTypeData.bedTypeName} onChange={handleChange} required></input>
                    </div>
                    <div className='flex justify-end'>
                        <button className='bg-green-400 p-2 rounded-md border-2' type='submit'>Lưu</button>
                    </div>
                </form>
             </div>
        </div>
        
    )
}
export default FrmAddBedType