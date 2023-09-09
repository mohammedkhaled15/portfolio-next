"use client"
import "./nav.css"
import { AiOutlineHome } from "react-icons/ai"
import { AiOutlineUser } from "react-icons/ai"
import { MdWorkOutline } from "react-icons/md"
import { MdMiscellaneousServices } from "react-icons/md"
import { AiOutlineContacts } from "react-icons/ai"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Tooltip } from 'react-tooltip'
import { Fragment } from "react"
import { RiGalleryFill } from "react-icons/ri"
import { useSession } from "next-auth/react"

export const links = [
    { path: "/", icon: AiOutlineHome },
    { path: "/about", icon: AiOutlineUser },
    { path: "/experience", icon: MdWorkOutline },
    { path: "/portfolio", icon: RiGalleryFill },
    { path: "/services", icon: MdMiscellaneousServices },
    { path: "/contact", icon: AiOutlineContacts },
]
const Nav = () => {
    const session = useSession()
    console.log(session)
    const pathname = usePathname()
    return (
        <nav>
            {
                links.map(link => (
                    <Fragment key={link.path}>
                        <Tooltip key={link.path} id={`${link.path}`} />
                        <Link
                            data-tooltip-id={`${link.path}`}
                            data-tooltip-content={link.path === "/" ? "Home" : link.path.substring(1)}
                            href={link.path}
                            className={pathname === `${link.path}` || "" ? "active" : ""}
                        >
                            <link.icon />
                        </Link>
                    </Fragment>
                ))
            }
        </nav>
    )
}

export default Nav