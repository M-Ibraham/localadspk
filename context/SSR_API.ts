import axiosInstance from "@/lib/axiosInstence";

export const getUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const login = async (payload: any) => {
  try {
    const res = await axiosInstance.post("/auth/login", payload);
    return {
      status: "success",
      data: res.data,
    };
  } catch (err: any) {
    if (err.response) {
      return {
        status: "error",
        message: err.response.data.message || "Server Error",
      };
    } else if (err.request) {
      return { status: "error", message: "No response from server" };
    } else {
      return { status: "error", message: err.message };
    }
  }
};

export const register = async (payload: any) => {
  try {
    const res = await axiosInstance.post("/auth/register", payload);
    return {
      status: "success",
      message: "User Register Successfully",
      data: res.data,
    };
  } catch (err: any) {
    if (err.response) {
      // console.log("Server Error:", err.response.data); // this is usually your API message
      return {
        status: "error",
        message: err.response.data.message || "Server Error",
      };
    } else if (err.request) {
      return { status: "error", message: "No response from server" };
    } else {
      return { status: "error", message: err.message };
    }
  }
};
