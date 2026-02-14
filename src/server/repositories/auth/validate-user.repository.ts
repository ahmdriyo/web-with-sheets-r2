import { findUserAdminByUsername } from "../user-admin/find-by-username-user-admin";

export async function validateUserCredentials(
  username: string,
  password: string,
) {
  const user = await findUserAdminByUsername(username);

  if (!user || user.password !== password) {
    return null;
  }

  return {
    name: user.name,
    username: user.username,
  };
}
