import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Link, Outlet } from "react-router";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { dataAPI } from "../lib/data-api";
import { Badge } from "@/components/ui/badge"

export default function DashboardLayout() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputFocused, setInputFocused] = useState(false);
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetchSearchResults();
    }, 500); // Debounce by 500ms

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const fetchSearchResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await dataAPI.searchData(searchQuery)
      console.log(response)
      setSearchResults(response.results || {});
    } catch (err) {
      setError("Failed to fetch search results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <div className="w-full flex flex-col">
          <header className="w-full bg-white/20 dark:bg-neutral-900/20 backdrop-blur-md shadow-md px-6 py-4 flex justify-center items-center sticky top-0 z-50">
            <div className="relative w-full max-w-2xl">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => {
                  // Small delay to allow clicking on results before they disappear
                  setTimeout(() => setInputFocused(false), 200);
                }}
                className="w-full border border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white rounded-xl px-5 py-3 pr-12 shadow-md shadow-black/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition focus:px-8"
              />

              {/* Search Icon inside the input */}
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Search Results Dropdown - Now checks both searchQuery and inputFocused */}
              {searchQuery && inputFocused && (
                <div className="absolute z-20 w-full bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl shadow-lg mt-3 overflow-hidden animate-fade-in">
                  {loading ? (
                    <div className="p-4 text-gray-500 dark:text-gray-400 text-center">
                      Loading...
                    </div>
                  ) : error ? (
                    <div className="p-4 text-red-500 text-center">{error}</div>
                  ) : (searchResults.notes?.length > 0 || searchResults.cards?.length > 0) ? (
                    <>
                      {/* Display notes */}
                      {searchResults.notes?.map((note) => (
                        <Link
                          key={note.id}
                          reloadDocument
                          className="block p-3 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer transition rounded-md"
                          to={`/dashboard/editor/${note.id}`}
                        >
                          <div className="flex justify-between">
                            <div className="font-medium">{note.title}</div>
                            <Badge>Note</Badge>
                          </div>
                        </Link>
                      ))}

                      {/* Display cards */}
                      {searchResults.cards?.map((card) => (
                        <Link
                          key={card.id}
                          className="block p-3 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer transition rounded-md"
                          to={`/dashboard/cards/#${card.id}`}>
                          <div className="flex justify-between">
                            <div className="font-medium">{card.title}</div><Badge>Card</Badge>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{card.description}</div>
                        </Link>
                      ))}
                    </>
                  ) : (
                    <div className="p-4 text-gray-500 dark:text-gray-400 text-center">
                      No results found.
                    </div>
                  )}
                </div>
              )}
            </div>
          </header>

          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </main>
  );
}
