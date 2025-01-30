import { Team } from "@src/contexts/TeamContext";
import { User } from "@src/contexts/UserContext";
import { NewsProps } from "@src/pages/(panel)/news/components/form";

export const setLocalStorage = (
  key: string,
  value: Team | Team[] | User | NewsProps | string[] | null
): void => {
  try {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  } catch (error) {
    console.error("Error storing to localStorage:", error);
  }
};

export const getLocalStorage = <T>(key: string): T | null => {
  try {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error retrieving from localStorage:", error);
    return null;
  }
};

export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};

export const clearLocalStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};
