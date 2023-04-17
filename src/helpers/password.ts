import bcrypt from "bcryptjs";

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

export const comparePassword = (
  hashedPassword: string,
  password: string
): boolean => {
  return bcrypt.compareSync(password, hashedPassword);
};
