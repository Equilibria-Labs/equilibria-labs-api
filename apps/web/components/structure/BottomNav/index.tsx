'use client';

import { usePathname, useRouter } from 'next/navigation';
import BottomNav from './BottomNav';
import { mainNavConfig } from '@/config/navigation';

export default function BottomNavContainer() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = mainNavConfig.map(item => ({
    icon: item.icon,
    label: item.label,
    isActive: pathname === item.path,
    onClick: () => router.push(item.path),
  }));

  return <BottomNav items={navItems} />;
}
