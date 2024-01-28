const experiencesData = [
  {
    title: "Layout Artist",
    company: "Riff Animation Studio",
    year: "2013 - 2017",
    description: "Working with photo composition in the animation works. And I started to work as Technical Director, which working with Python coding to make the production flows.",
  },
  {
    title: "Lead Layout",
    company: "Yggdrazil Group",
    year: "2017 - 2023",
    description: "Working with photo composition in the animation works. And I started to work as Technical Director, which working with Python coding to make the production flows.",
  },
];

const certificatesData = [
  {
    title: "Master of Python Bootcamp",
    issuedBy: "BornToDev",
    issuedDate: "Sep 16, 2023",
    credentialId: "V2bpjpJEP288",
    credentialUrl:
      "https://school.borntodev.com/certificate/V2bpjpJEP288",
    credentialImage: "borntodev-acdemy_Master of Python Bootcamp_certifiacte.png",
  },
  {
    title: "Road to Frontend Developer Bootcamp",
    issuedBy: "BornToDev",
    issuedDate: "Jan 8, 2024",
    credentialId: "IctoTQEOez9A",
    credentialUrl:
      "https://school.borntodev.com/certificate/IctoTQEOez9A",
    credentialImage: "borntodev-acdemy_FEBC2_certifiacte.png",
  },
];

const projectsData = [
  {
    title: "Web Resume",
    tags: "React.js, Material UI",
    description: "This is project 3 aaaasdfkljal;shdlg;kjasl adjkfhal;k sjdglha;s djf;lasd h;lgakjasdf ",
    image: "web-resume.jpg",
    githublink: "https://github.com/themiddnight/themiddnight.github.io",
    publiclink: "https://themiddnight.github.io/",
    createdAt: "January 2024",
  },
  {
    title: "Basic CRUD API",
    tags: "Nest.js, Sequelize, PostgreSQL, Swagger",
    description: "This is project 4",
    image: "basic-crud.jpg",
    githublink: "https://github.com/themiddnight/NestJS-Study",
    publiclink: null,
    createdAt: "January 2024",
  },
  {
    title: "Developer Online Learning",
    tags: "Next.js, Tailwind, Prisma, MySQL",
    description: "This is project 3",
    image: "developer-online-learning.webp",
    githublink: "https://github.com/themiddnight/BorntoDev-FEBC-Final",
    publiclink: "https://ake-borntodev-febc-final.vercel.app/",
    createdAt: "December 2023",
  },
  {
    title: "Music Online Learning",
    tags: "HTML, Bootstrap, JavaScript",
    description: "This is project 2",
    image: "music-online-learning.jpg",
    githublink: "https://github.com/themiddnight/BorntoDev-FEBC-Homeworks/tree/main/DAY-17-Midterm",
    publiclink: "https://themiddnight.github.io/BorntoDev-FEBC-Homeworks/DAY-17-Midterm/index.html",
    createdAt: "October 2023",
  },
  {
    title: "Thai-Random-Dishes",
    tags: "HTML, CSS, JavaScript",
    description: "This is project 1",
    image: "thai-random-dish.jpg",
    githublink: "https://github.com/themiddnight/Thai-Random-Dishes",
    publiclink: "https://themiddnight.github.io/Thai-Random-Dishes/",
    createdAt: "September 2023",
  },
  {
    title: "OOP Study",
    tags: "Python",
    description: "This is project 5",
    image: "OOP-study.webp",
    githublink: "https://github.com/themiddnight/Turnbase-Game-Study",
    publiclink: null,
    createdAt: "September 2023",
  },
  {
    title: "Finance Log",
    tags: "Python, Tkinter, Matplotlib, SQLite",
    description: "This is project 5",
    image: "finance-log.jpg",
    githublink: "https://github.com/themiddnight/Finance-Log-GUI",
    publiclink: null,
    createdAt: "August 2023",
  },
  {
    title: "Layout Tools",
    tags: "Maya Python, PyMel",
    description: "This is project 5",
    image: "layout-tools.png",
    githublink: "https://github.com/themiddnight/LayoutTools-for-Maya",
    publiclink: null,
    createdAt: "2019 - 2023",
  },
];

const skillsData = [
  {
    title: "HTML/CSS",
    value: 70,
    level: "Advanced",
    description: "Can create a website from scratch",
    icon: "html-5-svgrepo-com.svg",
    isMono: false,
  },
  {
    title: "JavaScript",
    value: 70,
    level: "Intermediate",
    description: "Can create some complex dynamic websites",
    icon: "javascript-svgrepo-com.svg",
    isMono: false,
  },
  {
    title: "TypeScript",
    value: 60,
    level: "Intermediate",
    description: "Known the concept of OOP, types and interfaces",
    icon: "typescript-svgrepo-com.svg",
    isMono: false,
  },
  {
    title: "Python",
    value: 60,
    level: "Intermediate",
    description: "Used to work in CGI pipeline and project",
    icon: "python-svgrepo-com.svg",
    isMono: false,
  },
  {
    title: "SQL",
    value: 40,
    level: "Beginner",
    description: "Querying with basic joins and aggregate functions",
    icon: "sql-svgrepo-com.svg",
    isMono: false,
  },
  {
    title: "Shell Script",
    value: 20,
    level: "Beginner",
    description: "Can manage files and directories, and run some basic commands",
    icon: "terminal-svgrepo-com.svg",
    isMono: true,
  },
];

const frameworksData = [
  {
    title: "Bootstrap/Tailwind",
    value: 70,
    level: "Advanced",
    description: "Can manage layouts with some complex components",
    icon: "tailwind-svgrepo-com.svg",
    isMono: false,
  },
  {
    title: "React.js",
    value: 60,
    level: "Intermediate",
    description: "Know how to use hooks and context API",
    icon: "react-svgrepo-com.svg",
    isMono: false,
  },
  {
    title: "Next.js/NextUI",
    value: 50,
    level: "Intermediate",
    description: "Know basic concepts of SSR/SSG, route handling, and API routes",
    icon: "next-js-svgrepo-com.svg",
    isMono: true,
  },
  {
    title: "Material UI",
    value: 50,
    level: "Intermediate",
    description: "Used in some projects. This website is built with MUI",
    icon: "material-ui-svgrepo-com.svg",
    isMono: false,
  },
  {
    title: "Express.js",
    value: 50,
    level: "Intermediate",
    description: "Known the basic of routing and middleware",
    icon: "express-svgrepo-com.svg",
    isMono: true,
  },
  {
    title: "Nest.js",
    value: 45,
    level: "Beginner",
    description: "Known the basic of mudules, controllers, and services. I'm currently learning this framework",
    icon: "nest-middleware-ts-svgrepo-com.svg",
    isMono: false,
  },
  {
    title: "Git/Github",
    value: 40,
    level: "Beginner",
    description: "Add, commit, push, pull, and merge.",
    icon: "github-142-svgrepo-com.svg",
    isMono: true,
  },
];

const languagesData = [
  {
    title: "Thai",
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

export {
  experiencesData,
  certificatesData,
  projectsData,
  skillsData,
  frameworksData,
  languagesData,
};