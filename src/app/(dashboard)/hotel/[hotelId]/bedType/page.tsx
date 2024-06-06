'use client'
import { useEffect, useState } from "react";
import FlexibleTable from "@/components/table/table";

import Link from "next/link";
import { getBedTypeByHotelId } from "@/modules/roomClass_bedType/service";
import { usePathname } from "next/navigation";
const PageBedType = ({params}) =>{
  const pathname = usePathname();
    const [data, setData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  useEffect(() => {
    getBedTypeByHotelId(params.hotelId).then((res) => {
      if (res.status === 200){
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
    <Link className="bg-green-500 rounded-md border-2 p-2" href={`/hotel/${params.hotelId}/bedType/newBedType`}>+ Tạo loại giường mới</Link>
    <Link className="bg-green-500 rounded-md border-2 p-2" href={`/hotel/${params.hotelId}/bedType/bedTypeApply`}>+ Áp dụng loại giường</Link>
    <Link className="bg-green-500 rounded-md border-2 p-2" href={`${pathname}/bedTypeByRoomClass`}>+ Xem loại giường theo hạng phòng</Link>
    <div className="flex justify-center mt-2">
        <h1 className="text-3xl mb-2">Danh sách loại giường của khách sạn</h1>
    </div>
      
      <FlexibleTable data={data} headerNames={['Mã', 'Tên loại giường']} onSort={handleSort} />
    </div>
  );
}
export default PageBedType