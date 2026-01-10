import React from 'react'
import { Link } from 'react-router-dom'

const InfoBox = ({text, link, btnText}) => (
    <div className="info-box">
     {text}
     <Link to={link}>
        {btnText}

     </Link>
     
    </div> 
 
 )


const renderContent = {
    1: (
        <div className="relative bg-white py-4 px-8 rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mx-5 overflow-hidden">
            {/* El detalle "fancy" de la bandera en la esquina */}
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
        <h1>
            <InfoBox text= "I'm currently finishing my second year, Actively engaging in personal projects and Innovative Research"
            link= "/about" 
            btnText= "Learn More!"/>
            
        </h1>
    ),
    3: (
        <h1>
            3
        </h1>
    ),
    4: (
        <h1>
            4
        </h1>
    )

}




const HomeInfo = ({currentStage}) => {
  return renderContent[currentStage] || null;
}

export default HomeInfo