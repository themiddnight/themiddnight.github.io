const aboutData = [
  `An experienced animation layout artist skilled in Python for workflow optimization, currently transitioning to become a developer. Passionate about merging creativity with coding to craft visually compelling and functional digital experiences.`,
];

const educationData = [
  {
    title: "Information and Communication Technology",
    degree: "B.S.",
    school: "Silpakorn University",
    year: "2009 - 2014",
  },
];

const experiencesData = [
  {
    title: "Layout Artist",
    company: "Riff Animation Studio",
    year: "2014 - 2018",
    description:
      "Basically, I work with photo composition in animation projects. I've also started learning Python coding to create some tools for intuitive production work.",
  },
  {
    title: "Lead Layout",
    company: "Yggdrazil Group",
    year: "2018 - 2024",
    description:
      "I led the team and developed tools for the production pipeline. Additionally, I began learning web development during this period.",
  },
];

const certificatesData = [
  {
    title: "Master of Python Bootcamp",
    issuedBy: "BornToDev",
    issuedDate: "September 16, 2023",
    credentialId: "V2bpjpJEP288",
    credentialUrl: "https://school.borntodev.com/certificate/V2bpjpJEP288",
    credentialImage:
      "borntodev-acdemy_Master of Python Bootcamp_certifiacte.png",
  },
  {
    title: "Road to Frontend Developer Bootcamp",
    issuedBy: "BornToDev",
    issuedDate: "January 8, 2024",
    credentialId: "IctoTQEOez9A",
    credentialUrl: "https://school.borntodev.com/certificate/IctoTQEOez9A",
    credentialImage: "borntodev-acdemy_FEBC2_certifiacte.png",
  },
];

const projectsData = [
  {
    title: "Web Resume",
    tags: "React-JavaScript, Material UI",
    repoID: 703004313,
    image: "web-resume.jpg",
    description:
      "This website which showcasing my resume. Built with React and Material UI.",
    githublink: "https://github.com/themiddnight/themiddnight.github.io",
    publiclink: "https://themiddnight.github.io/",
    createdAt: "January 2024",
  },
  {
    title: "Basic CRUD API",
    tags: "Nest.js-Typescript, Sequelize, PostgreSQL",
    repoID: 740290066,
    image: "basic-crud.jpg",
    description: "A basic CRUD API built with Nest.js and Sequelize ORM.",
    githublink: "https://github.com/themiddnight/NestJS-Study",
    publiclink: null,
    createdAt: "January 2024",
  },
  {
    title: "Developer Online Learning",
    tags: "Next.js-Typescript, Tailwind, Prisma, MySQL",
    repoID: 734964588,
    image: "developer-online-learning.jpg",
    description:
      "A final project for the BorntoDev Front-end Bootcamp. Developed with Next.js.",
    githublink: "https://github.com/themiddnight/BorntoDev-FEBC-Final",
    publiclink: "https://ake-borntodev-febc-final.vercel.app/",
    createdAt: "December 2023",
  },
  {
    title: "Music Online Learning",
    tags: "HTML, Bootstrap",
    repoID: 749376788,
    image: "music-online-learning.jpg",
    description: "A midterm project for the BorntoDev bootcamp. Using HTML and Bootstrap.",
    githublink:
      "https://github.com/themiddnight/BorntoDev-FEBC-Homeworks/tree/main/DAY-17-Midterm",
    publiclink:
      "https://themiddnight.github.io/BorntoDev-FEBC-Homeworks/DAY-17-Midterm/index.html",
    createdAt: "October 2023",
  },
  {
    title: "Thai Random Dishes",
    tags: "HTML, CSS, JavaScript",
    repoID: 696299092,
    image: "thai-random-dish.jpg",
    description:
      "A website that generates random Thai dishes by combining predefined ingredients.",
    githublink: "https://github.com/themiddnight/Thai-Random-Dishes",
    publiclink: "https://themiddnight.github.io/Thai-Random-Dishes/",
    createdAt: "September 2023",
  },
  {
    title: "Python OOP Study",
    tags: "Python",
    repoID: 688326981,
    image: "OOP-study.jpg",
    description:
      "A CLI turn-based game project for learning the concepts of OOP in Python.",
    githublink: "https://github.com/themiddnight/Turnbase-Game-Study",
    publiclink: null,
    createdAt: "September 2023",
  },
  {
    title: "Finance Log",
    tags: "Python, Tkinter, Matplotlib, SQLite",
    repoID: 674339310,
    image: "finance-log.jpg",
    description:
      "A GUI application for logging financial data intuitively and visualizing it with Matplotlib.",
    githublink: "https://github.com/themiddnight/Finance-Log-GUI",
    publiclink: null,
    createdAt: "August 2023",
  },
  {
    title: "Layout Tools",
    tags: "Maya Python, PyMel",
    repoID: 681789766,
    image: "layout-tools.png",
    description:
      "Tools and scripts for layout/animation production in Autodesk Maya, utilizing Python 2.7.",
    githublink: "https://github.com/themiddnight/LayoutTools-for-Maya",
    publiclink: null,
    createdAt: "2019 - 2023",
  },
];

