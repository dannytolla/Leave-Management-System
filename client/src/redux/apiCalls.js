import axios from "axios";

const API_URL = "/api/";
// const API_URL = "http://localhost:5000/api/";

/**
 * Auth
 */

// Login User
const login = async (userId) => {
  const res = await axios.post(API_URL + "auth/login", { userId });

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

const getUser = async (userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userId}`,
    },
  };

  const res = await axios.get(API_URL + "auth/me", config);

  return res.data;
};

// Logout User
const logout = () => {
  localStorage.removeItem("user");
};

const getLeaveRequests = async (userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userId}`,
    },
  };

  const res = await axios.get(API_URL + "", config);

  return res.data;
};

const getLeave = async (userId, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userId}`,
    },
  };

  const res = await axios.get(API_URL + `${id}/`, config);

  return res.data;
};

const updateStatus = async (userId, { id, status, uId, type, leaveDays }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userId}`,
    },
  };
  const res = await axios.put(
    API_URL + `${id}/`,
    { status, uId, type, leaveDays },
    config
  );

  return res.data;
};

const createLeaveRequest = async (
  userId,
  { type, leaveDays, startDate, endDate }
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userId}`,
    },
  };
  const res = await axios.post(
    API_URL + "leave",
    { type, leaveDays, startDate, endDate },
    config
  );

  return res.data;
};

const getRequests = async (userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userId}`,
    },
  };

  const res = await axios.get(API_URL + "leave", config);

  return res.data;
};

const apiCalls = {
  login,
  logout,
  getUser,
  getLeave,
  getRequests,
  updateStatus,
  getLeaveRequests,
  createLeaveRequest,
};

export default apiCalls;
