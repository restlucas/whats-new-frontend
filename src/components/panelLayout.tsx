import { Outlet } from "react-router-dom";
import { PanelNavigation } from "./panelNavigation";
import { TeamContextProvider } from "@src/contexts/TeamContext";

export function PanelLayout() {
  return (
    <TeamContextProvider>
      <div className="bg-light text-primary dark:text-light dark:bg-dark flex flex-col md:flex-row h-auto md:h-screen w-full md:divide-x-2 dark:divide-tertiary overflow-x-hidden">
        <PanelNavigation />
        <main className="flex-grow py-8 px-4 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </TeamContextProvider>
  );
}
