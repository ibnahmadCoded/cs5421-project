import { useState } from "react"
import { Link } from "react-router-dom";
import controlImg from '../assets/control.png'
import logoVertical from '../assets/logo-vertical.png'

const SideBar = ({user, url}) => {
    const [open, setOpen] = useState(true);
    const Menus = [
        {"title": "Home", src: "home", "userType": "Admin", path:"/"},
        {"title": "Home", src: "home", "userType": "Student", path:"/"},
        {"title": "Leaderboards", src: "leaderboard", "userType": "Admin", path:"/leaderboards"},
        {"title": "My Submissions", src: "history", "userType": "Student", path:"/submissions"},
        {"title": "Settings", src: "settings", gap: true, "userType": "Student", path:"/settings"},
        {"title": "Settings", src: "settings", gap: true, "userType": "Admin", path:"/settings"},
        {"title": "Create Contest", src: "contest", "userType": "Admin", path:"/create-contest"},
        {"title": "Leaderboards", src: "leaderboard", "userType": "Student", path:"/leaderboards"},
        {"title": "About", src: "about", "userType": "Admin", path:"/about"},
        {"title": "About", src: "about", "userType": "Student", path:"/about"},
    ]

    return (
        <div>
            <div className={`${open ? 'w-72' : 'w-20'} duration-300 h-screen p-5 pt-8 bg-dark-blue relative`}>
            <img src={controlImg}  alt="control-icon" className={`absolute cursor-pointer rounded-full
            -right-3 top-9 w-7 border-2 border-dark-blue ${!open  && "rotate-180"}`}
            onClick={() => setOpen(!open)}/>
            <div className="flex gap-x-4  items-center">
            <img src={logoVertical}  alt="control-icon"  
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`} 
            height="40px"/>
            <h1 className={`text-white origin-left font-medium text-xl
            duration-300 ${!open  && "scale-0"}`}>
            </h1>
            </div>
            <ul className="pt-6">
            { 
                Menus.filter(menus => menus.userType === user.map(user => {return user.userType})[0]).map((menu, index) => 
                <li 
                key={index}
                className={`text-gray-300 text-sm flex items-center 
                gap-x-4 cursor-pointer p-2 hover:bg-orange rounded-md
                ${menu.gap ? "mt-9" : "mt-2"} ${menu.path === url && "bg-orange"}`}
                >
                <Link to={menu.path}>
                    <img alt="menu-icon" src={require(`../assets/${menu.src}.png`)}/>
                </Link>
                <Link to={menu.path}>
                    <span className={`${!open  && "hidden"}`}>
                        {menu.title}
                    </span> 
                </Link>
                </li>) 
            }
            </ul>
            </div>
        </div>
    )
}

export default SideBar