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
    issuedDate: "September 16, 2023",
    credentialId: "V2bpjpJEP288",
    credentialUrl:
      "https://school.borntodev.com/certificate/V2bpjpJEP288",
    credentialImage: "borntodev-acdemy_Master of Python Bootcamp_certifiacte.png",
  },
  {
    title: "Road to Frontend Developer Bootcamp",
    issuedBy: "BornToDev",
    issuedDate: "January 8, 2024",
    credentialId: "IctoTQEOez9A",
    credentialUrl:
      "https://school.borntodev.com/certificate/IctoTQEOez9A",
    credentialImage: "borntodev-acdemy_FEBC2_certifiacte.png",
  },
];

const projectsData = [
  {
    title: "Web Resume",
    tags: "React.js-JavaScript, Material UI",
    repoID: 703004313,
    image: "web-resume.jpg",
    description: "A website that shows my resume and projects. Built with React.js and Material UI",
    githublink: "https://github.com/themiddnight/themiddnight.github.io",
    publiclink: "https://themiddnight.github.io/",
    createdAt: "January 2024",
  },
  {
    title: "Basic CRUD API",
    tags: "Nest.js-Typescript, Sequelize, PostgreSQL",
    repoID: 740290066,
    image: "basic-crud.jpg",
    description: "A basic CRUD API with Nest.js and Sequelize ORM.",
    githublink: "https://github.com/themiddnight/NestJS-Study",
    publiclink: null,
    createdAt: "January 2024",
  },
  {
    title: "Developer Online Learning",
    tags: "Next.js-Typescript, Tailwind, Prisma, MySQL",
    repoID: 734964588,
    image: "developer-online-learning.webp",
    description: "A final project for BorntoDev Front-end Bootcamp. Built with Next.js, NextUI, Prisma ORM",
    githublink: "https://github.com/themiddnight/BorntoDev-FEBC-Final",
    publiclink: "https://ake-borntodev-febc-final.vercel.app/",
    createdAt: "December 2023",
  },
  {
    title: "Music Online Learning",
    tags: "HTML, Bootstrap",
    repoID: 749376788,
    image: "music-online-learning.jpg",
    description: "A midterm project for BorntoDev bootcamp homework",
    githublink: "https://github.com/themiddnight/BorntoDev-FEBC-Homeworks/tree/main/DAY-17-Midterm",
    publiclink: "https://themiddnight.github.io/BorntoDev-FEBC-Homeworks/DAY-17-Midterm/index.html",
    createdAt: "October 2023",
  },
  {
    title: "Thai Random Dish",
    tags: "HTML, CSS, JavaScript",
    repoID: 696299092,
    image: "thai-random-dish.jpg",
    description: "A website that shows random Thai dishes by mixing the pre-defined ingredients.",
    githublink: "https://github.com/themiddnight/Thai-Random-Dishes",
    publiclink: "https://themiddnight.github.io/Thai-Random-Dishes/",
    createdAt: "September 2023",
  },
  {
    title: "OOP Study",
    tags: "Python",
    repoID: 688326981,
    image: "OOP-study.webp",
    description: "A turn-based game project for learning about concept of OOP in Python.",
    githublink: "https://github.com/themiddnight/Turnbase-Game-Study",
    publiclink: null,
    createdAt: "September 2023",
  },
  {
    title: "Finance Log",
    tags: "Python, Tkinter, Matplotlib, SQLite",
    repoID: 674339310,
    image: "finance-log.jpg",
    description: "A GUI application for logging finance data in intutive way and visualize the data with Matplotlib.",
    githublink: "https://github.com/themiddnight/Finance-Log-GUI",
    publiclink: null,
    createdAt: "August 2023",
  },
  {
    title: "Layout Tools",
    tags: "Maya Python, PyMel",
    repoID: 681789766,
    image: "layout-tools.png",
    description: "Tools and scripts for layout/animation production in Autodesk Maya. Uses Python 2.7",
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

const frameworksData_icons = [
  { title: 'React', description: 'Know the basic hooks', icon: 'react-svgrepo-com.svg', isMono: false },
  { title: 'Next.js', description: 'Know the concept of SSR and the basic of route handling', icon: 'next-js-svgrepo-com.svg', isMono: true },

  { title: 'Tailwind CSS', description: 'Can manage layouts with some complex components', icon: 'tailwind-svgrepo-com.svg', isMono: false },
  { title: 'Bootstrap', description: 'Can manage layouts with some complex components', icon: 'bootstrap-svgrepo-com.svg', isMono: false },
  { title: 'Material UI', description: 'Used in some projects. This website is built with MUI', icon: 'material-ui-svgrepo-com.svg', isMono: false },
  
  { title: 'Express', description: 'Known of routing and middleware, using hash and JWT for authentication/authorization', icon: 'express-svgrepo-com.svg', isMono: true },
  { title: 'Nest.js', description: 'Known the basic of mudules, controllers, and services. I\'m currently learning this framework', icon: 'nest-middleware-ts-svgrepo-com.svg', isMono: false },
  
  { title: 'Prisma', description: '', icon: 'prisma-svgrepo-com.svg', isMono: true },
  { title: 'Sequelize', description: '', icon: 'sequelize-svgrepo-com.svg', isMono: false },

  { title: 'Swagger', description: '', icon: 'swagger-svgrepo-com.svg', isMono: false },
  // { title: 'Passport.js', description: '', icon: 'passport-svgrepo-com.svg', isMono: false },

  { title: 'MySQL', description: '', icon: 'mysql-logo-svgrepo-com.svg', isMono: false },
  { title: 'PostgreSQL', description: '', icon: 'postgresql-svgrepo-com.svg', isMono: false },
  { title: 'MongoDB', description: '', icon: 'mongo-svgrepo-com.svg', isMono: false },
  // { title: 'Firebase', description: '', icon: 'firebase-svgrepo-com.svg', isMono: false },
  // { title: 'Redis', description: '', icon: 'redis-svgrepo-com.svg', isMono: false },
  
  { title: 'VS Code', description: '', icon: 'vscode-svgrepo-com.svg', isMono: false },
  { title: 'Postman', description: '', icon: 'postman-icon-svgrepo-com.svg', isMono: false },
  { title: 'Figma', description: '', icon: 'figma-svgrepo-com.svg', isMono: false },
  { title: 'GitHub', description: 'Add, commit, push, pull, and merge.', icon: 'github-142-svgrepo-com.svg', isMono: true },
  // { title: 'Docker', description: '', icon: 'docker-svgrepo-com.svg', isMono: false },
]

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
  frameworksData_icons,
  languagesData,
};