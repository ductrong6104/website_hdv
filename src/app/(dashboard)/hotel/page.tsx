'use client'

import { getHotelUnsucessRegistration, getHotelsByHotelierId } from "@/modules/hotel/service";
import { useEffect, useState } from "react"
import Link from "next/link";
import styles from "../dashboard.module.css";
import ListHotel from "@/components/listItem/listHotel"
import UserSession from "@/utils/user";


const HotelPage = () => {
   
    const [hotels, setHotels] = useState([]);
    const userSession = UserSession.getInstance();
    const user = userSession.getUser();
    
    useEffect(()=>{
        getHotelsByHotelierId(user).then((res)=>{
            if (res.status === 200){
                setHotels(res.data);
                console.log(res.data);
            }
        })
    }, [])

    if (!user)
        return null;
    return (
        <div className="">
        <div className=" bg-blue-400 border-2 rounded-md p-2">
            <h1>Incomplete Registration Process</h1>
            <ListHotel hotels={hotels}></ListHotel>
            
        </div>
        <div className="flex justify-center">
            <Link className="border-2 rounded-md bg-green-400 p-4" href="/hotel/regisHotel">+ add hotel</Link>
        </div>

        </div>
    )
}

export default HotelPage;