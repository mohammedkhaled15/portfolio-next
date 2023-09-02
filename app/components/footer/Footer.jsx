"use client"

import "./footer.css"
import { AiFillFacebook } from "react-icons/ai"
import { AiFillLinkedin } from "react-icons/ai"
import { AiFillInstagram } from "react-icons/ai"
import { AiOutlineTwitter } from "react-icons/ai"
import { SiUpwork } from "react-icons/si"
import { SiLeetcode } from "react-icons/si"
import { BsGithub } from "react-icons/bs"
import Link from "next/link"

const Footer = () => {

    const contacts = [
        {
            href: "https://www.facebook.com/Mohammedkhaled1590",
            icon: AiFillFacebook
        },
        {
            href: "https://www.linkedin.com/in/mohammed-khaled-farag/",
            icon: AiFillLinkedin
        },
        {
            href: "https://www.instagram.com/mohammedkhaled1590/",
            icon: AiFillInstagram
        },
        {
            href: "https://twitter.com/M_Kh1590",
            icon: AiOutlineTwitter
        },
        {
            href: "https://www.upwork.com/freelancers/~01402b578c96d22843",
            icon: SiUpwork
        },
        {
            href: "https://leetcode.com/mohammedkhaled15/",
            icon: SiLeetcode
        },
        {
            href: "https://github.com/mohammedkhaled15",
            icon: BsGithub
        },
    ]

    const footerLinks = ["/", "/about", "/experience", "/services", "/portofolio", "/contact"]

    return (
        <footer>
            {/* <Link href="/" className="footer__logo">Mohammed khaled</Link> */}
            <ul className='permalinks'>
                {
                    footerLinks.map(link => (
                        <li key={link}>
                            <Link href={link}>
                                {link === "/" ? "HOME" : link.substring(1).toUpperCase()}
                            </Link>
                        </li>
                    ))
                }
            </ul>
            <div className="footer__socials">
                {
                    contacts.map(contact => (
                        <Link key={contact.href} href={contact.href}><contact.icon className='footer__socials-icon' /></Link>

                    ))
                }
            </div>
            <div className="footer__copyright"><small>&copy; MADE WITH <span>&#9829;</span> BY MOHAMMED KHALED</small></div>
        </footer>
    )
}

export default Footer