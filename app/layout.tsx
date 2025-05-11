import './globals.css';

export const metadata = {
  title: 'Test Layout',
  description: 'Testing minimal layout',
};

import Footer from './components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}

