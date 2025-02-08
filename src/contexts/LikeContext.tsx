import { fetchLikes, toggleLike } from "@src/services/userServices";
import { setLocalStorage } from "@src/utils/storageUtils";
import { createContext, useState } from "react";

interface LikeContextData {
  likedNews: string[];
  setLikedNews: React.Dispatch<React.SetStateAction<string[]>>;
  getLikes: (userId: string) => void;
  toggleArticleLike: (method: string, userId: string, newsId: string) => void;
}

export const LikeContext = createContext({} as LikeContextData);

export function LikeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [likedNews, setLikedNews] = useState<string[]>([]);

  const getLikes = async (userId: string) => {
    const response = await fetchLikes(userId);
    setLikedNews(response);
    setLocalStorage("@whats-new:liked-news", response.likes);
  };

  const toggleArticleLike = async (
    method: string,
    userId: string,
    newsId: string
  ) => {
    const updatedLikes = [...likedNews];

    const updateState = (newLikes: string[]) => {
      setLocalStorage("@whats-new:liked-news", newLikes);
      setLikedNews(newLikes);
    };

    const newLikes =
      method === "add"
        ? [...updatedLikes, newsId]
        : updatedLikes.filter((id) => id !== newsId);

    if (newLikes !== updatedLikes) {
      updateState(newLikes);
    }

    await toggleLike(method, userId, newsId);
  };

  return (
    <LikeContext.Provider
      value={{ likedNews, setLikedNews, getLikes, toggleArticleLike }}
    >
      {children}
    </LikeContext.Provider>
  );
}
