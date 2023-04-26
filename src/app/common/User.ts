interface User {
  id: number,
  username: string,
  password: string,
  role: UserRole,
  authenticated: boolean,
}

enum UserRole {
  GUEST = 1,
  REGULAR,
  MODERATOR,
  ADMIN,
}

const GUEST_USER: User = {
  id: 0,
  username: "GUEST",
  password: "",
  role: UserRole.GUEST,
  authenticated: true
}

export {User, UserRole, GUEST_USER}
