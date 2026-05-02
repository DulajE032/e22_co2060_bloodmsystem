import api from "../api/api";

export const getAdminDashboardStats = async () => {
  try {
    const response = await api.get("adminDashboard/stats/");
    return response.data;
  } catch (error) {
    console.error("Error fetching admin dashboard stats:", error);
    throw error;
  }
};

export const getAdminDonors = async () => {
  try {
    const response = await api.get("adminDashboard/donors/");
    return response.data;
  } catch (error) {
    console.error("Error fetching admin donors:", error);
    throw error;
  }
};

export const getAdminCamps = async () => {
  try {
    const response = await api.get("adminDashboard/camps/");
    return response.data;
  } catch (error) {
    console.error("Error fetching admin camps:", error);
    throw error;
  }
};
