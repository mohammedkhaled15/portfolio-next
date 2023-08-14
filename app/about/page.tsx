import Image from "next/image";
import Link from "next/link";
import "./about.css";
import { FaAward } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { VscFolderActive } from "react-icons/vsc";

const About = () => {
  return (
    <section id="about">
      <h5>Get To Know</h5>
      <h2>About Me</h2>
      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <Image
              src={"/me-about.jpg"}
              alt="me"
              fill
              className=" object-contain"
            />
          </div>
        </div>

        <div className="about__content">
          <div className="about__cards">
            <div className="about__card w-24">
              <FaAward className="about__icon" />
              <h4>Experience </h4>
              <small>2+ Years</small>
            </div>
            <div className="about__card">
              <FiUsers className="about__icon" />
              <h4>Clients </h4>
              <small>4+ clients</small>
            </div>
            <div className="about__card">
              <VscFolderActive className="about__icon" />
              <h4>Projects</h4>
              <small>20+ Projects</small>
            </div>
          </div>
        </div>

        <div className="col-span-2 text-justify mb-2">
          <p className="mb-2">
            I'm very pleased to introduce my CV hoping to be one of your team.
            I'm a MERN Stack Developer with 2 years of experience developing
            modern, responsive, and cross-browser-compatible websites using
            HTML, CSS, JavaScript, React-js, NextJs, NodeJs, ExpressJS, MongoDb
            and more variant skills. I'm Seeking a challenging career in your
            company as MERN Stack Developer where my abilities and skills can be
            developed, and my knowledge can be applied.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Let's Talk
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
