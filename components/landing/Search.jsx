"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term) {
    const pamars = new URLSearchParams(searchParams);

    if (term) {
      pamars.set(`query`, term);
    } else {
      pamars.delete(`query`);
    }
    replace(`${pathname}?${pamars.toString()}`);
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        className="bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
};

export default Search;