const skillsData = [
  {
    title: "HTML / CSS",
    value: 70,
    level: "Intermediate",
    description: "Capable of creating websites from scratch. Understand the semantics and responsive design.",
    icon: "html-5-svgrepo-com.svg",
    isMono: false,
  },
  {
    title: "JavaScript",
    value: 70,
    level: "Intermediate",
    description: "Proficient in managing the DOM, handling events. Familiar with asynchronous programming.",
    icon: "javascript-svgrepo-com.svg",
    isMono: false,
  },
  {
    title: "Python",
    value: 60,
    level: "Intermediate",
    description: "Experience working within CGI pipelines and projects.",
    icon: "python-svgrepo-com.svg",
    isMono: false,
  },
  {
    title: "TypeScript",
    value: 60,
    level: "Beginner",
    description: "Familiar with type systems and basic OOP principles.",
    icon: "typescript-svgrepo-com.svg",
    isMono: false,
  },
  {
    title: "SQL",
    value: 40,
    level: "Beginner",
    description: "Proficient in basic querying and understanding the concepts of procedures and transactions.",
    icon: "sql-svgrepo-com.svg",
    isMono: false,
  },
  {
    title: "Shell Script",
    value: 20,
    level: "Beginner",
    description: "Skilled in managing files and directories, as well as executing basic commands.",
    icon: "terminal-svgrepo-com.svg",
    isMono: true,
  },
];

const frameworksData_icons = [
  {
    title: "React",
    description: "Know the basic hooks.",
    icon: "react-svgrepo-com.svg",
    isMono: false,
  },
  {
    title: "Next.js",
    description: "Know the concept of SSR and the basic of route handling.",
    icon: "next-js-svgrepo-com.svg",
    isMono: true,
  },

  {
    title: "Tailwind CSS",
    description: "Can manage layouts with some complex components.",
    icon: "tailwind-svgrepo-com.svg",
    isMono: false,
  },
  {
    title: "Bootstrap",
    description: "Can manage layouts with some complex components.",
    icon: "bootstrap-svgrepo-com.svg",
    isMono: false,
  },
  {
    title: "Material UI",
    description: "Used in some projects. This website is built with MUI.",
    icon: "material-ui-svgrepo-com.svg",
    isMono: false,
  },

  {
    title: "Express",
    description:
      "Known of routing and middleware, using hash and JWT for authentication/authorization.",
    icon: "express-svgrepo-com.svg",
    isMono: true,
  },
  {
    title: "Nest.js",
    description:
      "Known the basics of modules, controllers, and services. I'm currently learning this framework.",
    icon: "nest-middleware-ts-svgrepo-com.svg",
    isMono: false,
  },

  {
    title: "Prisma",
    description: "",
    icon: "prisma-svgrepo-com.svg",
    isMono: true,
  },
  {
    title: "Sequelize",
    description: "",
    icon: "sequelize-svgrepo-com.svg",
    isMono: false,
  },

  {
    title: "Swagger",
    description: "",
    icon: "swagger-svgrepo-com.svg",
    isMono: false,
  },
  // { title: 'Passport.js', description: '', icon: 'passport-svgrepo-com.svg', isMono: false },

  {
    title: "MySQL",
    description: "",
    icon: "mysql-logo-svgrepo-com.svg",
    isMono: false,
  },
  {
    title: "PostgreSQL",
    description: "",
    icon: "postgresql-svgrepo-com.svg",
    isMono: false,
  },
  {
    title: "MongoDB",
    description: "",
    icon: "mongo-svgrepo-com.svg",
    isMono: false,
  },
  // { title: 'Firebase', description: '', icon: 'firebase-svgrepo-com.svg', isMono: false },
  // { title: 'Redis', description: '', icon: 'redis-svgrepo-com.svg', isMono: false },

  {
    title: "VS Code",
    description: "",
    icon: "vscode-svgrepo-com.svg",
    isMono: false,
  },
  {
    title: "Postman",
    description: "",
    icon: "postman-icon-svgrepo-com.svg",
    isMono: false,
  },
  {
    title: "Figma",
    description: "",
    icon: "figma-svgrepo-com.svg",
    isMono: false,
  },
  {
    title: "GitHub",
    description: "Add, commit, push, pull, and merge.",
    icon: "github-142-svgrepo-com.svg",
    isMono: true,
  },
  {
    title: "Docker",
    description: "Basic build, push, pull and run.",
    icon: "docker-svgrepo-com.svg",
    isMono: false,
  },
];

const languagesData = [
  {
    title: "Thai",
    native: true,
    read: {
      value: 100,
      level: "Native",
    },
    write: {
      value: 100,
      level: "Native",
    },
    listen: {
      value: 100,
      level: "Native",
    },
    speak: {
      value: 100,
      level: "Native",
    },
  },
  {
    title: "English",
    native: false,
    read: {
      value: 70,
      level: "Advanced",
    },
    write: {
      value: 40,
      level: "Intermediate",
    },
    listen: {
      value: 30,
      level: "Novice",
    },
    speak: {
      value: 20,
      level: "Novice",
    },
  },
];

const otherProfilesData = [
  {
    title: "HackerRank",
    url: "https://www.hackerrank.com/themiddnight",
  },
  {
    title: "FreeCodeCamp",
    url: "https://www.freecodecamp.org/middnight",
  },
  {
    title: "LeetCode",
    url: "https://leetcode.com/themiddnight/",
  },
  {
    title: "BornToDev DevLab",
    url: "https://borntodev.com/devlab/profile?user=57431",
  },
];

export {
  aboutData,
  educationData,
  experiencesData,
  certificatesData,
  projectsData,
  skillsData,
  frameworksData_icons,
  languagesData,
  otherProfilesData,
};
