import { AxiosError } from "axios";
import axiosInstance from "../lib/axios";
import { UserData } from "@src/contexts/UserContext";

export const check = async () => {
  try {
    const response = await axiosInstance.get("/auth/check");

    return response;
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
    const response = await axiosInstance.post(
      "/auth/login",
      {
        credentials,
        entranceMode,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      status: response.status,
      user: response.data.user,
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

export const register = async (user: UserData) => {
  try {
    const response = await axiosInstance.post(
      "/user",
      { user },
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

// export const validateToken = async (token: string) => {
//   const response = await axiosInstance.get("/users/validate-token", {
//     params: { token },
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   console.log(response);
//   return response;
// };

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
