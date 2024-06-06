
'use client'
import { useEffect, useState } from "react";
import styles from "./form.module.css"
import Combobox from "../combobox";
import { getHotel_roomClassRoomByHotelId } from "@/modules/hotel_roomClass/service";
import { addNewRoomForHotel, editRoom, getRoomById } from "@/modules/room/service";
import CheckboxList from "../checkbox/index"
import RadioButton from "../radioButton/index";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
const FrmEdiRoom = ({params}) => {
    const router = useRouter();
    const pathname = usePathname();
    const [roomData, setRoomData] = useState({
        'id':'',
        'roomName': '',
        'width': '',
        'height': '',
        'maxPerson': '',
        'roomStatus': '',
        'hotel_roomClassId': ''
    });
    const [roomClasses, setRoomClasses] = useState([]);
    const roomStatuses = [
        { label: 'Đang bảo trì', value: 0 },
        { label: 'Sẵn sàng', value: 1 }
      ];
    const [roomStatusSelected, setRoomStatusSelected] = useState([]);
    useEffect(()=> {
        getHotel_roomClassRoomByHotelId(params.hotelId).then((res) => {
            if (res.status === 200){
                setRoomClasses(res.data.map((room: any) => ({
                    value: room.id,
                    label: room.roomClassName,
                })))
            }
            
        })
        
    }, [])
    useEffect(() => {
        getRoomById(params.roomId).then((res) => {
            if (res.status === 200){
                const { id, roomName, width, height, maxPerson, roomStatus, hotel_roomClassId } = res.data;

                // Cập nhật state với các thuộc tính cần thiết
                setRoomData({
                id,
                roomName,
                width,
                height,
                maxPerson,
                roomStatus,
                hotel_roomClassId
                });
            }
        })
    }, [])
    const handChange = (e: any) => {
        const {name, value} = e.target;
        setRoomData({
            ...roomData,
            [name]: value
        });
    };
    const handleRoomStatusChange = (value: any) => {
 
        setRoomData((prevData) => ({
          ...prevData,
          roomStatus: value,
        }));
      };
   

    const handSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!roomData.roomName || !roomData.hotel_roomClassId){
            alert("Vui lòng nhập đầy đủ thông tin! Kiểm tra chọn hạng phòng chưa")
            return;
        }
        alert(JSON.stringify(roomData));
        editRoom(roomData).then((res) => {
            if (res.status === 200){
                alert("Chỉnh sửa phòng thành công!")
            }
            const basePath = pathname.split('/').slice(0, 4).join('/');
            router.push(`${basePath}`)
            
        })
    }
  return (
    <>
    
      <div className="flex justify-center">
        <form className={`${styles.sizeForm}  bg-blue-300 p-4 rounded-md border-2`} onSubmit={handSubmit}>
            <div className="text-xl text-center mb-4">Chỉnh sửa phòng có id {params.roomId} </div>
            <div className="flex justify-between items-center mb-4">
                <label>Tên phòng: </label>
                <input className="p-1 border-2 rounded-md" type="text" name="roomName" value={roomData.roomName} onChange={handChange} required></input>
            </div>
            <div className="flex justify-between items-center mb-4">
                <label>Chiều dài: </label>
                <input className="p-1 border-2 rounded-md" min='1' name="width" value={roomData.width} type="number" onChange={handChange} required></input>
            </div>
            <div className="flex justify-between items-center mb-4">
                <label>Chiều rộng: </label>
                <input className="p-1 border-2 rounded-md" min='1' name="height" value={roomData.height} type="number" onChange={handChange} required></input>
            </div>
            <div className="flex justify-between items-center mb-4">
                <label>Số lượng người tối đa: </label>
                <input className="p-1 border-2 rounded-md" min='1' name="maxPerson" value={roomData.maxPerson} type="number" onChange={handChange} required></input>
            </div>
            <Combobox options={roomClasses} label="Chọn hạng phòng: " name="hotel_roomClassId" onChange={handChange} ></Combobox>
            <div className="">
                <label htmlFor="">Thay đổi trạng thái?</label>
                <RadioButton items={roomStatuses} selectedValue={roomData.roomStatus} onChange={handleRoomStatusChange}></RadioButton>
            </div>
            
            <div className="flex justify-end">
                <button type="submit" className="bg-green-400 p-2 rounded-md border-2">Lưu chỉnh sửa</button>
            </div>
        </form>
        
        
      </div>
      
    </>
  );
}
export default FrmEdiRoom;