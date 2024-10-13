import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header>
        <h1>BotaniKart</h1>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>&copy; 2023 BotaniKart</p>
      </footer>
    </div>
  );
};

export default Layout;