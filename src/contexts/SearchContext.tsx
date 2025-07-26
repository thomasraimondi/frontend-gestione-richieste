import { createContext, useContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

interface SearchContextType {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  searchLastname: string;
  setSearchLastname: Dispatch<SetStateAction<string>>;
  searchType: string;
  setSearchType: Dispatch<SetStateAction<string>>;
  searchDate: string;
  setSearchDate: Dispatch<SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState("");
  const [searchLastname, setSearchLastname] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchDate, setSearchDate] = useState("");

  return <SearchContext.Provider value={{ search, setSearch, searchLastname, setSearchLastname, searchType, setSearchType, searchDate, setSearchDate }}>{children}</SearchContext.Provider>;
};
