'use client'
import { useEffect, useState } from "react";
import FlexibleTable from "@/components/table/table";
import { getRoomClassByHotelId } from "@/modules/hotel_roomClass/service";
import Link from "next/link";
const PageRoomClass = ({params}) =>{
    const [data, setData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  useEffect(() => {
    getRoomClassByHotelId(params.hotelId).then((res) => {
        if (res.status == 200){
            setData(res.data);
        }
    })
  }, []);
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
    <Link className="bg-green-500 rounded-md border-2 p-2" href={`/hotel/${params.hotelId}/roomClass/newRoomClass`}>+ Tạo hạng phòng mới</Link>
    <Link className="bg-green-500 rounded-md border-2 p-2" href={`/hotel/${params.hotelId}/roomClass/roomClassApply`}>+ Áp dụng hạng phòng</Link>
    <div className="flex justify-center mt-2">
        <h1 className="text-3xl mb-2">Danh sách hạng phòng của khách sạn</h1>
    </div>
      
      <FlexibleTable data={data} headerNames={['Mã', 'Tên hạng phòng']} onSort={handleSort} />
    </div>
  );
}
export default PageRoomClass