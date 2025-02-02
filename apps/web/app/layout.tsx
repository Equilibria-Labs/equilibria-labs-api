import { Fraunces, Outfit } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import Header from '@/components/structure/Header';
import SunriseHeader from '@/components/graphics/SunriseHeader';
import Body from '@/components/structure/Body';
import BottomNav from '@/components/structure/BottomNav';
import { Inter, Roboto } from 'next/font/google';
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'The Sleep Lab by Equilibria Labs',
  description: "It's time to get your sleep on track.",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fraunces = Fraunces({
  display: 'swap',
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-fraunces',
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const outfit = Outfit({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-outfit',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${fraunces.variable} ${outfit.variable} font-body`}
      suppressHydrationWarning
    >
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
                <Header />
              </SunriseHeader>
              <Body>{children}</Body>
              <BottomNav />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
