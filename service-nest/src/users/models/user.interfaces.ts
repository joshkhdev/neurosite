export enum UserRole {
  User = 'user',
  Moderator = 'moderator',
  Admin = 'admin',
}

export const userHasAccess = (
  userRole: UserRole,
  requiredRole?: UserRole,
): boolean => {
  switch (userRole) {
    case UserRole.User:
      return requiredRole === UserRole.User;
    case UserRole.Moderator:
      return (
        requiredRole === UserRole.User || requiredRole === UserRole.Moderator
      );
    case UserRole.Admin:
      return true;
    default:
      return false;
  }
};
