export enum UserRole {
  ADMIN = 'ADMIN',
  TEC = 'TEC',
  GEN = 'GEN',
}

export const RolesMapping = {
  [UserRole.ADMIN]: 'Administrador',
  [UserRole.TEC]: 'Técnico',
  [UserRole.GEN]: 'Usuario General',
};
