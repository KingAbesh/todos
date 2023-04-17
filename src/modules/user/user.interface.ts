export interface RegisterDTO {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface meDTO {
  userId: number;
}

export interface meResponseDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
