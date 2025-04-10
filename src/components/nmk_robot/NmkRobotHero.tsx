
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const NmkRobotHero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#111827] to-[#1A1F2C] text-white">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMyMjIiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTQgNGg1MnY1Mkg0VjR6IiBmaWxsPSIjMzMzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L2c+PC9zdmc+')] opacity-10"></div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center z-10 relative">
        <div className="max-w-4xl">
          <div className="animate-fade-in-up">
            <h5 className="text-[#9b87f5] text-xl md:text-2xl font-light mb-4 font-mono tracking-wider">
              WELCOME TO NMK ROBOTICS
            </h5>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Advanced Robotics <br />
              <span className="text-[#9b87f5]">for Modern Industry</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl">
              Automated solutions that redefine efficiency and precision in manufacturing and production environments.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <Button className="bg-[#9b87f5] hover:bg-[#8B5CF6] text-white px-8 py-7 rounded-none text-lg font-medium group transition-all duration-300">
                Explore our solutions
                <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#111827] px-8 py-7 rounded-none text-lg font-medium">
                Contact us
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#111827] to-transparent z-10"></div>
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-[#9b87f5] rounded-full filter blur-[120px] opacity-20"></div>
      <div className="absolute bottom-1/3 left-10 w-80 h-80 bg-[#8B5CF6] rounded-full filter blur-[150px] opacity-15"></div>
      
      {/* Tech Lines Animation */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="tech-lines">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-[#9b87f5]/30 to-transparent"
              style={{
                top: `${Math.random() * 100}%`,
                left: 0,
                width: '100%',
                transform: `translateX(-100%)`,
                animation: `techLineAnim ${5 + Math.random() * 10}s linear ${Math.random() * 5}s infinite`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <style>
        {`
          @keyframes techLineAnim {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </section>
  );
};

export default NmkRobotHero;
