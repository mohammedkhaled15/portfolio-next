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
import {SiNextdotjs} from "react-icons/si"

const skills = [
  {
    title: "Frontend Skills",
    subSkills: [
      {
        name: "HTML5",
        icon: SiCss3,
        color: "red",
        percentage: "90%",
      },
      {
        name: "CSS3",
        icon: SiCss3,
        color: "#264de4",
        percentage: "85%",
      },
      {
        name: "javaScript",
        icon: SiJavascript,
        color: "#f0db4f",
        percentage: "80%",
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
        color: "#377ab1",
        percentage: "85%",
      },
      {
        name: "ReactJs",
        icon: GrReactjs,
        color: "#5CD0EE",
        percentage: "80%",
      },
      {
        name: "NextJs",
        icon: SiNextdotjs,
        color: "black",
        percentage: "80%",
      },
    ],
  },
  {
    title: "BackEnd Skills",
    subSkills: [
      {
        name: "NodeJs",
        icon: IoLogoNodejs,
        color: "#228137",
        percentage: "80%",
      },
      {
        name: "MongoDb",
        icon: SiMongodb,
        color: "#00684A",
        percentage: "80%",
      },
      {
        name: "ExpressJs",
        icon: SiExpress,
        color: "black",
        percentage: "85%",
      },
    ],
  },
  // {
  //   title: "React Libraries",
  //   subSkills: [
  //     {
  //       name: "Sass",
  //       icon: FaSass,
  //       color: "#C66394",
  //       percentage: "85%",
  //     },
  //     {
  //       name: "Bootstrap",
  //       icon: FaBootstrap,
  //       color: "#14B6AE",
  //       percentage: "90%",
  //     },
  //     {
  //       name: "Tailwind",
  //       icon: SiTailwindcss,
  //       color: "#36B7F0",
  //       percentage: "85%",
  //     },
  //     {
  //       name: "Material UI",
  //       icon: SiMaterialui,
  //       color: "#007BF7",
  //       percentage: "80%",
  //     },
  //   ],
  // },
  {
    title: "Libraries",
    subSkills: [
      {
        name: "React Hooks",
        icon: RiReactjsLine,
        color: "#5CD0EE",
        percentage: "85%",
      },
      {
        name: "Redux-toolkit",
        icon: SiRedux,
        color: "#7046B2",
        percentage: "85%",
      },
      {
        name: "Router",
        icon: SiReactrouter,
        color: "#C5021A",
        percentage: "80%",
      },
    ],
  },
  {
    title: "Side Skills",
    subSkills: [
      {
        name: "Problem Solving",
        icon: BsDiagram3Fill,
        color: "#black",
        percentage: "60%",
      },
      {
        name: "Git",
        icon: FaGitAlt,
        color: "#E94E31",
        percentage: "90%",
      },
    ],
  },
];

export default skills;
