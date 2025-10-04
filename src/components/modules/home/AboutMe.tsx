'use client';

import Image from 'next/image';





import { FaLinkedin  } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { FaPhoneSquareAlt } from "react-icons/fa";

import SkillSlider from './../../ui/SkillSlider';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { OrbitingCircles } from '@/components/magicui/orbiting-circles';







const AboutMe = () => {



 
  const contactItems = [
    { icon: FaLinkedin, label: "linkedin", value: "Faysal Sarker" },
    { icon: FaPhoneSquareAlt, label: "phone", value: "+880-188-457-0877" },
    { icon: IoIosMail, label: "email", value: "faysalsarker.dev@gmail.com" },
    
  ];


  return (
    <section  className="flex justify-center items-center min-h-screen text-white px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 grid-rows-3 max-w-6xl w-full">
        {/* Profile & Introduction */}
        <div 
        className="overflow-hidden row-span-3 col-span-1 p-6 rounded-xl shadow-lg flex flex-col items-center text-center fade-up">
          <Image src='/faysalsarker.png' alt="Profile Picture" width={200} height={200} className="rounded-full shadow-md" />
          <h2 className="text-2xl font-semibold mt-4">Faysal Sarker</h2>
         <div className="flex flex-col justify-start space-y-3 item-start mt-4">
          
             {contactItems.map((item, index) => (
          <div key={index} className="flex  items-center space-x-3 text-gray-400 transition duration-300 cursor-pointer">
          <item.icon className="text-xl transition group-hover:text-[#762CFA]" />
          <span className="text-sm">[{item.label}]</span>
          <span className="text-[#762CFA]">{item.value}</span>
        </div>
        ))}
          
          </div> 
       
       
          <div className="content"/>
        </div>

        {/* About Me & Skills */}
        <div className="grid gap-4 row-span-2  col-span-1 fade-up w-full ">
          <div className="glass-card overflow-hidden p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold">About Me</h3>
            <p className="text-gray-300 mt-2 text-sm">
              With years of experience in the industry, I specialize in creating scalable, user-friendly, and
              high-performance web applications.
            </p>
            <div className="content-about"/>
          </div>

          <div className="glass-card overflow-hidden p-6 rounded-xl w-full  shadow-lg ">
            <h3 className="text-xl font-semibold">Technologys i use</h3>
             <SkillSlider/>
             <div className="content"/>
          </div>
        </div>

        {/* Goal & Why Choose Me */}
        <div className="row-span-2 relative glass-card overflow-hidden col-span-1  p-6 rounded-xl shadow-lg fade-up">
          <h3 className="text-xl font-semibold">Why Choose Me?</h3>
          <p className="text-gray-300 mt-2 text-sm">
            I focus on creating elegant solutions that drive business growth. I ensure clean, maintainable code and
            seamless user experiences.
          </p>
          <div className="content"/>

    
        </div>

        {/* Achievements Section */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-3 md:grid-cols-3 gap-4">
          <div className="glass-card overflow-hidden p-6 rounded-xl shadow-lg fade-up">
            <h3 className="text-2xl font-semibold counter" data-value="67">0</h3>
            <p className="text-gray-400 text-sm">Projects Completed</p>
            <div className="content"/>
          </div>
          <div className="glass-card overflow-hidden p-6 rounded-xl shadow-lg fade-up">
            <h3 className="text-2xl font-semibold counter" data-value="3">0</h3>
            <p className="text-gray-400 text-sm">Years of Experience</p>
            <div className="content"/>
          </div>
          <div className="glass-card overflow-hidden p-6 rounded-xl shadow-lg fade-up">
             
      <NumberTicker value={450} delay={0.8}/>
            <p className="text-gray-400 text-sm">Happy Clients</p>
            <div className="content"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;