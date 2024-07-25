/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import ProgressBar from "../component/ProgressBar";
import { isMobile } from "react-device-detect";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import { useEnergy } from "../hooks/EnergyContext";
import { ThreeDots } from "react-loader-spinner";

interface LevelData {
  coinsToLevelUp: number;
  level: number;
}
interface BoostProps {
  goToBoost: () => void;
}
function Home({goToBoost}: BoostProps) {
  const backendUrl = "https://go-staging-v21-dot-health-hero-bot.oa.r.appspot.com"
  const address = useTonAddress();
  const { remainedEnergy, setRemainedEnergy, startRecovery, stopRecovery } =
    useEnergy();
  const [isTouch, setIsTouch] = useState(false);
  const [lastClickTime, setLastClickTime] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [levelData, setLevelData] = useState<LevelData | null>(null);
  const [levelDataLoading, setLevelDataLoading] = useState(false);

  const [tapCount, setTapCount] = useState(0);
  const [totalTaps, setTotalTaps] = useState(() => {
    return parseInt(localStorage.getItem("totalTaps") || "0", 10);
  });
  const isFetching = useRef(false);

  const buttonWrapperRef = useRef(null);

  const bodyRef = useRef<HTMLDivElement | null>(null);
  const coinBgTap = "/image/coin_bg_tap.png"; // initial image
  const coinBg = "/image/coin_bg.png"; // new image to set on click

  const [isTapped, setIsTapped] = useState(false);
  console.log(levelDataLoading);
  useEffect(() => {
    const fetchAll = async () => {
      setLastClickTime(Date.now());
      const webapp = (window as any).Telegram?.WebApp.initDataUnsafe;
      // const webapp = {
      //   address: address,
      //   user: { id: "3a5a05f2-af44-4ce0-905e-f00bcd7bfb14" }
      // };
      if (webapp && webapp["user"]) {
        await fetchData(address, webapp["user"]["id"]);
        await fetchTodaysTap(address);
        await fetchTotalTap(address);
        await fetchUserBoostLvl(address);
        setLoading(false);
      }
    };

    if (address) {
      setLoading(true);
      fetchAll();
    } else if (!address) {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    if (lastClickTime !== null) {
      const now = Date.now();
      const timeSinceLastClick = now - lastClickTime;
      if (timeSinceLastClick >= 1000) {
        startRecovery();
      } else {
        const timeoutId = setTimeout(startRecovery, 1000 - timeSinceLastClick);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [lastClickTime]);

  async function fetchUserBoostLvl(walletAddress: string) {
    setLevelDataLoading(true);
    try {
      console.log("abc", walletAddress);
      const response = await fetch(`https://go-staging-v21-dot-health-hero-bot.oa.r.appspot.com/api/v1/users/user-lvl`, {
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

  async function fetchData(walletAddress: string, userId: string) {
    if (isFetching.current) return;
    isFetching.current = true;
    try {
      const response = await fetch(`https://go-staging-v21-dot-health-hero-bot.oa.r.appspot.com/api/v1/users/tonWallet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          wallet_address: walletAddress,
          userId: userId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      isFetching.current = false;
    }
  }

  async function fetchTodaysTap(walletAddress: string) {
    if (isFetching.current) return;

    isFetching.current = true;
    try {
      const response = await fetch(`https://go-staging-v21-dot-health-hero-bot.oa.r.appspot.com/api/v1/users/getTodaysTap`, {
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
      setRemainedEnergy(data.data.remaining);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      isFetching.current = false;
    }
  }

  async function fetchTotalTap(walletAddress: string) {
    if (isFetching.current) return;
    isFetching.current = true;
    try {
      const response = await fetch(`https://go-staging-v21-dot-health-hero-bot.oa.r.appspot.com/api/v1/users/totalTaps`, {
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
      if (data.totalTaps && data.totalTaps > 0) {
        setTotalTaps(data.totalTaps);
        localStorage.setItem("totalTaps", data.totalTaps.toString());
      } else {
        setTotalTaps(data.totalTaps);
        localStorage.setItem("totalTaps", data.totalTaps.toString());
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      isFetching.current = false;
    }
  }

  async function fetchCreateTap(walletAddress: string, tapAmount: number) {
    try {
      const response = await fetch(`${backendUrl}/api/v1/users/taps`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          wallet_address: walletAddress,
          tap_amount: Number(levelData?.level) -1 ,
          tap_remaining: remainedEnergy - tapAmount
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.error) {
        setRemainedEnergy(data.data.remaining);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  function formatNumberWithCommas(number: number) {
    return number.toLocaleString();
  }

  const handleClick = (event: any) => {
    event.preventDefault();
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);

    styleElement.sheet &&
      styleElement.sheet.insertRule(
        "@keyframes fade-out-top-right {0% {opacity: 1; transform: translateY(0); } 100% {opacity: 0;transform: translateY(-100%);}}",
        0
      );

    const newDiv = document.createElement("div");
    // newDiv.textContent = "+1";
    newDiv.textContent = levelData?.level === 1 ? '+1' : `+${Number(levelData?.level) - 1}`;

    newDiv.style.position = "absolute";
    newDiv.style.left = `${x}px`;
    newDiv.style.top = `${y - 50}px`;
    newDiv.style.color = "white";
    newDiv.className =
      "dynamic-div animate-fadeouttopright transform max-sm:text-3xl text-5xl font-bold transition not-selectable";

    bodyRef.current && bodyRef.current.appendChild(newDiv);
    const interval = setTimeout(() => newDiv && newDiv.remove(), 400);

    return () => clearTimeout(interval);
  };

  const handleTap = (event: any) => {
    setLastClickTime(Date.now());
    stopRecovery();

    if (!address) {
      setModalVisible(true);
      return;
    }

    if (remainedEnergy > 0) {
      const tapAmount = 1;
      setRemainedEnergy(remainedEnergy - tapAmount);
      localStorage.setItem(
        "remainedEnergy",
        String(remainedEnergy - tapAmount)
      );
      setTapCount(tapCount + (tapAmount * Number(levelData?.level) - 1));
      const newTotalTaps = totalTaps + (tapAmount * Number(levelData?.level) - 1);
      setTotalTaps(newTotalTaps);
      localStorage.setItem("totalTaps", newTotalTaps.toString());
      fetchCreateTap(address, tapAmount);

      // setToken(token + (length * Number(levelData?.level) - 1)); #what to do for here to multiply???


      handleClick(event);
    }
  };

  const handleTouch = (event: any) => {
    setLastClickTime(Date.now());
    stopRecovery();

    if (!address) {
      setModalVisible(true);
      return;
    }
    console.log('============================================================')
    const tapAmount = event.touches.length;
    console.log('tapAmount',tapAmount)
    if (remainedEnergy - tapAmount >= 0 && tapAmount >= 1) {
      setRemainedEnergy((prevEnergy) => prevEnergy - tapAmount);
      setTapCount((prevCount) => prevCount + (tapAmount * Number(levelData?.level) - 1));
      const newTotalTaps = totalTaps + (tapAmount * Number(levelData?.level) - 1);
      console.log('newTotalTaps',newTotalTaps)
      setTotalTaps(newTotalTaps);
      
      // setToken(token + (length * Number(levelData?.level) - 1)); #what to do for here to multiply???
      
      localStorage.setItem("totalTaps", newTotalTaps.toString());
      console.log('Number(levelData?.level) - 1', Number(levelData?.level) - 1)
      console.log('level', Number(levelData?.level))
      // for (let i = 1 ; i <= Number(levelData?.level) - 1; i++)
      fetchCreateTap(address, tapAmount);
      
      console.log('============================================================')
      handleMultiTouchStart(event);
    }
  };

  const handleMultiTouchStart = (event: TouchEvent) => {
    Array.from(event.touches).forEach((touch) => {
      handleClick({
        ...touch,
        target: event.target,
        preventDefault: () => {},
        clientX: touch.clientX,
        clientY: touch.clientY,
        touches: [],
        targetTouches: [],
        changedTouches: []
      });
    });
  };

  const closeWalletModal = () => {
    setModalVisible(false);
  };

  const handleTonButtonClick = () => {
    if (buttonWrapperRef.current) {
      const tonConnectButton = (buttonWrapperRef.current as any).querySelector(
        "button"
      );
      if (tonConnectButton) {
        tonConnectButton.click();
      }
    }
  };

  const handleTouchStart = () => {
    setIsTapped(true);
  };

  const handleTouchMove = () => {
    setIsTapped(false);
  };
  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsTapped(false);
    }, 100); // Adjust the delay as needed
  };

  const handleMouseUp = () => {
    setTimeout(() => {
      setIsTapped(false);
    }, 100); // Adjust the delay as needed
  };

  const handleMouseDown = () => {
    setIsTapped(true);
  };

  return loading ? (
    <div className="flex items-center justify-center h-screen">
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
    </div>
  ) : (
    <div className="flex flex-col items-center h-[100vh] pt-[15%] pb-[100px] justify-between min-h-[590px] bg-home-gradient">
      <div className="w-full h-14 right-5 fixed top-2" ref={buttonWrapperRef}>
        <TonConnectButton className="float-right" />
      </div>

      <div className="flex flex-col relative items-center justify-between">
        <h1 className="mb-4 max-sm:mb-1">Tap & Earn</h1>
        <div className="flex flex-row justify-center items-center not-selectable space-x-1 mt-4">
          <img src="/image/coin_small.svg" />
          <h3 className="text-3xl text-white">
            {formatNumberWithCommas(totalTaps)}
          </h3>
        </div>
      </div>

      <div
        className={`relative max-sm:my-0 w-72 h-72 rounded-full bg-cover aspect-square  flex-shrink-0 items-center justify-center ${
          remainedEnergy > 0
            ? "cursor-pointer"
            : "cursor-not-allowed opacity-50"
        }`}
        ref={bodyRef}
        // style={{ backgroundImage: `url(${coinImage})` }}
        onTouchStart={(e) => {
          if (!isMobile) return;
          setIsTouch(true);
          handleTouchStart();
          handleTouch(e);
        }}
        onClick={(e) => {
          if (isTouch) {
            setIsTouch(false);
            return;
          }
          handleTap(e);
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <img src={isTapped ? coinBg : coinBgTap} alt="coin" />
      </div>

      <div>
        <div className="flex flex-col items-center not-selectable w-full mb-4">
          <div className="flex justify-between items-center w-full mb-1 pl-3 pr-4">
            <h3 className="font-bold">Tap Limit</h3>
            <h3 className="text-[#FFF] text-md font-bold">
              {remainedEnergy}/2000
            </h3>
          </div>
          <ProgressBar value={remainedEnergy * 0.05} />
        </div>
        <div>
          <div className="flex items-center justify-end space-x-2 mt-2" onClick={goToBoost}>
            <img src="/image/icon/boost_icon.svg" alt="Boost" />
            <p className="font-outfit font-semibold text-sm text-[#E5D0B3]">
              Boost
            </p>
          </div>
        </div>
      </div>

      {modalVisible && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center"
            onClick={() => setModalVisible(false)}
          ></div>

          <div className="fixed bottom-0 left-0 right-0 p-4 shadow-lg bg-[#1E3D4B] rounded-t-2xl flex flex-col justify-center gap-4 animate-slide-in-bottom transform transition-all max-h-[80vh] overflow-y-auto">
            <div className="flex justify-end w-full h-12">
              <button
                className="text-black bg-[#4F7383] p-1 rounded-full"
                onClick={closeWalletModal}
                style={{
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <img
                  src="/image/icon/close_icon.svg"
                  alt="close"
                  className="w-4 h-4"
                />
              </button>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/image/icon/connect_wallet.svg"
                alt="connectButton"
                className="w-20 h-25"
              />
            </div>
            <p className="text-3xl font-bold text-center mb-2">
              Please connect the <br></br>wallet first!
            </p>
            <div
              className="flex text-xl justify-center items-center w-full h-16 mb-20 px-2 py-1 bg-gradient-to-r from-[#07AEEA] to-[#D3984E] rounded-xl cursor-pointer gap-2"
              onClick={handleTonButtonClick}
            >
              <img src="/image/icon/union.svg" alt="tonbuttonicon" />
              Connnect TON Wallet
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
