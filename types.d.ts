type ProjectData = {
  name: string;
  skill: string[];
  skillsDetails?: ISkill[];
  demoLink: string;
  repoLink: string;
  imgUrl: string;
};

interface ISkill {
  value: string;
  label: string;
  optionIsNew?: Boolean;
}
interface IProject {
  name: string;
  skills: { name: String }[];
  skillsDetails?: ISkill[];
  demoLink: string;
  repoLink: string;
  imgUrl: string;
}

interface Option {
  label: String;
  value: String;
}
