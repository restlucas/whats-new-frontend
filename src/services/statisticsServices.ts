import axiosInstance from "@src/lib/axios";

export const fetchStatistics = async (teamId: string, type: string) => {
  try {
    const params = { type };

    const response = await axiosInstance.get(`/team/${teamId}/statistics`, {
      params,
    });

    const { data } = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw new Error("Failed to fetch statistics");
  }
};

export const fetchLastNewsAndTopMembers = async (teamId: string) => {
  try {
    const response = await axiosInstance.get(`/team/${teamId}/news/members`);

    const { data } = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw new Error("Failed to fetch statistics");
  }
};
