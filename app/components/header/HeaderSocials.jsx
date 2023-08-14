import Link from "next/link"
import { BsLinkedin } from "react-icons/bs"
import { BsGithub } from "react-icons/bs"
import { SiLeetcode } from "react-icons/si"

const HeaderSocials = () => {
    return (
        <div className='header__socials'>
            <Link target="_blank" href="https://www.linkedin.com/in/mohammed-khaled-farag/"><BsLinkedin /></Link>
            <Link target="_blank" href="https://github.com/mohammedkhaled15"><BsGithub /></Link>
            <Link target="_blank" href="https://leetcode.com/mohammedkhaled15/"><SiLeetcode /></Link>
        </div>
    )
}

export default HeaderSocials