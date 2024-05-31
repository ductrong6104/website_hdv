// AddHotelForm.js
'use client'
import React, { useEffect, useState } from 'react';
import styles from "./form.module.css"
import Combobox from "../combobox/index";
import { getAllCommune, getCommuneByDistrictId } from '@/modules/commune/service';
import { getAllDistrict, getDistrictByProvinceId } from '@/modules/district/service';
import { getAllProvince } from '@/modules/province/service';
import { getAllHotelType } from '@/modules/hotelType/service';
import { addHotel } from '@/modules/hotel/service';
import { useRouter } from 'next/navigation';
import UserSession from '@/utils/user';
const AddHotelForm = (
    // { onAdd }
) => {
  const [hotelData, setHotelData] = useState({
    hotelName: '',
    description: '',
    phoneNumber: '',
    checkinTime: '',
    checkoutTime: '',
    floorNumber: '',
    hotelTypeId: '',
    communeId: '',
    hotelierId: '',
  });
  const router = useRouter();
  const [district, setDistrict] = useState('');
  const [province, setProvince] = useState('');

  const [hotelTypes, setHotelTypes] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [provinces, setProvinces] = useState([]);
  
  const userSession = UserSession.getInstance();
  const user = userSession.getUser();
  useEffect(() => {
    if (district){
      getCommuneByDistrictId(district).then((res) => {
          if (res.status === 200){
              
              setCommunes(res.data.map((commune: any) => ({
                value: commune.id,
                label: commune.communeName,
              })))
            hotelData.communeId = '';
              
          }
      })
    }
    else{
      setCommunes([]);
    }
      
  }, [province, district]) 
  useEffect(() => {
    if (province){
      getDistrictByProvinceId(province).then((res) => {
        if (res.status === 200){
          setDistricts(res.data.map((district: any) => ({
            value: district.id,
            label: district.districtName,
          })))
          // setDistrict('');
          setDistrict('0');
          
        }
            
      })
     
    }
    else{
      setDistricts([]);

    }
  }, [province]) 
  useEffect(() => {
    getAllProvince().then((res) => {
        if (res.status === 200)
            setProvinces(res.data.map((province: any) => ({
              value: province.id,
              label: province.provinceName,
            })))
    })
  }, []) 
  useEffect(() => {
    getAllHotelType().then((res) => {
        if (res.status === 200)
            setHotelTypes(res.data.map((hotelType: any) => ({
              value: hotelType.id,
              label: hotelType.hotelTypeName,
            })))
    })
  }, []) 

  const handleChange = (e:any ) => {
    const { name, value } = e.target;
    setHotelData({
      ...hotelData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Kiểm tra xem các trường đã được điền đầy đủ không
    if (!hotelData.hotelName || !hotelData.hotelTypeId || !hotelData.communeId) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    // alert(hotelData);
    console.log(typeof(hotelData));
    hotelData.hotelierId = user;
    console.log(hotelData);
    addHotel(hotelData).then((res) => {
      if (res.status == 200){
        alert("them khach san moi thanh cong")
        router.push("/hotel")
      }

    })
    

    // Gọi hàm onAdd để thêm khách sạn mới
    // onAdd({ name, address, phone });
    // Xóa dữ liệu trong form sau khi thêm thành công
    // setName('');
    // setAddress('');
    // setPhone('');
  };

  const handleChangeProvince = (e: any) => {
    const { name, value } = e.target;
    setProvince(value);
  }
  const handleChangeDistrict = (e: any) => {
    const { name, value } = e.target;
    setDistrict(value);
  }

  return (
    <div className='flex justify-center'>
    <form onSubmit={handleSubmit} className={`${styles.sizeForm} bg-blue-300 p-4`}>
      <div className='flex justify-between items-center mb-4'>
        <label htmlFor="name">Tên khách sạn:</label>
        <input className='p-1 border-2 rounded-md' type="text" name='hotelName' value={hotelData.hotelName} onChange={handleChange} required/>
      </div>
      <div className='flex justify-between mb-4 items-center'>
        <label htmlFor="name">Mô tả:</label>
        <input className='p-1 border-2 rounded-md' type="text" name='description'  value={hotelData.description} onChange={handleChange} />
      </div>
      <div className='flex justify-between mb-4 items-center'>
        <label htmlFor="name">Số điện thoại:</label>
        <input className='p-1 border-2 rounded-md' type="tel" pattern="[0]{1}[0-9]{9}" name='phoneNumber' value={hotelData.phoneNumber} onChange={handleChange} />
      </div>
      <div className='flex justify-between mb-4 items-center'>
        <label htmlFor="name">Giờ nhận phòng</label>
        <input className='p-1 border-2 rounded-md' type="time" name='checkinTime'  value={hotelData.checkinTime} onChange={handleChange} />
      </div>
      <div className='flex justify-between mb-4 items-center'>
        <label htmlFor="address">Giờ trả phòng</label>
        <input className='p-1 border-2 rounded-md' type="time" name='checkoutTime' value={hotelData.checkoutTime} onChange={handleChange} />
      </div>
      <div className='flex justify-between mb-4 items-center'>
        <label htmlFor="phone">Số tầng</label>
        <input className='p-1 border-2 rounded-md' type="number" name='floorNumber' value={hotelData.floorNumber} onChange={handleChange} />
      </div>
      <Combobox options={hotelTypes} label="Chọn loại khách sạn:" onChange={handleChange} name="hotelTypeId"/>
      <Combobox options={provinces} label="Chọn tỉnh:" onChange={handleChangeProvince} name="provinceId" />
      <Combobox options={districts} label="Chọn quận:" onChange={handleChangeDistrict} name="districtId" />
      <Combobox options={communes} label="Chọn phường:" onChange={handleChange} name="communeId" />
      
      <div className='flex justify-end'>
        <button type="submit" >+ Thêm mới</button>
      </div>
      
    </form>
    </div>
  );
};

export default AddHotelForm;
