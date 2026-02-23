import React from 'react'
import { Link } from 'react-router-dom'

// Componente InfoBox estilizado con el estilo "Fancy" de la bandera
const InfoBox = ({ text, link, btnText }) => (
    <div className="relative bg-white py-6 px-8 rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mx-5 overflow-hidden flex flex-col items-center">
        {/* Detalle de la bandera de Colombia en el borde superior */}
        <div className="absolute top-0 left-0 w-full h-1.5 flex">
            <div className="h-full w-[50%] bg-[#FCD116]" />
            <div className="h-full w-[25%] bg-[#003893]" />
            <div className="h-full w-[25%] bg-[#CE1126]" />
        </div>

        {/* Texto informativo */}
        <p className='font-medium sm:text-lg text-center text-slate-700 mb-4'>
            {text}
        </p>

        {/* Botón Neo-brutalista interactivo */}
        <Link 
            to={link} 
            className='bg-white border-2 border-black py-2 px-6 rounded-lg font-bold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-50 active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center gap-2 text-center'
        >
            {btnText}
            <span className="text-xl">→</span>
        </Link>
    </div> 
)

const renderContent = {
    1: (
        <div className="relative bg-white py-4 px-8 rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mx-5 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 flex">
                <div className="h-full w-[50%] bg-[#FCD116]" />
                <div className="h-full w-[25%] bg-[#003893]" />
                <div className="h-full w-[25%] bg-[#CE1126]" />
            </div>

            <h1 className='sm:text-xl sm:leading-snug text-center text-slate-800'>
                Hi, I'm <span className="font-bold text-black">Pablo</span> 🇨🇴
                <br/>
                <span className="text-slate-600 text-base">Systems and Computer Engineering Student <br/>
                from Colombia.</span>
            </h1>
        </div>
    ),
    2: (
        <InfoBox 
            text="I'm currently finishing my second year, actively engaging 
            in personal projects and innovative research."
            link="/about" 
            btnText="Learn More!"
        />
    ),
    3: (
        <InfoBox 
            text="Looking forward to keep accomplishing more projects. Want to check out the ones fulfilled?" 
            link="/projects"
            btnText="Visit my Projects"
        />
    ),
    4: (
        <InfoBox 
            text="Want to collaborate or keep in touch? I'm only a few keystrokes away."
            link="/contact"
            btnText="Let's Talk!"
        />
    )
}

const HomeInfo = ({ currentStage }) => {
    return (
        /* Cambiamos 'top-28' por 'top-10' o 'top-16' para subirlo más */
        <div className="absolute top-12 left-0 right-0 z-10 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto">
                {renderContent[currentStage] || null}
            </div>
        </div>
    );
}

export default HomeInfo