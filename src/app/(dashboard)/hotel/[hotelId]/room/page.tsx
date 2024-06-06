'use client'
import { useEffect, useState } from "react";
import FlexibleTable from "@/components/table/table";
import { getRoomClassByHotelId } from "@/modules/hotel_roomClass/service";
import Link from "next/link";
import { getRoomByHotelId } from "@/modules/room/service";
import { setDate } from "date-fns";
const PageRoom = ({params}) =>{
    const [data, setData] = useState([]);
    const headerNames = ['Mã', 'Tên phòng', 'Chiều dài', 'Chiều rộng', 'Số lượng người tối đa', 'Trạng thái', 'Hạng phòng']
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
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

  const handleFilter = (filters: any) => {
    const filtered = data.filter((room: any) => {
      return Object.keys(filters).every(key => {
        return room[key].toString().toLowerCase().includes(filters[key].toLowerCase());
      });
    });
 
  };

  const handleSort = (key: any) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    console.log(sortConfig)
    const sortedRooms = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setData(sortedRooms);
  };
  return (
    <div>
    <Link className="bg-green-500 rounded-md border-2 p-2" href={`/hotel/${params.hotelId}/room/add`}>+ Thêm phòng</Link>
    <div className="flex justify-center mt-2">
        <h1 className="text-3xl mb-2">Danh sách phòng của khách sạn</h1>
    </div>
      
      <FlexibleTable data={data} headerNames={headerNames} onSort={handleSort}/>
    </div>
  );
}
export default PageRoom