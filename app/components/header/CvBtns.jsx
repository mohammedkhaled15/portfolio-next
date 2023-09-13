import Link from "next/link"

const CvBtns = () => {
    return (
        <div className='cv'>
            <Link target="_blank" href={"/Mohammed-Khaled-CV.pdf"} download className='btn'>Download CV</Link>
            <Link target="_blank" href={"/contact"} className='btn btn-primary'>Let&apos;s Talk</Link>
        </div>
    )
}

export default CvBtns