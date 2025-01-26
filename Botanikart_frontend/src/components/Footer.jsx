import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto bg-gradient-to-b from-tan to-light-green text-dark-green">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center py-6 space-y-4">
          <div className="text-lg font-semibold">
            Made with 🌱 by Abdelouahed Akharaze
          </div>
          <div className="text-sm">
            Copyright &copy; {new Date().getFullYear()} BotaniKart
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
