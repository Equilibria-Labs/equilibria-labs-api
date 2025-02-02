import { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import BottomNavItem from './BottomNavItem';

interface NavItem {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

interface BottomNavProps {
  items: NavItem[];
  initialActiveLabel?: string;
}

export default function BottomNav({
  items,
  initialActiveLabel,
}: BottomNavProps) {
  const [activeLabel, setActiveLabel] = useState(
    initialActiveLabel || items[0]?.label
  );

  return (
    <nav className='fixed bottom-0 left-0 right-0 bg-foreground text-background'>
      <div className='flex justify-around items-center p-4'>
        {items.map(item => (
          <BottomNavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            isActive={activeLabel === item.label}
            onClick={() => {
              setActiveLabel(item.label);
              item.onClick();
            }}
          />
        ))}
      </div>
    </nav>
  );
}
