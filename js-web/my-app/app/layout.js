import './globals.css';

export const metadata = {
  title: 'SafeNET',
  description: 'Child safety monitoring dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
