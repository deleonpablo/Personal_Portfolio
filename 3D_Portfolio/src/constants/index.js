import { Neuroscience, Uniandes, flagLabN } from "../assets/images";
import {
    react,
    contact,
    estate,
    git,
    github,
    linkedin,
    python,
    java,
    sql,
    qiskit,
    apex,
    latex, 
    pandas,
    matlab,
    logoParq,
    sudoku,
    loreal

} from "../assets/icons";

export const skills = [
    {
        imageUrl: python,
        name: "Python",
        type: "Backend",
    },
    {
        imageUrl: java,
        name: "Java",
        type: "Backend",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: sql,
        name: "SQL",
        type: "Database",
    },
    {
        imageUrl: qiskit,
        name: "Qiskit",
        type: "Quantum algorithms",
    },
    {
        imageUrl: apex,
        name: "Oracle Apex",
        type: "Database",
    },
    {
        imageUrl: latex,
        name: "LaTeX",
        type: "Document Formatting",
    },
    {
        imageUrl: pandas,
        name: "Pandas",
        type: "Data Analysis",
    },
    {
        imageUrl: matlab,
        name: "MATLAB",
        type: "Scientific Computing",
    }
];

export const experiences = [
    {
        title: "Quantum Computing Research",
        company_name: "FLAG LAB",
        icon: flagLabN,
        iconBg: "#040821",
        date: "June 2025 - Present",
        points: [
            "Worked with the university's newly acquired quantum computing hardware and software.",
            "Directly implemented quantum algorithms and protocols on the quantum computer, gaining hands-on experience with quantum programming languages and frameworks.",
            "Documented our process in a poster and a paper, which we presented at the Colombian annual congress of Mathematics.",
            
        ],
    },
    {
        title: "Teacher Assistant",
        company_name: "Universidad de Los Andes",
        icon: Uniandes,
        iconBg: "#fffa5c",
        date: "Aug 2025 - Present",
        points: [
            "Teacher Assistant for the course 'Discrete Mathematics for Computer Science', where I assist students in understanding complex mathematical concepts and problem-solving techniques.",
            "Facilitated weekly review sessions for 6 or more students, tailoring instructions to improve academic performance and mastery of complex mathematical concepts.",
            "Developed custom teaching materials and exercises to enhance student learning using Overleaf and Latex markup language.",  
        ],
    },
    {
        title: "Data analyst for Neuroscience Research",
        company_name: "Partnered with Dr. Guillen Burgos.",
        icon: Neuroscience,
        iconBg: "#7cd6cd",
        date: "Feb 2026 - Present.",
        points: [
            "Partnered as a Data Analyst, with PhD in Neuroscience, Dr. Guillen Burgos, to analyze and interpret complex datasets related to neuroscience research.",
            "Worked developing and implementing data analysis pipelines, utilizing tools such as Python, MATLAB, and statistical software to extract meaningful insights from experimental data.",
            "Contributed to the preparation of research findings for publication, including the creation of visualizations and the drafting of papers for submission to scientific journals.",
        ],
    },

];


export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/YourGitHubUsername',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/YourLinkedInUsername',
    }
];

export const projects = [
    {
        iconUrl: logoParq,
        theme: 'btn-back-yellow',
        name: 'Parqueame',
        description: 'Developed a Mobile web application A mobile application designed to simplify your parking experience. Parqueame uses real-time data from ESP-32 microcontrollers to locate available parking spots near you, all based on your specific vehicle type and preferences.',
        link: 'https://github.com/deleonpablo/Parqueame',
    },
    {
        iconUrl: react,
        theme: 'btn-back-red',
        name: '3D Portfolio',
        description: 'Created a 3D portfolio website using React and Three.js, showcasing my projects and skills in an interactive and visually appealing way.',
        link: 'https://github.com/deleonpablo/Personal_Portfolio',
    },
    {
        iconUrl: sudoku,
        theme: 'btn-back-blue',
        name: 'COMING SOON... AI AGENT SUDOKU PUZZLE HELPER',
        description: 'As a sudoku puzzle enthusiast, my next project will be to develop a a sudoku puzzle helper using genetic algorithms and machine learning techniques to assist users in solving sudoku puzzles of varying difficulty levels.',
        link: 'https://github.com/deleonpablo/EzDoku',
    },
    {
        iconUrl: loreal,
        theme: 'btn-back-pink',
        name: 'COMMING SOON... LOREAL Brandstorm URSENSE project',
        description: 'coming soon... ',
        link: 'https://brandstorm.loreal.com/en',
    },


];
