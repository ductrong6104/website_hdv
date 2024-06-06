
'use client'
import { useEffect, useState } from "react";
import styles from "./form.module.css"
import Combobox from "../combobox";
import { getHotel_roomClassRoomByHotelId } from "@/modules/hotel_roomClass/service";
import { addNewRoomForHotel } from "@/modules/room/service";
const FrmNewRoom = ({params}) => {
    const [roomData, setRoomData] = useState({
        'roomName': '',
        'width': '',
        'height': '',
        'maxPerson': '',
        'hotel_roomClassId': ''
    });
    const [roomClasses, setRoomClasses] = useState([]);

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

    const handChange = (e: any) => {
        const {name, value} = e.target;
        setRoomData({
            ...roomData,
            [name]: value
        });
    };

    const handSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!roomData.roomName || !roomData.hotel_roomClassId){
            alert("Vui lòng nhập đầy đủ thông tin! Kiểm tra chọn hạng phòng chưa")
            return;
        }
        alert(JSON.stringify(roomData));
        addNewRoomForHotel(roomData).then((res) => {
            if (res.status === 200){
                alert("Thêm phòng thành công!")
            }
            setRoomData({roomName: '', width: '', height: '', maxPerson: '', hotel_roomClassId: ''})
            
        })
    }
  return (
    <>
    
      <div className="flex justify-center">
        <form className={`${styles.sizeForm}  bg-blue-300 p-4 rounded-md border-2`} onSubmit={handSubmit}>
            <div className="text-xl text-center mb-4">Thêm phòng cho khách sạn</div>
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
            <div className="flex justify-end">
                <button type="submit" className="bg-green-400 p-2 rounded-md border-2">Lưu thay đổi</button>
            </div>
        </form>
        
        
      </div>
      
    </>
  );
}
export default FrmNewRoom;