import { Article, HourglassSimpleHigh } from "@phosphor-icons/react";
import {
  LastFiveNews,
  useLastNewsAndTopMembers,
} from "@src/hooks/useStatistics";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface UserProps {
  id: string;
  name: string;
  totalNews: number;
  totalViews: number;
}

interface TableProps {
  title: string;
  tableTitle: string[];
  data: (LastFiveNews | UserProps)[];
  fetching: boolean;
  icon: ReactNode;
}

const TableCard = ({ title, tableTitle, data, fetching, icon }: TableProps) => {
  if (fetching && data.length === 0) {
    return (
      <div className="w-full border rounded-xl p-6 border-tertiary/20 dark:border-tertiary flex flex-col gap-4">
        <div className="w-full flex items-center justify-between">
          <div className="h-7 w-[200px] bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="text-sm font-semibold text-left rtl:text-right">
              <th className="text-nowrap p-2 w-full">
                <div className="h-5 w-[200px] bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
              </th>
              <th className="text-nowrap p-2 w-auto">
                <div className="h-5 w-[80px] bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
              </th>
              <th className="text-nowrap p-2 w-auto">
                <div className="h-5 w-[50px] bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => {
              return (
                <tr key={index} className="">
                  <td className="p-2 font-semibold">
                    <div className="h-5 w-full bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
                  </td>
                  <td className="p-2">
                    <div className="h-5 w-[80px] bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
                  </td>
                  <td className="p-2">
                    <div className="h-5 w-[50px] bg-tertiary/20 dark:bg-tertiary rounded-md animate-pulse" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  if (data.length === 0)
    return (
      <div className="border rounded-xl p-6 border-tertiary/20 dark:border-tertiary flex flex-col gap-4">
        <div className="w-full flex items-center justify-between">
          <h3 className="text-lg font-bold">{title}</h3>
          {icon}
        </div>
        <div className="overflow-x-scroll xl:overflow-hidden">
          <table className="w-full table-auto overflow-hidden">
            <thead>
              <tr className="text-sm font-semibold text-left rtl:text-right">
                {tableTitle.map((header, index) => (
                  <th
                    key={index}
                    className={`text-nowrap p-2 ${index === 0 ? "w-full" : "w-auto"}`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  className="py-6 font-semibold text-nowrap md:text-wrap"
                  colSpan={3}
                >
                  <div className="w-full text-center text-sm">
                    No statistics found. Create new news and the statistics will
                    appear here!
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );

  return (
    <div className="border rounded-xl p-6 border-tertiary/20 dark:border-tertiary flex flex-col gap-4">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-lg font-bold">{title}</h3>
        {icon}
      </div>
      <div className="overflow-x-scroll xl:overflow-hidden">
        <table className="w-full table-auto overflow-hidden">
          <thead>
            <tr className="text-sm font-semibold text-left rtl:text-right">
              {tableTitle.map((header, index) => (
                <th
                  key={index}
                  className={`text-nowrap p-2 ${index === 0 ? "w-full" : "w-auto"}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const isNews = (row as LastFiveNews).title !== undefined;
              return (
                <tr
                  key={
                    isNews ? (row as LastFiveNews).id : (row as UserProps).id
                  }
                  className="text-sm hover:bg-tertiary/20 hover:dark:bg-tertiary"
                >
                  <td className="p-2 font-semibold text-nowrap md:text-wrap">
                    {isNews ? (
                      <Link
                        target="_blank"
                        to={`/article/${(row as LastFiveNews).slug}`}
                        className="line-clamp-1 cursor-pointer hover:underline"
                      >
                        {(row as LastFiveNews).title}
                      </Link>
                    ) : (
                      (row as UserProps).name
                    )}
                  </td>
                  <td className="p-2 text-nowrap">
                    {isNews
                      ? new Date(
                          (row as LastFiveNews).createdAt
                        ).toLocaleDateString("en-US")
                      : (row as UserProps).totalNews}
                  </td>
                  <td className="p-2 text-nowrap">
                    {isNews
                      ? (row as LastFiveNews).views
                      : (row as UserProps).totalViews}{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export function NewsAndMembers({
  activeTeamId,
}: {
  activeTeamId: string | undefined;
}) {
  const { statistics, fetching } = useLastNewsAndTopMembers(activeTeamId || "");

  const lastFiveNews = statistics?.lastFiveNews || [];
  const topUsers = statistics?.topUsers || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Last five news */}
      <TableCard
        title="Last five news published"
        icon={<Article size={20} />}
        tableTitle={["Title", "Published at", "Views"]}
        data={lastFiveNews}
        fetching={fetching}
      />

      {/* Most active members table */}
      <TableCard
        title="Most active team members"
        icon={<HourglassSimpleHigh size={20} />}
        tableTitle={["Name", "Total news", "Total views"]}
        data={topUsers}
        fetching={fetching}
      />
    </div>
  );
}
