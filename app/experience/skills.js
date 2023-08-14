import { AiOutlineHtml5 } from "react-icons/ai";
import { SiCss3, SiTypescript } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { GrReactjs } from "react-icons/gr";
import { FaSass } from "react-icons/fa";
import { FaBootstrap } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import { SiMaterialui } from "react-icons/si";
import { BsDiagram3Fill } from "react-icons/bs";
import { FaGitAlt } from "react-icons/fa";
import { RiReactjsLine } from "react-icons/ri";
import { SiRedux } from "react-icons/si";
import { SiReactrouter } from "react-icons/si";
import { IoLogoNodejs } from "react-icons/io";
import { SiMongodb } from "react-icons/si";
import { SiExpress } from "react-icons/si";

const skills = [
  {
    title: "Frontend Skills",
    subSkills: [
      {
        name: "HTML5",
        icon: (color)=><SiCss3 color={color} className='progress__icon'/>,
        color: "red",
        percentage: "90%",
      },
      {
        name: "CSS3",
        icon: (color)=><SiCss3 color={color} className='progress__icon'/>,
        color: "#264de4",
        percentage: "85%",
      },
      {
        name: "javaScript",
        icon: (color)=><SiJavascript color={color} className='progress__icon'/>,
        color: "#f0db4f",
        percentage: "80%",
      },
      {
        name: "TypeScript",
        icon: (color)=><SiTypescript color={color} className='progress__icon'/>,
        color: "#377ab1",
        percentage: "85%",
      },
      {
        name: "ReactJs",
        icon: (color)=><GrReactjs color={color} className='progress__icon'/>,
        color: "#5CD0EE",
        percentage: "80%",
      },
    ],
  },
  {
    title: "BackEnd Skills",
    subSkills: [
      {
        name: "NodeJs",
        icon: (color)=><IoLogoNodejs color={color} className="progress__icon"/>,
        color: "#228137",
        percentage: "80%",
      },
      {
        name: "MongoDb",
        icon: (color)=><SiMongodb color={color} className="progress__icon"/>,
        color: "#00684A",
        percentage: "80%",
      },
      {
        name: "ExpressJs",
        icon: (color)=><SiExpress color={color} className="progress__icon"/>,
        color: "black",
        percentage: "85%",
      },
    ],
  },
  // {
  //   title: "React Libraries",
  //   subSkills: [
  //     // {
  //     //   name: "Sass",
  //     //   icon: (color)=><FaSass color={color} className="progress__icon"/>,
  //     //   color: "#C66394",
  //     //   percentage: "85%",
  //     // },
  //     // {
  //     //   name: "Bootstrap",
  //     //   icon: (color)=><FaBootstrap color={color} className="progress__icon"/>,
  //     //   color: "#14B6AE",
  //     //   percentage: "90%",
  //     // },
  //     // {
  //     //   name: "Tailwind",
  //     //   icon: (color)=><SiTailwindcss color={color} className="progress__icon"/>,
  //     //   color: "#36B7F0",
  //     //   percentage: "85%",
  //     // },
  //     // {
  //     //   name: "Material UI",
  //     //   icon: (color)=><SiMaterialui color={color} className="progress__icon"/>,
  //     //   color: "#007BF7",
  //     //   percentage: "80%",
  //     // },
  //   ],
  // },
  // {
  //   title: "Libraries",
  //   subSkills: [
  //     {
  //       name: "React Hooks",
  //       icon: (color)=><RiReactjsLine color={color} className="progress__icon"/>,
  //       color: "#5CD0EE",
  //       percentage: "85%",
  //     },
  //     {
  //       name: "Redux-toolkit",
  //       icon: (color)=><SiRedux color={color} className="progress__icon"/>,
  //       color: "#7046B2",
  //       percentage: "85%",
  //     },
  //     {
  //       name: "Router",
  //       icon: (color)=><SiReactrouter color={color} className="progress__icon"/>,
  //       color: "#C5021A",
  //       percentage: "80%",
  //     },
  //   ],
  // },
  {
    title: "Side Skills",
    subSkills: [
      {
        name: "Problem Solving",
        icon: (color)=><BsDiagram3Fill color={color} className="progress__icon"/>,
        color: "#black",
        percentage: "60%",
      },
      {
        name: "Git",
        icon: (color)=><FaGitAlt color={color} className="progress__icon"/>,
        color: "#E94E31",
        percentage: "90%",
      },
    ],
  },
];

export default skills;
