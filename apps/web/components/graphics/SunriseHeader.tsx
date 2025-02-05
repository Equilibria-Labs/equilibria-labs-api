import OceanDivider from '../graphics/OceanDivider';
import { PropsWithChildren } from 'react';

export default function SunriseHeader({ children }: PropsWithChildren) {
  return (
    <>
      <div
        className='w-full relative h-[theme(spacing.headerHeightMobile)] md:h-[theme(spacing.headerHeightDesktop)]'
        style={{
          background: 'linear-gradient(to bottom, #F8D247 0%, #FF6F00 60%)',
        }}
      >
        <div
          className='absolute inset-0 flex items-center justify-center'
          style={{
            backgroundImage: 'url("/images/circle-gradient.svg")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center calc(100% + 30px)',
            backgroundSize: '80px 80px',
            opacity: 0.8,
          }}
        />
        <div>{children}</div>
      </div>
      <OceanDivider />
    </>
  );
}
