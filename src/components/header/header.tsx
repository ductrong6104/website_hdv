import Link from "next/link";
import styles from "@/app/(dashboard)/dashboard.module.css"
import DropdownMenu from "../dropdown/dropDownMenu";
export default function HeaderPage () {
    return (
        <div className="bg-blue-200" >
            <nav className={`items-center flex justify-between`}>
                <Link className="flex" href="/hotel">
                    <div>icon</div>
                    <h1>Hotel manager</h1>
                </Link>
                <DropdownMenu></DropdownMenu>
            </nav>
            
        </div>
    )
}