import { OptionsButton } from "@src/components/button/options";
import { CrownSimple, Pencil, Trash } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import { useMembers } from "@src/hooks/useMembers";
import { removeMember } from "@src/services/teamsServices";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@src/contexts/AuthContext";
import { toastConfirmAlert } from "@src/utils/toastConfirm";
import { ToastMessage } from "@src/utils/toastMessage";
import { toast, ToastContainer } from "react-toastify";

interface TeamMember {
  role: string;
  user: {
    email: string;
    id: string;
    image: string | null;
    name: string;
  };
}

const roles = [
  {
    value: "OWNER",
    name: "Owner",
    description: "Admin-level access to all resources.",
    icon: <CrownSimple size={18} />,
  },
  {
    value: "EDITOR",
    name: "Editor",
    description: "Can create and edit news",
    icon: <Pencil size={18} />,
  },
];

export function Members({ teamId }: { teamId: string }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { members, getMembers } = useMembers();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoggedUserOwner, setIsLoggedUserOwner] = useState<boolean>(false);

  const [loadingMemberId] = useState<string | null>(null);

  const [_, setIsRemoving] = useState<boolean>(false);
  const [removingMember, setRemovingMember] = useState<string | null>(null);

  const removeUser = async (memberId: string, memberName: string) => {
    setRemovingMember(memberId);
    setIsRemoving(true);

    const areYouSure = await toastConfirmAlert(
      `Do you really want to remove ${memberName} from your team?`
    );

    if (areYouSure) {
      const response = await removeMember(teamId, memberId);
      toast[response.success ? "success" : "error"](response.message, {
        onClose: () => navigate(0),
      });
    }

    setRemovingMember(null);
    setIsRemoving(false);
  };

  useEffect(() => {
    if (members) setTeamMembers(members);
  }, [members]);

  useEffect(() => {
    const fetchMember = async (teamId: string) => {
      if (teamId) {
        const members = await getMembers(teamId);

        const loggedUserRole = members.find(
          (member: TeamMember) => member.user.id === user?.id
        ).role;
        setIsLoggedUserOwner(loggedUserRole === "OWNER" ? true : false);
      }
    };

    fetchMember(teamId);
  }, [teamId]);

  return (
    <div className="py-6 border rounded-xl border-tertiary/20 dark:border-tertiary flex flex-col gap-2">
      <div className="px-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold leading-4">Members</h2>
          <span className="text-sm ">Manage your members</span>
        </div>

        {/* Members */}
        <div className="relative w-full flex flex-col gap-8">
          {teamMembers.map((member: TeamMember, index: number) => {
            const memberRole = {
              role: member.role,
              icon: roles.find((role) => role.value === member.role)?.icon,
            };

            return (
              <div
                key={index}
                className="relative flex items-center justify-between"
              >
                <div className="flex items-start justify-start gap-4">
                  <div
                    className={`rounded-full h-9 w-9 bg-tertiary/20 dark:bg-tertiary relative flex items-center justify-center overflow-hidden bg-cover bg-center`}
                    style={{
                      backgroundImage: member.user.image
                        ? `url(${member.user.image})`
                        : undefined,
                    }}
                  >
                    {!member.user.image && (
                      <span className="text-sm font-semibold">
                        {member.user.name
                          .split(" ")
                          .map((part: string) => part[0].toUpperCase())
                          .join("")
                          .slice(0, 2)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <h5 className="text-xs md:text-base font-semibold leading-4">
                      {member.user.name}
                    </h5>
                    <span className="text-xs md:text-sm">
                      {member.user.email}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                  {isLoggedUserOwner &&
                    member.user.id !== (user && user.id) && (
                      <button
                        onClick={() =>
                          removeUser(member.user.id, member.user.name)
                        }
                        className="h-9 w-9 rounded-md flex items-center justify-center duration-200 hover:bg-red-vibrant group"
                      >
                        {removingMember === member.user.id ? (
                          <div className="flex w-full items-center justify-center">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          </div>
                        ) : (
                          <Trash
                            size={22}
                            className="duration-200 group-hover:fill-white"
                          />
                        )}
                      </button>
                    )}
                  <OptionsButton
                    memberRole={memberRole}
                    loading={loadingMemberId === member.user.id}
                    disabled={false}
                    options={roles}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer />
      <ToastMessage />
    </div>
  );
}
