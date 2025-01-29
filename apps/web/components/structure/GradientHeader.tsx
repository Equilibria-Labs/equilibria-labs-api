import OceanDivider from '../../components/graphics/OceanDivider';

interface GradientHeaderProps {
  children: React.ReactNode;
}

export default function GradientHeader({ children }: GradientHeaderProps) {
  return (
    <div
      className='w-full relative'
      style={{
        background: 'linear-gradient(to bottom, #F8D247, #FF6F00)',
      }}
    >
      <div
        className='absolute inset-0'
        style={{
          backgroundImage: 'url("/images/circle-gradient.svg")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          opacity: 0.8,
        }}
      />
      <nav className='w-full flex justify-center h-16 relative z-10'>
        {children}
      </nav>
      <OceanDivider />
    </div>
  );
}
