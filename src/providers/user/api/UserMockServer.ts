import { rest } from "msw";
import { buildEndpointPath } from "helpers/api";
import { LoginUserDTO, UserLoginAPIResponse, CreateUserDTO } from "../types";

const unathourized_pattern = "error";
const notfound_pattern = "notfound";

const loginUserEndpoint = buildEndpointPath("/user/login");

const baseUserEndpoint = buildEndpointPath("/user");

const loginUserHandler = rest.post(loginUserEndpoint, async (req, res, ctx) => {
  const body = (await req.json()) as LoginUserDTO;

  const isUnathourizedUser = body.login
    .toLowerCase()
    .includes(unathourized_pattern);

  if (isUnathourizedUser) return res(ctx.delay(), ctx.status(401));

  const isUserNotFound = body.login.toLowerCase().includes(notfound_pattern);

  if (isUserNotFound) return res(ctx.delay(), ctx.status(409));

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

const createUserHandler = rest.post(baseUserEndpoint, async (req, res, ctx) => {
  const body = (await req.json()) as CreateUserDTO;

  const isDuplicatedEmail = body.email.includes("duplicate");
  const isDuplicatedUsername = body.username.includes("duplicate");

  const isDuplicatedUser = isDuplicatedEmail || isDuplicatedUsername;

  if (isDuplicatedUser) return res(ctx.status(409));

  return res(ctx.status(201));
});

const getUserHandler = rest.get(baseUserEndpoint, async (req, res, ctx) => {
  const hasAuthorization = !!req.headers.get("authorization");

  if (!hasAuthorization) return res(ctx.status(400));

  return res(
    ctx.status(200),
    ctx.json({
      active: true,
      createdAt: new Date(),
      email: "email@gmail.com",
      fullName: "Test User",
      username: "test",
      userRole: "Free",
    })
  );
});

export const userHandlers = [
  loginUserHandler,
  createUserHandler,
  getUserHandler,
];
