'use client'
import { useEffect, useState } from "react";
import FlexibleTable from "@/components/table/table";
import { getRoomClassByHotelId } from "@/modules/hotel_roomClass/service";
import Link from "next/link";
import { getRoomByHotelId } from "@/modules/room/service";
const PageRoom = ({params}) =>{
    const [data, setData] = useState([]);
    const headerNames = ['Mã', 'Tên phòng', 'Chiều dài', 'Chiều rộng', 'Số lượng người tối đa', 'Trạng thái', 'Hạng phòng']
  useEffect(() => {
    getRoomByHotelId(params.hotelId).then((res) => {
        if (res.status == 200){
            const roomsWithStatus = res.data.map((room: any) => ({
                ...room,
                roomStatus: getRoomStatus(room.roomStatus)
              }));
            setData(roomsWithStatus);
            // Chuyển đổi roomStatus từ Integer sang String
        
        }
    })
  }, []);
  // Hàm chuyển đổi trạng thái phòng
  const getRoomStatus = (status: any) => {
    return status === 1 ? 'Sẵn sàng' : 'Đang bảo trì';
  };
  return (
    <div>
    <Link className="bg-green-500 rounded-md border-2 p-2" href={`/hotel/${params.hotelId}/roomClass/newRoomClass`}>+ Thêm phòng</Link>
    <div className="flex justify-center">
        <h1 className="">Danh sách phòng của khách sạn</h1>
    </div>
      
      <FlexibleTable data={data} headerNames={headerNames} />
    </div>
  );
}
export default PageRoom