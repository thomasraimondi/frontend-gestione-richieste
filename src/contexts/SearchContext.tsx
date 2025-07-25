import { createContext, useContext, useState } from "react";

const SearchContext = createContext({
  search: "",
  setSearch: (value: string) => {},
  searchLastname: "",
  setSearchLastname: (value: string) => {},
  searchType: "",
  setSearchType: (value: string) => {},
  searchDate: "",
  setSearchDate: (value: string) => {},
});

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState("");
  const [searchLastname, setSearchLastname] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchDate, setSearchDate] = useState("");

  return <SearchContext.Provider value={{ search, setSearch, searchLastname, setSearchLastname, searchType, setSearchType, searchDate, setSearchDate }}>{children}</SearchContext.Provider>;
};
