export class UserNotAuthorizedError extends Error {
  message: string = "User Not Authorized";
}

export class UserAlreadyExistsError extends Error {
  message: string = "User Already Exists";
}

export class UserAlreadyLoggedError extends Error {
  message: string = "User Already Logged";
}

export class UserWasNotLoggedError extends Error {
  message: string = "User Was Not Logged";
}
