import { Sun, Book, Grid, User } from 'lucide-react';

export type NavIcon = typeof Sun | typeof Book | typeof Grid | typeof User;

export type NavConfigItem = {
  icon: NavIcon;
  label: string;
  path: string;
  onClick?: () => void;
};
