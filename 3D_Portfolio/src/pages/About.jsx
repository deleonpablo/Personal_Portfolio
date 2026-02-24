import React from 'react'

const About = () => {
  return (
    <section className="max-container">
      <h1 className="head-text">
        Hello, I'm <span className="blue-gradient_text font-semibold drop-shadow">Pablo</span>
      </h1>
      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>
          Second year, Systems and computer engineering student @Universidad de Los Andes. 
          With an immense passion for software engineering and quantum computation research. 
        </p>
      </div>
      <div className="py-10 flex flex-col">
        <h3 className="subhead-text">
          My skills </h3>
        <div className="mt-16 flex flex-wrap gap-12">

        </div>

      </div>

    </section>

  )
}

export default About;
