import { AxiosError } from "axios";
import axiosInstance from "../lib/axios";
import { RegisterUserProps } from "@src/contexts/AuthContext";

export const check = async () => {
  try {
    const response = await axiosInstance.get("/auth/check");

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.message;
      const errorStatus = error.code;

      return { message: errorMessage, status: errorStatus };
    } else {
      console.log("Erro de rede:", (error as Error).message);
      return { message: "Erro de rede", status: 500 };
    }
  }
};

export const login = async (
  credentials: {
    username: string;
    password: string;
  },
  entranceMode: string
) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      credentials,
      entranceMode,
    });

    const { data: responseData } = response.data;

    return {
      status: response.status,
      user: responseData.user,
      accessToken: responseData.accessToken,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data.message;
      const errorStatus = error.response?.status;

      return { message: errorMessage, status: errorStatus };
    } else {
      console.log("Erro de rede:", (error as Error).message);
      return { message: "Erro de rede", status: 500 };
    }
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");

    return {
      message: response.data.message,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data.message;
      const errorStatus = error.response?.status;

      return { message: errorMessage, status: errorStatus };
    } else {
      console.log("Erro de rede:", (error as Error).message);
      return { message: "Erro de rede", status: 500 };
    }
  }
};

export const register = async (
  user: RegisterUserProps,
  registerMode: string
) => {
  try {
    const response = await axiosInstance.post(
      "/user",
      { user, registerMode },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return {
      status: response.status,
      message: response.data.message,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data.message;
      const errorStatus = error.response?.status;

      return { message: errorMessage, status: errorStatus };
    } else {
      console.log("Erro de rede:", (error as Error).message);
      return { message: "Erro de rede", status: 500 };
    }
  }
};

export const validateInvitation = async (token: string) => {
  const response = await axiosInstance.get("/team/invitations/validate", {
    params: {
      token,
    },
  });

  return response.data;
};

export const requestResetPassword = async (userEmail: string) => {
  return await axiosInstance.post("/users/request-reset-password", {
    userEmail,
  });
};

export const validateToken = async (token: string) => {
  try {
    const response = await axiosInstance.get("/users/validate-token", {
      params: { token },
    });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data.message;
      const errorStatus = error.response?.status;

      return { message: errorMessage, status: errorStatus };
    } else {
      console.log("Erro de rede:", (error as Error).message);
      return { message: "Erro de rede", status: 500 };
    }
  }
};

export const handleRefresh = async () => {
  const response = await axiosInstance.post("/auth/refresh");

  return response.data.data;
};
