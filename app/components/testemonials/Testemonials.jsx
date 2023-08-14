// import React from 'react'
// import "./testemonials.css"
// import AVTR1 from "../../assets/avatar1.jpg"
// import AVTR2 from "../../assets/avatar2.jpg"
// import AVTR3 from "../../assets/avatar3.jpg"
// import AVTR4 from "../../assets/avatar4.jpg"

// import { Pagination } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';

// const data = [
//     {
//         avatar: AVTR1,
//         name: "client name",
//         review: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis explicabo quisquam inventore repellendus provident exercitationem a corrupti eum eligendi quod, deleniti nobis quo temporibus aliquid quas iure deserunt eos sunt?"
//     },
//     {
//         avatar: AVTR2,
//         name: "client name",
//         review: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis explicabo quisquam inventore repellendus provident exercitationem a corrupti eum eligendi quod, deleniti nobis quo temporibus aliquid quas iure deserunt eos sunt?"
//     },
//     {
//         avatar: AVTR3,
//         name: "client name",
//         review: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis explicabo quisquam inventore repellendus provident exercitationem a corrupti eum eligendi quod, deleniti nobis quo temporibus aliquid quas iure deserunt eos sunt?"
//     },
//     {
//         avatar: AVTR4,
//         name: "client name",
//         review: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis explicabo quisquam inventore repellendus provident exercitationem a corrupti eum eligendi quod, deleniti nobis quo temporibus aliquid quas iure deserunt eos sunt?"
//     }
// ]

// const Testemonials = () => {
//     return (
//         <section id="testemonials">
//             <h5>Reviews from clients</h5>
//             <h2>Testemonials</h2>
//             <Swiper // install Swiper modules
//                 modules={[Pagination]}
//                 spaceBetween={40}
//                 slidesPerView={1}
//                 pagination={{ clickable: true }}
//                 className="container testemonials__container">
//                 {
//                     data.map(({ avatar, name, review }, index) => {
//                         return (

//                             <SwiperSlide key={index} className='testemonial'>
//                                 <div className="client__avatar">
//                                     <img src={avatar} alt="client avatar" />
//                                 </div>
//                                 <h5 className='client__name'>{name}</h5>
//                                 <small className='client__review'>
//                                     {review}
//                                 </small>
//                             </SwiperSlide>
//                         )
//                     })
//                 }
//             </Swiper>
//         </section>
//     )
// }

// export default Testemonials
