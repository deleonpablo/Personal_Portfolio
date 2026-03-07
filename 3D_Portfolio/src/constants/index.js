import { Neuroscience, Uniandes, flagLabN } from "../assets/images";
import {
    car,
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
        iconUrl: github,
        theme: 'btn-back-yellow',
        name: 'Parqueame',
        description: 'Developed a web application that tracks and notifies users of price changes for products on Amazon, helping users find the best deals.',
        link: 'https://github.com/adrianhajdin/pricewise',
    },
    {
        iconUrl: github,
        theme: 'btn-back-green',
        name: 'Full Stack Threads Clone',
        description: 'Created a full-stack replica of the popular discussion platform "Threads," enabling users to post and engage in threaded conversations.',
        link: 'https://github.com/adrianhajdin/threads',
    },
    {
        iconUrl: github,
        theme: 'btn-back-blue',
        name: 'Car Finding App',
        description: 'Designed and built a mobile app for finding and comparing cars on the market, streamlining the car-buying process.',
        link: 'https://github.com/adrianhajdin/project_next13_car_showcase',
    },
    {
        iconUrl: github,
        theme: 'btn-back-pink',
        name: 'Full Stack Instagram Clone',
        description: 'Built a complete clone of Instagram, allowing users to share photos and connect with friends in a familiar social media environment.',
        link: 'https://github.com/adrianhajdin/social_media_app',
    },


];
