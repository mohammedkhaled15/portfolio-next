import Image from "next/image"
import Link from "next/link"
import CvBtns from './CvBtns'
import HeaderSocials from './HeaderSocials'

import "./header.css"

const Header = () => {
    return (
        <header id='home'>
            <div className="container header__container">
                <h5> Hello I'm</h5>
                <h1>Mohammed Khaled</h1>
                <h5 className='text-light'>MERN Stack Developer</h5>

                <CvBtns />

                <HeaderSocials />

                {/* <Link target="_blank" href="#contact" className='scroll__down'>Scroll Down</Link> */}

                <div className="hero-img">
                    <Image src={"/me.png"} alt="me" fill className="object-contain" />
                </div>
            </div>
        </header>
    )
}

export default Header