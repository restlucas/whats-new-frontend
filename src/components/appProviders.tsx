import { AuthContextProvider } from "@src/contexts/AuthContext";
import { LikeContextProvider } from "@src/contexts/LikeContext";
import { TeamContextProvider } from "@src/contexts/TeamContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000,
      gcTime: 1000,
    },
  },
});

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <LikeContextProvider>
          <TeamContextProvider>
            <HelmetProvider>
              <Helmet titleTemplate="%s | What's new?" />
              {children}
            </HelmetProvider>
          </TeamContextProvider>
        </LikeContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
