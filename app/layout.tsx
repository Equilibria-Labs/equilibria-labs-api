import HeaderAuth from '@/components/account/header-auth';
import { ThemeSwitcher } from '@/components/account/theme-switcher';
import { Fraunces, Outfit } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { Heading } from '@/components/common/Typography';
import Header from '@/components/structure/Header';
import OceanDivider from '@/components/graphics/OceanDivider';
import GradientHeader from '@/components/structure/GradientHeader';
import SunriseHeader from '@/components/graphics/SunriseHeader';
import Body from '@/components/structure/Body';
import Footer from '@/components/structure/Footer';
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'The Sleep Lab by Equilibria Labs',
  description: 'It’s time to get your sleep on track.',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fraunces = Fraunces({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const outfit = Outfit({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='font-body' suppressHydrationWarning>
      <body className='bg-background text-foreground'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <main className='min-h-screen flex flex-col items-center'>
            <div className='flex-1 w-full flex flex-col items-center'>
              <SunriseHeader>
                <nav className='w-full flex justify-center h-16 relative z-10'>
                  <Header />
                </nav>
              </SunriseHeader>
              <Body>{children}</Body>
              <Footer />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
