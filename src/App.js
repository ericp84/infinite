import logo from "./logo.svg";
import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [pokeData, setPokeData] = useState([]);
  const [limit, setLimit] = useState(16);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const request = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${limit}`
      );
      const response = await request.json();
      if (response) {
        setPokeData(response?.results);
      } else {
        setIsLoading(true);
      }
    } catch (e) {
      console.log(e);
    }
  }, [limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const scrollContainer = useRef(null);

  const handleScroll = useCallback(() => {
    const container = scrollContainer.current;
    if (
      container.scrollHeight - container.scrollTop ===
      container.clientHeight
    ) {
      setLimit((prevLimit) => prevLimit + 10);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainer.current;
    container.onscroll = handleScroll;

    return () => {
      container.onscroll = null;
    };
  }, [handleScroll]);

  return (
    <div className="App overflow-x-hidden h-10">
      {isLoading && <p>Loading ...</p>}
      <div
        className="grid grid-cols-4 gap-4 h-[500px] overflow-y-scroll"
        ref={scrollContainer}
      >
        {pokeData.map((poke, i) => {
          return (
            <div
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center"
              key={i}
            >
              <div className="p-5">
                <a href={poke.url}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {poke.name}
                  </h5>
                </a>
                <a
                  href={poke.url}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {poke.url}
                  <svg
                    className="w-3.5 h-3.5 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
