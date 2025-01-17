import OceanDivider from '@/components/graphics/OceanDivider';
import { PropsWithChildren } from 'react';

export default function SunriseHeader({ children }: PropsWithChildren) {
  return (
    <div
      className='w-full relative'
      style={{
        background: 'linear-gradient(to bottom, #F8D247 0%, #FF6F00 60%)',
      }}
    >
      <div
        className='absolute inset-0'
        style={{
          backgroundImage: 'url("/images/circle-gradient.svg")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '10%',
          backgroundSize: 'contain',
          opacity: 0.8,
        }}
      />
      <div className='relative z-10'>
        {children}
        <OceanDivider />
      </div>
    </div>
  );
}
