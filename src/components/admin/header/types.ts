
export interface NavLink {
  id: string;
  name: string;
  href: string;
  icon: string | null;
  parentId: string | null;
  order: number;
  isVisible: boolean;
  requiresAuth: boolean;
  isExternal: boolean;
}
