'use client'
import { useEffect, useState } from "react";
import FlexibleTable from "@/components/table/table";
import { getRoomClassByHotelId } from "@/modules/hotel_roomClass/service";
import Link from "next/link";
const PageRoomClass = ({params}) =>{
    const [data, setData] = useState([]);

  useEffect(() => {
    getRoomClassByHotelId(params.hotelId).then((res) => {
        if (res.status == 200){
            setData(res.data);
        }
    })
  }, []);

  return (
    <div>
    <Link className="bg-green-500 rounded-md border-2 p-2" href={`/hotel/${params.hotelId}/roomClass/newRoomClass`}>+ Tạo hạng phòng mới</Link>
    <Link className="bg-green-500 rounded-md border-2 p-2" href={`/hotel/${params.hotelId}/roomClass/roomClassApply`}>+ Áp dụng hạng phòng</Link>
    <div className="flex justify-center">
        <h1 className="">Danh sách hạng phòng của khách sạn</h1>
    </div>
      
      <FlexibleTable data={data} headerNames={['Mã', 'Tên hạng phòng']} />
    </div>
  );
}
export default PageRoomClass