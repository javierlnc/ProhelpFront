export enum UserRole {
    ADMIN = 'ADMIN',
    TEC = 'TEC',
    GEN = 'GEN',
  }
  
  export const rolesMapping = {
    [UserRole.ADMIN]: 'Administrador',
    [UserRole.TEC]: 'Técnico',
    [UserRole.GEN]: 'Usuario General',
  };