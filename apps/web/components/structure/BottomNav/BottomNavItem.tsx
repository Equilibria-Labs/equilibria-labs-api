import { LucideIcon } from 'lucide-react';

interface BottomNavItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function BottomNavItem({
  icon: Icon,
  label,
  isActive = false,
  onClick,
}: BottomNavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 ${!isActive ? 'opacity-60' : ''} transition-opacity hover:opacity-100`}
    >
      <Icon className='w-6 h-6' />
      <span className='text-sm'>{label}</span>
    </button>
  );
}
