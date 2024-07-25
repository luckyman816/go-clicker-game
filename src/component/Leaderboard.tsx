/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { useTonAddress } from "@tonconnect/ui-react";
import { ThreeDots } from "react-loader-spinner";
interface LeaderboardProps {
  goToHome: () => void;
}

const Leaderboard = ({ goToHome }: LeaderboardProps) => {
  interface UsersLists {
    success: boolean;
    leaderboard: User[];
    totalPages: number;
    currentPage: number;
  }

  interface User {
    userId: string;
    totalScore: number;
    rank: number;
  }

  const address = useTonAddress(); // Get the TON address using the useTonAddress
  // const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [filterRange, setFilterRange] = useState("today");
  const [usersData, setUsersData] = useState<UsersLists>({
    success: true,
    leaderboard: [],
    totalPages: 0,
    currentPage: 1
  });
  const [activeTab, setActiveTab] = useState("Today");
  const [page, setPage] = useState("1");

  const userlist = useRef<HTMLDivElement>(null);
  const isFetching = useRef(false);

  useEffect(() => {
    setPage("1");
    fetchUsersList(address, filterRange, "1", true);
  }, [address, filterRange]);

  useEffect(() => {
    if (parseInt(page) > 1) {
      fetchUsersList(address, filterRange, page, false);
    }
  }, [page]);

  async function fetchUsersList(
    walletAddress: string,
    filterRange: string,
    page: string,
    reset: boolean
  ) {
    if (!address) return;
    if (usersData.totalPages && parseInt(page) > usersData.totalPages) return;
    if (isFetching.current) return;

    isFetching.current = true;

    try {
      const response = await fetch(`${backendUrl}/api/v1/users/leaderboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          wallet_address: walletAddress,
          filter: filterRange,
          page: page,
          limit: "10"
        })
      });

      isFetching.current = false;

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const res = await response.json();
      setUsersData((prevUsersData) => ({
        ...res,
        leaderboard: reset
          ? res.leaderboard
          : [...prevUsersData.leaderboard, ...res.leaderboard],
        currentPage: usersData.currentPage
      }));
    } catch (error) {
      isFetching.current = false;
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  // Change the pagination when scroll down to bottom
  const listenScrollEvent = () => {
    if (userlist.current) {
      const { scrollTop, scrollHeight, clientHeight } = userlist.current;

      if (scrollTop + clientHeight === scrollHeight && !isFetching.current) {
        setPage(String(parseInt(page) + 1));
      }
    }
  };

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
    if (tab === "Today") setFilterRange("today");
    if (tab === "This Week") setFilterRange("weekly");
    if (tab === "This Month") setFilterRange("montly");
  };

  return (
    <div className="max-w-full h-[100vh] mx-auto flex flex-col">
      <button
        className="absolute left-[22px] top-[15px] bg-transparent p-0 border-none"
        onClick={goToHome}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
            fill="white"
          />
        </svg>
      </button>
      <div className="flex flex-col px-[10px] py-3">
        {/* Leaderboard Content */}
        <div className="w-full flex-grow h-[10vh] my-[5%] justify-center items-center">
          <h1>Leaderboard</h1>
        </div>
        {/* Select Button [Today, This Week, This Month] */}
        <div className="flex flex-col items-center h-[10vh]">
          <div>
            <img src="/image/divider.svg" alt="divider"></img>
          </div>
          <div className="flex bg-[#020304] w-full max-w-md mx-auto rounded-full">
            {["Today", "This Week", "This Month"].map((tab, index) => (
              <button
                key={index}
                className={`flex-1 text-center py-2 rounded-full transition-colors duration-300 outline-none focus:outline-none 
              ${
                activeTab === tab
                  ? "bg-[#0B688A] text-[#020304]"
                  : "text-[#0B688A] bg-[#020304]"
              }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div>
            <img src="/image/divider.svg" alt="divider"></img>
          </div>
        </div>
        {/* Show Users List */}
        <div className="flex flex-col justify-center items-center px-3 mt-1">
          <div
            className="overflow-y-auto h-[70vh] max-h-screen hide-scrollbar"
            onScroll={listenScrollEvent}
            ref={userlist}
          >
            {usersData.leaderboard &&
              usersData.leaderboard.map((userInfos, index) => (
                <span key={index}>
                  <div
                    className={`${
                      userInfos.userId === address
                        ? `h-[70px] px-3 grid grid-cols-12 gap-4 items-center justify-center sticky bottom-0 top-0 z-50 bg-custom-gradient rounded-[8px]`
                        : "h-[70px] px-3 grid grid-cols-12 gap-4 items-center justify-center"
                    }`}
                  >
                    <div className="relative flex items-center col-span-3">
                      <div className="bg-rank-gradient rounded-full h-[30px] w-[70px] flex items-center justify-center text-[#D6AB7A] text-xl font-extrabold">
                        {userInfos.rank}
                      </div>
                    </div>
                    <div className="flex flex-col items-start ml-3 col-span-7 justify-start">
                      <div className="text-white text-xl font-bold">
                        {userInfos.userId.slice(0, 5)}...
                        {userInfos.userId.slice(-4)}
                      </div>
                      <div className="flex mt-2">
                        <img src="/image/coin_small.svg" alt="coin_small" />
                        <div className="text-white font-bold ml-2">
                          {userInfos.totalScore}
                        </div>
                      </div>
                    </div>
                    {userInfos.userId === address && (
                      <div className="text-[#11262F] text-xl font-bold justify-self-center ml-6">
                        YOU
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center m-1">
                    <img src="/image/divider.svg" alt="divider" />
                  </div>
                </span>
              ))}
            {isFetching && isFetching.current && (
              <span>
                <ThreeDots
                  visible={true}
                  height="50"
                  width="50"
                  color="#ebd8bf"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
