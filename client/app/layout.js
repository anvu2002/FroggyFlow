import { Open_Sans } from 'next/font/google';
import "./globals.css";
import { websiteName } from "@/config";
import RootLayout from './rootlayout.js';
import { ThemeProvider } from "@/components/theme-provider";  

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata = {
  title: websiteName,
  description: "Frog Study Buddy",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={openSans.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <RootLayout>
          {children}
        </RootLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
