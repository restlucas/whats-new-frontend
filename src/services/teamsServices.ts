import axios from "axios";
import axiosInstance from "../lib/axios";

export const createTeam = async (userId: string, teamName: string) => {
  try {
    const response = await axiosInstance.post(`/team`, {
      userId,
      teamName,
    });

    return response.data;
  } catch (error) {
    console.log("Error on create new team: ", error);
    throw new Error("Failed to create new team");
  }
};

export const fetchTeams = async () => {
  try {
    const response = await axiosInstance.get("/teams");
    return response.data;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw new Error("Failed to fetch teams");
  }
};

export const fetchTeamsByUser = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/team/${userId}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw new Error("Failed to fetch teams");
  }
};

export const fetchMembers = async (teamId: string) => {
  try {
    const response = await axiosInstance.get(`/team/${teamId}/members`);
    return response.data;
  } catch (error) {
    console.log("Error on fetching team members: ", error);
    throw new Error("Failed to fetch members");
  }
};

export const updateMemberRole = async (
  teamId: string,
  userId: string,
  roleValue: string
) => {
  try {
    const response = await axiosInstance.put(`/team/${teamId}/member/role`, {
      userId,
      roleValue,
    });
    return response.data;
  } catch (error) {
    console.log("Error on updating member role: ", error);
    throw new Error("Failed to update member role");
  }
};

export const getMemberInvitations = async (teamId: string) => {
  try {
    const response = await axiosInstance.get(
      `/team/${teamId}/invitations/members`
    );

    return response.data;
  } catch (error) {
    console.log("Error on get member Invitations: ", error);
    throw new Error("Failed to get member Invitations");
  }
};

export const getTeamInvitations = async (userEmail: string) => {
  try {
    const response = await axiosInstance.get("/team/invitations", {
      params: {
        userEmail,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error on get team invitations: ", error);
    throw new Error("Failed to get member team invitations");
  }
};

export const sendInvitation = async (teamId: string, userEmail: string) => {
  try {
    const response = await axiosInstance.post(`/team/${teamId}/invitations`, {
      userEmail,
    });
    return { success: response.data.success, message: response.data.message };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Server connection error");
    }
  }
};

export const revokeInvitation = async (inviteId: string) => {
  try {
    const response = await axiosInstance.delete(`/team/invitation/${inviteId}`);

    return { success: response.data.success, message: response.data.message };
  } catch (error) {
    console.log("Error on revoke user invite: ", error);
    throw new Error("Failed on revoke member invite");
  }
};

export const removeMember = async (teamId: string, memberId: string) => {
  try {
    const response = await axiosInstance.delete(`/team/${teamId}/member`, {
      data: { memberId },
    });

    return { success: response.data.success, message: response.data.message };
  } catch (error) {
    console.log("Error on remove user: ", error);
    throw new Error("Failed on remove member");
  }
};

export const handleTeamInvitation = async (
  userId: string,
  invitationId: string,
  action: string
) => {
  const response = await axiosInstance.put(`/team/invitation/team/${userId}`, {
    invitationId,
    action,
  });

  return { success: response.data.success, message: response.data.message };
};
