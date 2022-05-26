import httpStatusCodes from "http-status-codes";

import userService from "../services/user.service";
import IController from "../types/IController";
import apiResponse from "../utilities/apiResponse";
import { generateCookie } from "../utilities/encryptionUtils";
import constants from "../constants";
import locale from "../constants/locale";
import orderService from "../services/order.service";

const login: IController = async (req, res) => {
  const user = await userService.loginUser(req.body.email, req.body.password);
  if (user) {
    const cookie = await generateUserCookie(user.id);
    apiResponse.result(res, { user, token: cookie.value }, httpStatusCodes.OK);
  } else {
    apiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      locale.INVALID_CREDENTIALS
    );
  }
};

const register: IController = async (req, res) => {
  let user;
  try {
    user = await userService.createUser(
      req.body.email,
      req.body.password,
      req.body.name
    );
  } catch (e) {
    if (e.code === constants.ErrorCodes.DUPLICATE_ENTRY) {
      apiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        locale.EMAIL_ALREADY_EXISTS
      );
      return;
    }
  }
  if (user) {
    const cookie = await generateUserCookie(user.id);
    apiResponse.result(
      res,
      { user, token: cookie.value },
      httpStatusCodes.CREATED
    );
  } else {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const self: IController = async (req, res) => {
  // Get users order for profile screen
  const orders = await orderService.list(req.user);
  req.user.orders = orders.orders;

  apiResponse.result(res, req.user, httpStatusCodes.OK);
};

const generateUserCookie = async (userId: number) => {
  return {
    key: constants.Cookie.COOKIE_USER,
    value: await generateCookie(
      constants.Cookie.KEY_USER_ID,
      userId.toString()
    ),
  };
};

export default {
  login,
  register,
  self,
};
