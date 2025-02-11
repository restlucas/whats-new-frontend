import { Header } from "./header";
import { Footer } from "./footer";
import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { getLocalStorage } from "@src/utils/storageUtils";
import { LikeContext } from "@src/contexts/LikeContext";
import { UserProps } from "@src/contexts/AuthContext";

export function Layout() {
  const { getLikes } = useContext(LikeContext);

  useEffect(() => {
    const userInStorage = getLocalStorage("@whats-new:user") as UserProps;

    if (userInStorage) {
      getLikes(userInStorage.id);
    }
  }, []);

  return (
    <div className="bg-light text-primary dark:text-light dark:bg-dark flex flex-col min-h-screen w-full overflow-x-hidden relative space-y-8">
      <Header />
      <main className="mx-8 flex-grow md:mx-12 xl:mx-36 md:my-10 space-y-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
