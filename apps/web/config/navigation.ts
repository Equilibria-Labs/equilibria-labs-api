import { Sun, Book, Grid, User } from 'lucide-react';
import { NavConfigItem } from '@/types/navigation';

export const mainNavConfig: NavConfigItem[] = [
  {
    icon: Sun,
    label: 'Today',
    path: '/',
  },
  {
    icon: Book,
    label: 'Library',
    path: '/resources',
  },
  {
    icon: Grid,
    label: 'Easy Wins',
    path: '/easy-wins',
  },
  {
    icon: User,
    label: 'You',
    path: '/you',
  },
];
