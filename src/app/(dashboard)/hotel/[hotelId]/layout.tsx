'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google"; 

import HeaderHotel from "@/components/header/headerHotel";
const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";
import { useEffect, useState } from "react";
import { getHotelNameById } from "@/modules/hotel/service";
export default function HotelLayout({
  children, params
}: {
  children: React.ReactNode,
  params: {hotelId: string}
}) {
  const [nameHotel, setNameHotel] = useState('');
  useEffect(()=>{
    getHotelNameById(params.hotelId).then((res)=>{
      if (res.status == 200)
        setNameHotel(res.data.hotelName);
    })
  },[params.hotelId]);
  return (
    <>
      <div className="flex justify-center mb-4">
      <div className="text-4xl text-pink-400">Tên khách sạn: {nameHotel}</div>
      </div>
      
      <nav className={`items-center flex justify-start mb-4`}>
                <Link className="mr-4 rounded-md border-2 p-2 bg-blue-400" href={`/hotel/${params.hotelId}`}>Trang chủ</Link>
                <Link className="mr-4 rounded-md border-2 p-2 bg-blue-400" href={`/hotel/${params.hotelId}/roomClass`}>Quản lý hạng phòng</Link>
                <Link className="mr-4 rounded-md border-2 p-2 bg-blue-400" href={`/hotel/${params.hotelId}/room`}>Quản lý phòng</Link>
                <Link className="mr-4 rounded-md border-2 p-2 bg-blue-400" href={`/hotel/${params.hotelId}/bedType`}>Quản lý loại giường</Link>

                
            </nav>
          <div className="rounded-md border-2 p-2 h-screen">
          {children}
          </div>
          
    </>
        
          
 
  );
}
