
import { ReactNode } from 'react';

export interface AdminLayoutProps {
  children: ReactNode;
}

export interface NavItem {
  path: string;
  label: string;
  icon: JSX.Element;
  divider?: boolean;
}
