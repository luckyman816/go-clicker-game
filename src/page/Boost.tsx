import { useTonAddress } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

interface LevelData {
  coinsToLevelUp: number;
  level: number;
}
interface BoostProps {
  goToHome: () => void;
}

const Boost = ({goToHome}: BoostProps) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // const navigate = useNavigate();
  const address = useTonAddress();
  const [selectedItem, setSelectedItem] = useState(null);
  const [levelData, setLevelData] = useState<LevelData | null>(null);
  const [levelDataLoading, setLevelDataLoading] = useState(false);
  const [tonXpBalance, setTonXpBalance] = useState(null);
  const [tonXpBalanceLoading, setTonXpBalanceLoading] = useState(false);

  const [upgradeLevelLoader, setUpgradeLevelLoader] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [walletModalVisible, setWalletModalVisible] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      await fetchUserBoostLvl(address);
      await fetchTotalTap(address);
    };

    if (address) {
      fetchAll();
    }
  }, [address]);

  async function fetchUserBoostLvl(walletAddress: string) {
    setLevelDataLoading(true);
    try {
      console.log("abc", walletAddress);
      const response = await fetch(`${backendUrl}/api/v1/users/user-lvl`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          wallet_address: walletAddress
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      const res = await response.json();
      if (res && res.data) {
        setLevelData({
          level: res?.data?.level,
          coinsToLevelUp: res?.data?.coinsToLevelUp
        });
      }
      setLevelDataLoading(false);
    } catch (error) {
      setLevelDataLoading(false);
      console.log("eeee");
      console.error("There was a problem with the fetch operation:", error);
    }
  }


  async function fetchTotalTap(walletAddress: string) {
    setTonXpBalanceLoading(true);

    try {
      const response = await fetch(`${backendUrl}/api/v1/users/totalTaps`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          wallet_address: walletAddress
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Total Tap: ", data);
      if (data.totalTaps) {
        setTonXpBalance(data.totalTaps);
        localStorage.setItem("totalTaps", data.totalTaps.toString());
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setTonXpBalanceLoading(false);
    }
  }

  async function upgradeToNextLevel() {
    if (!address) {
      alert(address + " is not found");
      return;
    }
    setUpgradeLevelLoader(true);
    try {
      const response = await fetch(`${backendUrl}/api/v1/users/upgrade-lvl`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          wallet_address: address
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      const res = await response.json();

      if (res && !res.success) {
        toast.error(res.message);
        setUpgradeLevelLoader(false);
        return;
      }
      if (res && res.success) {
        toast.success(res.message);
      }

      await fetchUserBoostLvl(address);
      await fetchTotalTap(address);
      setModalVisible(false);

      console.log("res", res);
      setUpgradeLevelLoader(false);
    } catch (error) {
      setUpgradeLevelLoader(false);
      console.log("eeee");
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  const handleButtonClick = (item: any) => {
    if (!address) {
      setWalletModalVisible(true);
    } else {
      setSelectedItem(item);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    // setWalletAddress('');
    // setEmailAddress('');
    // setxAddress('');
  };

  function formatNumberWithCommas(number: number) {
    return number.toLocaleString();
  }

  return (
    <div className="px-2">
      <div className="max-w-full h-full mx-auto flex flex-col py-6 items-center">
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
        <div className={`w-full flex-grow my-[6%] ${modalVisible ? '': 'z-10'}`}>
          <h1>Boost</h1>
        </div>
        {tonXpBalanceLoading ? (
          <ThreeDots
            visible={true}
            height="50"
            width="50"
            color="#1E3D4B"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          <div className={`flex items-center ${modalVisible ? '': 'z-10'}`}>
            <img src="/image/coin_small.svg" alt="coin_small" />
            <div className="text-3xl mx-1">{tonXpBalance ? formatNumberWithCommas(Number(tonXpBalance)) : 0}</div>
          </div>
        )}
        <div className="absolute right-[28%] top-[20%]">
          <img
            src="/image/rocket.png"
            alt="rocket"
            className="h-[171.13px] w-[238px]"
          />
        </div>
        <div className="absolute left-[40%] top-[32%] z-0">
          <img
            src="/image/icon/curly_icon.svg"
            alt="curly line"
            className="h-[300px] w-[300px]"
          />
        </div>
      </div>

      <div className="absolute w-[96%] mt-[28%] ">
        <button
          onClick={() => handleButtonClick("multitap")}
          className="flex items-center justify-between w-full h-[72px] flex-shrink bg-[#1E3D4B] rounded-lg hover:opacity-80 active:scale-95 text-white my-[10px] p-0"
        >
          <div className="flex items-center justify-center flex-1 ps-[15px] relative">
            <img
              src="/image/icon/multitap_icon.svg"
              alt="multitap"
              className="w-[60px] h-[60px] flex-shrink-0 mr-2"
            />
            <div className="flex flex-col text-lg w-full text-start mt-1">
              <p className="whitespace-nowrap">Multitap</p>
              {levelDataLoading ? (
                <p className="text-sm text-gray-500 font-outfit font-normal">
                  Loading
                </p>
              ) : (
                <div className="flex items-center">
                  <img
                    src="/image/coin_small.svg"
                    className="w-6 h-6"
                    alt="coin"
                  />
                  <p className="ml-1 font-bold">{levelData?.coinsToLevelUp}</p>
                  <p className="ml-2 text-lg text-[#9E9E9E]">
                    | {levelData?.level} level
                  </p>
                </div>
              )}
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="me-4"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9.70492 6L8.29492 7.41L12.8749 12L8.29492 16.59L9.70492 18L15.7049 12L9.70492 6Z"
              fill="#9E9E9E"
            />
          </svg>
        </button>
        <button
          // onClick={() => handleButtonClick("energyLimit")}
          className="flex items-center justify-between w-full h-[72px] flex-shrink bg-[#1E3D4B] rounded-lg hover:opacity-80 active:scale-95 text-white my-[10px] p-0"
        >
          <div className="flex items-center justify-center flex-1 ps-[11px] relative">
            <img
              src="/image/icon/energy_icon.svg"
              alt="multitap"
              className="w-[60px] h-[50px] flex-shrink-0 mr-3"
            />
            <div className="flex flex-col text-lg w-full text-start mt-1">
              <p className="whitespace-nowrap">Energy Limit</p>
              <p className="text-sm text-gray-500 font-outfit font-normal">
                Coming soon
              </p>
              {/* <div className="flex items-center">
                <img
                  src="/image/coin_small.svg"
                  className="w-6 h-6"
                  alt="coin"
                />
                <p className="ml-1 font-bold">10</p>
                <p className="ml-2 text-lg text-[#9E9E9E]">| 1 level</p>
              </div> */}
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="me-4"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9.70492 6L8.29492 7.41L12.8749 12L8.29492 16.59L9.70492 18L15.7049 12L9.70492 6Z"
              fill="#9E9E9E"
            />
          </svg>
        </button>
        <button
          // onClick={() => handleButtonClick("rechargingSpeed")}
          className="flex items-center justify-between w-full h-[72px] flex-shrink bg-[#1E3D4B] rounded-lg hover:opacity-80 active:scale-95 text-white my-[10px] p-0"
        >
          <div className="flex items-center justify-center flex-1 ps-[11px] relative">
            <img
              src="/image/icon/recharging_icon.svg"
              alt="multitap"
              className="w-[60px] h-[48px] flex-shrink-0 mr-3"
            />
            <div className="flex flex-col text-lg w-full text-start mt-1">
              <p className="whitespace-nowrap">Recharging Speed</p>
              <p className="text-sm text-gray-500 font-outfit font-normal">
                Coming soon
              </p>
              {/* <div className="flex items-center">
                <img
                  src="/image/coin_small.svg"
                  className="w-6 h-6"
                  alt="coin"
                />
                <p className="ml-1 font-bold">10</p>
                <p className="ml-2 text-lg text-[#9E9E9E]">| 1 level</p>
              </div> */}
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="me-4"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9.70492 6L8.29492 7.41L12.8749 12L8.29492 16.59L9.70492 18L15.7049 12L9.70492 6Z"
              fill="#9E9E9E"
            />
          </svg>
        </button>
      </div>

      {modalVisible && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center"
            onClick={() => setModalVisible(false)}
          ></div>
          <div
            className={`fixed bottom-0 left-0 right-0 p-4 pb-10 shadow-lg bg-[#1E3D4B] rounded-t-2xl flex flex-col justify-center gap-4 ${
              modalVisible
                ? "animate-slide-in-bottom"
                : "animate-slide-out-bottom"
            } transform transition-all max-h-[80vh] overflow-y-auto`}
          >
            <div className="flex justify-end w-full">
              <button
                className="text-black bg-[#4F7383] p-1 rounded-full flex items-center justify-center w-8 h-8"
                onClick={closeModal}
              >
                <img
                  src="/image/icon/close_icon.svg"
                  alt="close"
                  className="w-4 h-4"
                />
              </button>
            </div>
            <div className="flex justify-center">
              <img
                src={`/image/icon/${selectedItem}_big_icon.svg`}
                alt={`${selectedItem}_icon`}
                className=""
              />
            </div>

            <p className="font-outfit font-semibold text-4xl text-white text-center">
              {selectedItem === "multitap" && "Multitap"}
              {selectedItem === "energyLimit" && "Energy Limit"}
              {selectedItem === "rechargingSpeed" && "Recharging Speed"}
            </p>
            <p className="font-outfit font-normal text-lg text-white text-center">
              {selectedItem === "multitap" && (
                <>
                  Increase amount of shares you <br /> earn per each tap.
                  <br />
                  +1 per tap for each level.
                </>
              )}
              {selectedItem === "energyLimit" && (
                <>
                  Increase the amount of energy.
                  <br />
                  +10 energy points for level 2.
                </>
              )}
              {selectedItem === "rechargingSpeed" && (
                <>
                  Increase speed of recharge.
                  <br />
                  +1 per second.
                </>
              )}
            </p>

            <div className="flex items-center justify-center">
              <img src="/image/coin_small.svg" className="w-6 h-6" alt="coin" />
              <p className="ml-1 font-bold">{levelData?.coinsToLevelUp}</p>
              <p className="ml-2 text-lg text-[#9E9E9E]">
                | {levelData?.level} level
              </p>
            </div>

            <button
              disabled={upgradeLevelLoader}
              onClick={() => upgradeToNextLevel()}
              className={`bg-btn-tap font-outfit font-semibold outline-none border-0 text-white rounded-lg h-14 px-2 py-1 flex items-center justify-center text-2xl`}
            >
              {upgradeLevelLoader ? (
                <ThreeDots
                  visible={true}
                  height="50"
                  width="50"
                  color="#1E3D4B"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                <span>Get it!</span>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Boost;
