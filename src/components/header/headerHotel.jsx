import Link from "next/link";
const HeaderHotel = ({params}) => {
    return (
        <>
            <nav className={`items-center flex justify-between`}>
                <Link className="flex" href={`room`}>Quản lý phòng</Link>
                <Link className="flex" href="roomSale">Đăng bán phòng</Link>
                
            </nav>
        </>
    )
}
export default HeaderHotel;