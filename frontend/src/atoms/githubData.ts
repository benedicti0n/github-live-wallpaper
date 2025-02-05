import { atom } from "jotai";
import { UserDetails } from "../components/GithubBento/types";

// Load initial data from localStorage
const initialData = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("githubData") || "null")
    : null;

// Atom with localStorage sync
export const githubDataAtom = atom<UserDetails | null>(initialData);

export const githubDataAtomWithPersistence = atom(
    (get) => get(githubDataAtom),
    (get, set, newValue: UserDetails | null) => {
        set(githubDataAtom, newValue);
        if (newValue) localStorage.setItem("githubData", JSON.stringify(newValue));
        else localStorage.removeItem("githubData");
    }
);
