
'use client'
import { useEffect, useState } from "react";
import FlexibleTable from "@/components/table/table";
import Combobox from "@/components/combobox/index"
import Link from "next/link";
import { getBedTypeByHotelId, getBedTypesByHotel_roomClassId } from "@/modules/roomClass_bedType/service";
import { usePathname } from "next/navigation";
import { getHotel_roomClassRoomByHotelId } from "@/modules/hotel_roomClass/service";
const PageBedTypeByRoomClass = ({params}) => {
    const [data, setData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [roomClasses, setRoomClasses] = useState([]);
    const [roomClassSelected, setRoomClassSelected] = useState();
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
    }, [])
    useEffect(()=>{
        if (roomClassSelected){
            
            getBedTypesByHotel_roomClassId(roomClassSelected).then((res)=>{
                if (res.status === 200){
                    setData(res.data);
                }
            })
        }
    })
const handleChangeRoomClass = (e: any) => {
    setRoomClassSelected(e.target.value);
}
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
    <div className="flex justify-center mt-2">
        <h1 className="text-3xl mb-2">Danh sách loại giường của hạng phòng</h1>
    </div>
    <div className="flex flex-row">

        <Combobox options={roomClasses} label="Chọn hạng phòng:" onChange={handleChangeRoomClass} name="roomClassSelected"/>
    </div>
      <FlexibleTable data={data} headerNames={['Mã', 'Tên loại giường']} onSort={handleSort} />
    </div>
    )
}
export default PageBedTypeByRoomClass