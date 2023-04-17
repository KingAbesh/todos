import { LoginDTO, RegisterDTO, meDTO, meResponseDTO } from "./user.interface";
import models from "../../db/models";
import { GeneralResponseDTO } from "@constants/interfaces";
import { comparePassword } from "@helpers/password";
import { jwtSign } from "@helpers/jwt";

const { User } = models;

export const register = async (
  data: RegisterDTO
): Promise<GeneralResponseDTO<{ id: number } | null>> => {
  try {
    const isExistingUser: typeof User = await User.findOne({
      where: { email: data.email },
      raw: true,
    });

    if (isExistingUser) {
      throw new Error("User with specified credentials exists");
    }

    const createdUser: typeof User = await User.create(data);

    return {
      error: false,
      message: "Registration successful",
      data: {
        id: createdUser?.id,
      },
    };
  } catch (err: any) {
    return {
      error: true,
      message: err?.message,
      data: null,
    };
  }
};

export const login = async (
  data: LoginDTO
): Promise<GeneralResponseDTO<{ id: number; accessToken: string } | null>> => {
  try {
    const isExistingUser: typeof User = await User.findOne({
      where: { email: data.email },
      raw: true,
    });

    if (!isExistingUser) {
      throw new Error("Invalid credentials");
    }

    if (!comparePassword(isExistingUser.password, data.password)) {
      throw new Error("Invalid credentials");
    }

    const accessToken = jwtSign(isExistingUser.id);

    return {
      error: false,
      message: "Login successful",
      data: {
        id: isExistingUser.id,
        accessToken,
      },
    };
  } catch (err: any) {
    return {
      error: true,
      message: err?.message,
      data: null,
    };
  }
};

export const me = async (
  data: meDTO
): Promise<GeneralResponseDTO<meResponseDTO | null>> => {
  try {
    const user = await User.findByPk(data.userId, { raw: true });

    return {
      error: false,
      message: "User profile fetched successfully",
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    };
  } catch (err: any) {
    return {
      error: true,
      message: err?.message,
      data: null,
    };
  }
};
