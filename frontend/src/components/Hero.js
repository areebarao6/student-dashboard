import React from 'react';

const Hero = () => {
  return (
    <div 
      className="relative w-full h-64 md:h-80 lg:h-96 bg-cover bg-center bg-no-repeat bg-gradient-to-br from-pink-dark via-pink to-pink-light"
      style={{
        backgroundImage: 'url(/images/ubit2.png)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width:'100%'
        
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            GPA Calculator & Study Timer
          </h1>
          <p className="text-xl md:text-2xl text-white/90 drop-shadow-md">
            Track Your Academic Progress with AI-Powered Insights
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

