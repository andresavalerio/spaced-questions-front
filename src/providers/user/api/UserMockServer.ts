import { serverBaseUrl } from "config";
import { rest } from "msw";
import { LoginUserDTO, UserLoginAPIResponse, CreateUserDTO } from "../types";

const unathourized_pattern = "error";

const loginUserURL = `${serverBaseUrl}/user/login`;
const createUserURL = `${serverBaseUrl}/user`;

const loginUserHandler = rest.post(loginUserURL, async (req, res, ctx) => {
  const body = (await req.json()) as LoginUserDTO;

  const isUnathourizedUser = body.login
    .toLowerCase()
    .includes(unathourized_pattern);

  if (isUnathourizedUser) return res(ctx.delay(), ctx.status(401));

  return res(
    ctx.delay(),
    ctx.json({
      token: "token",
      user: {
        active: true,
        createdAt: new Date(),
        email: "email@gmail.com",
        fullName: "Test User",
        username: "test",
        userRole: "Free",
      },
    } as UserLoginAPIResponse)
  );
});

const createUserHandler = rest.post(createUserURL, async (req, res, ctx) => {
  const body = (await req.json()) as CreateUserDTO;

  const isDuplicatedEmail = body.email.includes("duplicate");
  const isDuplicatedUsername = body.username.includes("duplicate");

  const isDuplicatedUser = isDuplicatedEmail || isDuplicatedUsername;

  if (isDuplicatedUser) return res(ctx.status(409));

  return res(ctx.status(201));
});

export const userHandlers = [loginUserHandler, createUserHandler];
