import HeaderAuth from '@/components/account/header-auth';
import { ThemeSwitcher } from '@/components/account/theme-switcher';
import { Pridi, Outfit } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'The Sleep Lab by Equilibria Labs',
  description: 'It’s time to get your sleep on track.',
};

const pridi = Pridi({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

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
            <div className='flex-1 w-full flex flex-col gap-20 items-center'>
              <nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
                <div className='w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm'>
                  <HeaderAuth />
                </div>
              </nav>
              <div className='flex flex-col gap-20 max-w-5xl p-5'>
                <h1 className='font-heading text-heading-lg'>
                  Your Heading Here
                </h1>
                {children}
              </div>

              <footer className='w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16'>
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
