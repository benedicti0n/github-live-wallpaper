import { atom } from "jotai";
import GithubData from "../components/GithubBento/types";

// Load initial data from localStorage
const initialData = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("githubData") || "null")
    : null;

// Atom with localStorage sync
export const githubDataAtom = atom<GithubData | null>(initialData);

export const githubDataAtomWithPersistence = atom(
    (get) => get(githubDataAtom),
    (get, set, newValue: GithubData | null) => {
        set(githubDataAtom, newValue);
        if (newValue) localStorage.setItem("githubData", JSON.stringify(newValue));
        else localStorage.removeItem("githubData");
    }
);
