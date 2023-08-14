"use client"
import "./experience.css"
import { useState, useEffect } from 'react'
import CountUp from 'react-countup'
import skills from './skills'

import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const Experience = () => {
  const [fire, setFire] = useState(false);

  const scrollHeight = () => {
    // return window.scrollY >= "1100" ? setFire(true) : ""
    return setFire(true)
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeight);
    return () => window.removeEventListener("scroll", scrollHeight);
  });

  const pagination = {
    clickable: true,
    renderBullet: function (index:number, className:string) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <section id='experience'>
      <h5>Skills I have</h5>
      <h2>My Experience</h2>
      <Swiper
        // install Swiper modules
        modules={[Autoplay, Pagination]}
        spaceBetween={50}
        pagination={pagination}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="container experience__container">

        {skills.map(skillCat => {
            return (
              <SwiperSlide key={skillCat.title} className="skills">
                <h2>{skillCat.title}</h2>
                <div className='skills-rates'>
                  {/* {console.log(skillCat.subSkills[0])} */}
                  {skillCat.subSkills.map(skill => {
                      return (
                        <div key={skill.name} className="progress">
                          <label>{skill.name}</label>
                          <div className='progress__icon__wrapper'>
                            {/* {<skill.icon className='progress__icon' color={skill.color} />} */}
                            {skill.icon(skill.color)}
                          </div>
                          <span style={{ width: `${fire ? skill.percentage : "0"}` }}></span>
                          {<CountUp end={parseInt(skill.percentage)} enableScrollSpy={fire} duration={1.5} suffix="%" scrollSpyOnce={true} className="counter" />}
                        </div>
                      )
                    })
                  }
                </div>
              </SwiperSlide>
            )
          })}
      </Swiper>
    </section>
  )
}

export default Experience