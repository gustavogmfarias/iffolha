type User = {
  role: string;
};

type ValidateUserPermissionsParams = {
  user: User;
  role: string;
};
export function validateUserPermissions({
  user,
  role,
}: ValidateUserPermissionsParams) {
  if (role) {
    let hasAllRoles: string;

    if (role === "ADMIN") {
      hasAllRoles = user.role;
    }

    if (!hasAllRoles) {
      return false;
    }
  }
  return true;
}
