/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import ImageCheckQuest from "../assets/check_button.png";
import { Quest, QuestType } from "../mock";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import WebApp from "@twa-dev/sdk";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from "react-loader-spinner";

export default function QuestList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [walletModalVisible, setWalletModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    description: "",
    prize: 0,
    icon: "",
    type: "",
    completed: false,
    wallet: "",
    link: "",
    email: ""
  });

  const address = useTonAddress(); // Get the TON address using the useTonAddress
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [walletAddress, setWalletAddress] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isValidWallet, setIsValidWallet] = useState<boolean>(false);
  const [xAddress, setxAddress] = useState<string>("");
  const [quests, setQuests] = useState<Quest[]>([]);

  //Check Visit Status
  const [isFollowingX, setIsFollowingX] = useState(false);
  const [isFollowingTelegram, setIsFollowingTelegram] = useState(false);
  const [isFollowingDiscord, setIsFollowingDiscord] = useState(false);
  const [isFollowingInstagram, setIsFollowingInstagram] = useState(false);
  const [isFollowingFacebook, setIsFollowingFacebook] = useState(false);
  const [isFollowingYoutube, setIsFollowingYoutube] = useState(false);
  const [isFollowingLinkedIn, setIsFollowingLinkedIn] = useState(false);
  const [isFollowingWarpcast, setIsFollowingWarpcast] = useState(false);
  const [isFollowingPodcast, setIsFollowingPodcast] = useState(false);
  const [isVisitingWebsite, setIsVisitingWebsite] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  //Get Telegram UserID
  const params = new URLSearchParams(WebApp.initData);
  const userData = params.get("user");
  let parsedUser = {
    id: ""
  };
  if (userData) {
    parsedUser = JSON.parse(userData);
  }
  const userId = parsedUser.id.toString();

  useEffect(() => {
    if (new RegExp(/^(0x)?[0-9a-fA-F]{40}$/).test(walletAddress))
      setIsValidWallet(true);
    else setIsValidWallet(false);
  });

  useEffect(() => {
    if (new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(emailAddress))
      setIsValidEmail(true);
    else setIsValidEmail(false);
  }, [emailAddress]);

  useEffect(() => {
    fetchUserData(address);
  }, [address, modalData]);

  async function fetchUserData(walletAddress: string) {
    if (!address) return;
    try {
      const response = await fetch(`${backendUrl}/api/v1/users/userRewards`, {
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
      setQuests(res);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  const closeModal = () => {
    setModalVisible(false);
    setWalletAddress("");
    setEmailAddress("");
    setxAddress("");
  };

  const closeWalletModal = () => {
    setWalletModalVisible(false);
    setWalletAddress("");
  };

  const handleButtonClick = (data: any) => {
    if (!address) {
      setWalletModalVisible(true);
    } else {
      setModalVisible(true);
      setModalData(data);
      setxAddress(data.account);
    }
  };

  const buttonWrapperRef = useRef(null);

  const handleTonButtonClick = () => {
    if (buttonWrapperRef.current) {
      const tonConnectButton = (buttonWrapperRef.current as any).querySelector(
        "button"
      ); // Adjust selector if necessary
      if (tonConnectButton) {
        tonConnectButton.click();
      }
    }
  };

  const handleFollowClick = (link: string) => {
    if (!link) return;
    window.open(link, "_blank");
    setIsVisitingWebsite(true);
  };

  const handleFollowDiscordClick = (link: string) => {
    if (!link) return;
    window.open(link, "_blank");
    setIsFollowingDiscord(true);
  };

  const handleFollowYoutubeClick = (link: string) => {
    if (!link) return;
    window.open(link, "_blank");
    setIsFollowingYoutube(true);
  };

  const handleFollowFacebookClick = (link: string) => {
    if (!link) return;
    window.open(link, "_blank");
    setIsFollowingFacebook(true);
  };

  const handleFollowInstagramClick = (link: string) => {
    if (!link) return;
    window.open(link, "_blank");
    setIsFollowingInstagram(true);
  };

  const handleFollowLinkedinClick = (link: string) => {
    if (!link) return;
    window.open(link, "_blank");
    setIsFollowingLinkedIn(true);
  };

  const handleFollowWarpcastClick = (link: string) => {
    if (!link) return;
    window.open(link, "_blank");
    setIsFollowingWarpcast(true);
  };

  const handleFollowPodcastClick = (link: string) => {
    if (!link) return;
    window.open(link, "_blank");
    setIsFollowingPodcast(true);
  };

  //// Sending APIS For Request
  //Handle Twitter API
  const handleFollowTwitterClick = (link: string) => {
    if (!link) return;
    window.open(link, "_blank");
    setIsFollowingX(true);
  };
  const handleVerifyTwitterClick = async () => {
    if (!address) return;
    try {
      const response = await fetch(
        `${backendUrl}/api/v1/users/verifyTwitterFollow`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            wallet_address: address,
            twitter_handle: xAddress
          })
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      const res = await response.json();
      if (res.status.includes("success"))
        setModalData({
          ...modalData,
          completed: true
        });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  //Handle EthWallet API
  const handleSubmitWalletAddress = async () => {
    if (!address) return;
    try {
      const response = await fetch(
        `${backendUrl}/api/v1/users/shareETHWallet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            wallet_address: address,
            eth_wallet_address: walletAddress
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      const res = await response.json();
      if (res.status.includes("success"))
        setModalData({
          ...modalData,
          completed: true
        });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  //Handle Email API
  const handleSubmitEmailAddress = async () => {
    if (!address) return;
    console.log(emailAddress);
    try {
      const response = await fetch(
        `${backendUrl}/api/v1/users/shareEmailAddress`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            wallet_address: address,
            emailAddress: emailAddress
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      const res = await response.json();
      if (res.status.includes("success"))
        setModalData({
          ...modalData,
          completed: true
        });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  //Handle Telegram API
  const handleFollowTelegramClick = (url: string) => {
    // WebApp.openTelegramLink(url);
    if (!url) return;
    window.open(url, "_blank");
    setIsFollowingTelegram(true);
  };
  const handleVerifyTelegramClick = async () => {
    if (!address) return;
    try {
      const response = await fetch(
        `${backendUrl}/api/v1/users/verifyTelegramJoin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            wallet_address: address,
            telegram_username: userId
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      const res = await response.json();
      if (res.status.includes("success"))
        setModalData({
          ...modalData,
          completed: true
        });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  //Handle Website API
  const handleVisitWebsiteClick = () => {
    setIsVisitingWebsite(true);
  };
  const handleVerifyWebsite = async () => {
    if (!address) return;
    try {
      const response = await fetch(
        `${backendUrl}/api/v1/users/verifyWebsiteVisit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            wallet_address: address
          })
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      const res = await response.json();
      if (res.status.includes("success"))
        setModalData({
          ...modalData,
          completed: true
        });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleVerifyVisit = async (questType: string) => {
    if (!address) return;
    setIsVerifying(true);
    try {
      const response = await fetch(`${backendUrl}/api/v1/users/verifyVisit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          wallet_address: address,
          quest_type: questType
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      const res = await response.json();
      if (res.status.includes("success"))
        setModalData({
          ...modalData,
          completed: true
        });

      setIsVerifying(false);
    } catch (error) {
      setIsVerifying(false);
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleVerifyLinkedInVisit = () => handleVerifyVisit("visit_linkedin");
  const handleVerifyDiscordVisit = () => handleVerifyVisit("discord_join");
  const handleVerifyWarpCastVisit = () => handleVerifyVisit("visit_warpcast");
  const handleVerifyPodcastVisit = () => handleVerifyVisit("visit_podcast");
  const handleVerifyFacebookVisit = () => handleVerifyVisit("visit_facebook");
  const handleVerifyInstagramVisit = () => handleVerifyVisit("visit_instagram");
  const handleVerifyYouTubeVisit = () => handleVerifyVisit("visit_youtube");

  return (
    <div className="max-h-[68vh] max-sm:max-h-[68vh] overflow-x-hidden">
      <div ref={buttonWrapperRef} className="hidden">
        <TonConnectButton />
      </div>
      {quests.map((data, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(data)}
          className={`flex items-center justify-between w-full h-[72px] flex-shrink bg-[#1E3D4B] rounded-lg hover:opacity-80 active:scale-95 text-white transition ease-in-out my-[6px] p-0`}
        >
          <div className="flex items-center justify-center flex-1 ps-[24px] relative">
            <img
              src={data.icon}
              alt={`icon-${index}`}
              className="w-[48px] h-[48px] flex-shrink-0 mr-5"
            />
            {!data.completed && (
              <span className="bg-[#F00] h-2 w-2 rounded-full absolute top-[2px] left-[65px]"></span>
            )}
            <div className="flex flex-col text-lg w-full text-start mt-1">
              <p className="whitespace-nowrap">{data.description}</p>
              <div className="flex items-center">
                <img
                  src="/image/coin_small.svg"
                  className="w-6 h-6"
                  alt="coin"
                />
                <p className="ml-1 font-bold">+{data.prize}</p>
              </div>
            </div>
          </div>
          {data.completed ? (
            <img src={ImageCheckQuest} className="w-14" alt="completed" />
          ) : (
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
          )}
        </button>
      ))}
      {modalVisible && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center"
            onClick={() => setModalVisible(false)}
          ></div>
          <div
            className={`fixed bottom-0 left-0 right-0 p-4 shadow-lg bg-[#1E3D4B] rounded-t-2xl flex flex-col justify-center gap-4 ${
              modalVisible
                ? "animate-slide-in-bottom"
                : "animate-slide-out-bottom"
            } transform transition-all max-h-[80vh] overflow-y-auto`}
          >
            <div className="flex justify-end w-full h-12">
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
                src={modalData?.icon}
                alt="quest_icon"
                className="w-16 h-16"
              />
            </div>
            <p className="text-3xl font-bold text-center">
              {modalData?.description}
            </p>

            {/* Share wallet address */}
            {modalData.type === "share_eth_wallet" && (
              <>
                <div className="w-full relative">
                  <input
                    value={
                      modalData.completed ? modalData.wallet : walletAddress
                    }
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="ETH wallet address"
                    className="text-ellipsis overflow-hidden text-xl pl-10 pr-10 py-2 h-16 rounded-xl w-full bg-[#1E3D4B] border border-[#4F7383]"
                  />
                  <img
                    className="absolute inset-y-2 left-0 pl-3 pt-1 flex items-center pointer-events-none"
                    src={"/image/icon/ethereum.svg"}
                    alt="ethereum"
                  />
                  {isValidWallet && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-6 h-6 bg-[#4F7383] rounded-full">
                      <img
                        src="/image/icon/verify_checkmark.svg"
                        alt="verify_checkmark"
                      />
                    </div>
                  )}
                  {modalData.completed && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-6 h-6 bg-[#239827] rounded-full">
                      <img
                        src="/image/icon/verify_checkmark.svg"
                        alt="verify_checkmark"
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-center gap-[6px] mb-3">
                  <img
                    src="/image/coin_small.svg"
                    className="w-10 h-10"
                    alt="coin"
                  />
                  <p className="text-white text-2xl">+{modalData.prize}</p>
                </div>
                <button
                  className={`${
                    modalData.completed
                      ? "bg-[#4F7383] text-[#1E3D4B]"
                      : "bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white"
                  }   rounded-xl h-14 px-2 py-1 flex items-center justify-center text-2xl mb-16`}
                  disabled={modalData.completed}
                  onClick={handleSubmitWalletAddress}
                >
                  {modalData.completed ? "Submitted" : "Submit"}
                </button>
              </>
            )}

            {/* Share email address */}
            {modalData.type === "email_share" && (
              <>
                <div className="w-full relative">
                  <input
                    value={modalData.completed ? modalData.email : emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="you@domain.com"
                    className="text-2xl pl-3 pr-10 py-2 h-16 rounded-xl w-full bg-[#1E3D4B] border border-[#4F7383]"
                  />
                  {isValidEmail && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-6 h-6 bg-[#4F7383] rounded-full">
                      <img
                        src="/image/icon/verify_checkmark.svg"
                        alt="verify_checkmark"
                      />
                    </div>
                  )}
                  {modalData.completed && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-6 h-6 bg-[#239827] rounded-full">
                      <img
                        src="/image/icon/verify_checkmark.svg"
                        alt="verify_checkmark"
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-center gap-[6px] mb-3">
                  <img
                    src="/image/coin_small.svg"
                    className="w-10 h-10"
                    alt="coin"
                  />
                  <p className="text-white text-2xl">+{modalData.prize}</p>
                </div>
                <button
                  className={`${
                    modalData.completed
                      ? "bg-[#4F7383] text-[#1E3D4B]"
                      : "bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white"
                  }   rounded-xl h-14 px-2 py-1 flex items-center justify-center text-2xl mb-16`}
                  disabled={modalData.completed}
                  onClick={handleSubmitEmailAddress}
                >
                  {modalData.completed ? "Submitted" : "Submit"}
                </button>
              </>
            )}

            {/* Follow X account */}
            {modalData.type === "twitter_follow" && (
              <>
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <div
                      className="bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white rounded-xl h-14 mb-4 flex items-center justify-center text-2xl w-[30%]"
                      // to={modalData.link ?? "#"}
                      // target="blank"
                      onClick={() => handleFollowTwitterClick(modalData.link)}
                    >
                      {modalData.completed ? "Visit X" : "Follow"}
                    </div>
                  </div>
                  <input
                    value={xAddress}
                    onChange={(e) => {
                      if (!modalData.completed) setxAddress(e.target.value);
                    }}
                    placeholder="@Your TwitterHandler"
                    className="text-2xl pl-3 pr-4 py-2 h-16 rounded-xl w-full bg-[#1E3D4B] border border-[#4F7383] mb-4"
                  />
                  {modalData.completed && (
                    <div className="absolute right-4 top-[100px] transform -translate-y-1/2 flex items-center justify-center w-6 h-6 bg-[#239827] rounded-full">
                      <img
                        src="/image/icon/verify_checkmark.svg"
                        alt="verify_checkmark"
                      />
                    </div>
                  )}
                  <div className="flex justify-center gap-[6px] mb-3">
                    <img
                      src="/image/coin_small.svg"
                      className="w-10 h-10"
                      alt="coin"
                    />
                    <p className="text-white text-2xl">+{modalData.prize}</p>
                  </div>

                  <button
                    className={`${
                      isFollowingX && !modalData.completed
                        ? "bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white"
                        : "bg-[#4F7383] text-[#1E3D4B] cursor-not-allowed"
                    }   
                    rounded-xl h-14 px-2 py-1 flex items-center justify-center text-2xl w-full mb-16`}
                    onClick={handleVerifyTwitterClick}
                    disabled={!isFollowingX || modalData.completed}
                  >
                    {isVerifying ? (
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
                      "Verify"
                    )}
                  </button>
                </div>
              </>
            )}

            {/* Join Our Telegram */}
            {modalData.type === "telegram_join" && (
              <>
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <button
                      className="bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white rounded-xl h-14 mb-4 flex items-center justify-center text-2xl w-[30%]"
                      onClick={() => handleFollowTelegramClick(modalData.link)}
                    >
                      {modalData.completed ? "Visit" : "Follow"}
                    </button>
                  </div>
                  <div className="flex justify-center gap-[6px] mb-3">
                    <img
                      src="/image/coin_small.svg"
                      className="w-10 h-10"
                      alt="coin"
                    />
                    <p className="text-white text-2xl">+{modalData.prize}</p>
                  </div>
                  <button
                    className={`${
                      isFollowingTelegram && !modalData.completed
                        ? "bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white"
                        : "bg-[#4F7383] text-[#1E3D4B] cursor-not-allowed"
                    }   
                    rounded-xl h-14 px-2 py-1 flex items-center justify-center text-2xl w-full mb-16`}
                    onClick={handleVerifyTelegramClick}
                    disabled={!isFollowingTelegram || modalData.completed}
                  >
                    {isVerifying ? (
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
                      "Verify"
                    )}
                  </button>
                </div>
              </>
            )}

            {/* Join Our Discord */}
            {modalData.type === "discord_join" && (
              <>
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <button
                      className="bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white rounded-xl h-14 mb-4 flex items-center justify-center text-2xl w-[30%]"
                      onClick={() => handleFollowDiscordClick(modalData.link)}
                    >
                      {modalData.completed ? "Visit" : "Join"}
                    </button>
                  </div>
                  <div className="flex justify-center gap-[6px] mb-3">
                    <img
                      src="/image/coin_small.svg"
                      className="w-10 h-10"
                      alt="coin"
                    />
                    <p className="text-white text-2xl">+{modalData.prize}</p>
                  </div>
                  <button
                    className={`${
                      isFollowingDiscord && !modalData.completed
                        ? "bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white"
                        : "bg-[#4F7383] text-[#1E3D4B] cursor-not-allowed"
                    }   
                    rounded-xl h-14 px-2 py-1 flex items-center justify-center text-2xl w-full mb-16`}
                    onClick={handleVerifyDiscordVisit}
                    disabled={!isFollowingDiscord || modalData.completed}
                  >
                    {isVerifying ? (
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
                      "Claim"
                    )}
                  </button>
                </div>
              </>
            )}

            {/* Join Our Linkedin */}
            {modalData.type === "visit_linkedin" && (
              <>
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <button
                      className="bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white rounded-xl h-14 mb-4 flex items-center justify-center text-2xl w-[30%]"
                      onClick={() => handleFollowLinkedinClick(modalData.link)}
                    >
                      {modalData.completed ? "Visit" : "Follow"}
                    </button>
                  </div>
                  <div className="flex justify-center gap-[6px] mb-3">
                    <img
                      src="/image/coin_small.svg"
                      className="w-10 h-10"
                      alt="coin"
                    />
                    <p className="text-white text-2xl">+{modalData.prize}</p>
                  </div>
                  <button
                    className={`${
                      isFollowingLinkedIn && !modalData.completed
                        ? "bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white"
                        : "bg-[#4F7383] text-[#1E3D4B] cursor-not-allowed"
                    }   
                    rounded-xl h-14 px-2 py-1 flex items-center justify-center text-2xl w-full mb-16`}
                    onClick={() => handleVerifyLinkedInVisit()}
                    disabled={!isFollowingLinkedIn || modalData.completed}
                  >
                    {isVerifying ? (
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
                      "Verify"
                    )}
                  </button>
                </div>
              </>
            )}

            {/* Join Our warpcast */}
            {modalData.type === "visit_warpcast" && (
              <>
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <button
                      className="bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white rounded-xl h-14 mb-4 flex items-center justify-center text-2xl w-[30%]"
                      onClick={() => handleFollowWarpcastClick(modalData.link)}
                    >
                      {modalData.completed ? "Join" : "Join"}
                    </button>
                  </div>
                  <div className="flex justify-center gap-[6px] mb-3">
                    <img
                      src="/image/coin_small.svg"
                      className="w-10 h-10"
                      alt="coin"
                    />
                    <p className="text-white text-2xl">+{modalData.prize}</p>
                  </div>
                  <button
                    className={`${
                      isFollowingWarpcast && !modalData.completed
                        ? "bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white"
                        : "bg-[#4F7383] text-[#1E3D4B] cursor-not-allowed"
                    }   
                    rounded-xl h-14 px-2 py-1 flex items-center justify-center text-2xl w-full mb-16`}
                    onClick={() => handleVerifyWarpCastVisit()}
                    disabled={!isFollowingWarpcast || modalData.completed}
                  >
                    {modalData.completed ? "Verify" : "Verify"}
                    {isVerifying ? (
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
                      "Verify"
                    )}
                  </button>
                </div>
              </>
            )}

            {/* Join Our podcast */}
            {modalData.type === "visit_podcast" && (
              <>
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <button
                      className="bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white rounded-xl h-14 mb-4 flex items-center justify-center text-2xl w-[30%]"
                      onClick={() => handleFollowPodcastClick(modalData.link)}
                    >
                      {modalData.completed ? "Join" : "Join"}
                    </button>
                  </div>
                  <div className="flex justify-center gap-[6px] mb-3">
                    <img
                      src="/image/coin_small.svg"
                      className="w-10 h-10"
                      alt="coin"
                    />
                    <p className="text-white text-2xl">+{modalData.prize}</p>
                  </div>
                  <button
                    className={`${
                      isFollowingPodcast && !modalData.completed
                        ? "bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white"
                        : "bg-[#4F7383] text-[#1E3D4B] cursor-not-allowed"
                    }   
                    rounded-xl h-14 px-2 py-1 flex items-center justify-center text-2xl w-full mb-16`}
                    onClick={() => handleVerifyPodcastVisit()}
                    disabled={!isFollowingPodcast || modalData.completed}
                  >
                    {isVerifying ? (
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
                      "Verify"
                    )}
                  </button>
                </div>
              </>
            )}

            {/* Join Our facebook */}
            {modalData.type === "visit_facebook" && (
              <>
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <button
                      className="bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white rounded-xl h-14 mb-4 flex items-center justify-center text-2xl w-[30%]"
                      onClick={() => handleFollowFacebookClick(modalData.link)}
                    >
                      {modalData.completed ? "Follow" : "Follow"}
                    </button>
                  </div>
                  <div className="flex justify-center gap-[6px] mb-3">
                    <img
                      src="/image/coin_small.svg"
                      className="w-10 h-10"
                      alt="coin"
                    />
                    <p className="text-white text-2xl">+{modalData.prize}</p>
                  </div>
                  <button
                    className={`${
                      isFollowingFacebook && !modalData.completed
                        ? "bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white"
                        : "bg-[#4F7383] text-[#1E3D4B] cursor-not-allowed"
                    }   
                    rounded-xl h-14 px-2 py-1 flex items-center justify-center text-2xl w-full mb-16`}
                    onClick={() => handleVerifyFacebookVisit()}
                    disabled={!isFollowingFacebook || modalData.completed}
                  >
                    {isVerifying ? (
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
                      "Verify"
                    )}
                  </button>
                </div>
              </>
            )}

            {/* Join Our youtube */}
            {modalData.type === "visit_youtube" && (
              <>
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <button
                      className="bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white rounded-xl h-14 mb-4 flex items-center justify-center text-2xl w-[30%]"
                      onClick={() => handleFollowYoutubeClick(modalData.link)}
                    >
                      {modalData.completed ? "Follow" : "Follow"}
                    </button>
                  </div>
                  <div className="flex justify-center gap-[6px] mb-3">
                    <img
                      src="/image/coin_small.svg"
                      className="w-10 h-10"
                      alt="coin"
                    />
                    <p className="text-white text-2xl">+{modalData.prize}</p>
                  </div>
                  <button
                    className={`${
                      isFollowingYoutube && !modalData.completed
                        ? "bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white"
                        : "bg-[#4F7383] text-[#1E3D4B] cursor-not-allowed"
                    }   
                    rounded-xl h-14 px-2 py-1 flex items-center justify-center text-2xl w-full mb-16`}
                    onClick={() => handleVerifyYouTubeVisit()}
                    disabled={!isFollowingYoutube || modalData.completed}
                  >
                    {isVerifying ? (
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
                      "Verify"
                    )}
                  </button>
                </div>
              </>
            )}

            {/* Join Our instagram */}
            {modalData.type === "visit_instagram" && (
              <>
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <button
                      className="bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white rounded-xl h-14 mb-4 flex items-center justify-center text-2xl w-[30%]"
                      onClick={() => handleFollowInstagramClick(modalData.link)}
                    >
                      {modalData.completed ? "Follow" : "Follow"}
                    </button>
                  </div>
                  <div className="flex justify-center gap-[6px] mb-3">
                    <img
                      src="/image/coin_small.svg"
                      className="w-10 h-10"
                      alt="coin"
                    />
                    <p className="text-white text-2xl">+{modalData.prize}</p>
                  </div>
                  <button
                    className={`${
                      isFollowingInstagram && !modalData.completed
                        ? "bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white"
                        : "bg-[#4F7383] text-[#1E3D4B] cursor-not-allowed"
                    }   
                    rounded-xl h-14 px-2 py-1 flex items-center justify-center text-2xl w-full mb-16`}
                    onClick={() => handleVerifyInstagramVisit()}
                    disabled={!isFollowingInstagram || modalData.completed}
                  >
                    {isVerifying ? (
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
                      "Verify"
                    )}
                  </button>
                </div>
              </>
            )}

            {/* Join Our Website */}
            {modalData.type === "website_visit" && (
              <>
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <div
                      className="bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white rounded-xl h-14 mb-4 flex items-center justify-center text-2xl w-[30%]"
                      onClick={() => handleFollowClick(modalData.link)}
                    >
                      Visit
                    </div>
                  </div>
                  <div className="flex justify-center gap-[6px] mb-3">
                    <img
                      src="/image/coin_small.svg"
                      className="w-10 h-10"
                      alt="coin"
                    />
                    <p className="text-white text-2xl">+{modalData.prize}</p>
                  </div>
                  <button
                    className={`${
                      isVisitingWebsite && !modalData.completed
                        ? "bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white"
                        : "bg-[#4F7383] text-[#1E3D4B] cursor-not-allowed"
                    }   
                  rounded-xl h-14 px-2 py-1 flex items-center justify-center text-2xl w-full mb-16`}
                    onClick={handleVerifyWebsite}
                    disabled={!isVisitingWebsite || modalData.completed}
                  >
                    

                    {isVerifying ? (
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
                      modalData.completed ? "Come back tomorrow again" : "Claim"
                    )}
                  </button>
                </div>
              </>
            )}
            {modalData.type === QuestType.RETWEET_X_POST && (
              <div
                className={`${
                  modalData.completed
                    ? "bg-[#4F7383] text-[#1E3D4B]"
                    : "bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white"
                }   rounded-xl h-14 px-2 py-1 flex items-center justify-center text-2xl`}
                // to={modalData.link ?? ''}
                // target="blank"
              >
                {modalData.completed ? "Done!" : "Retweet"}
              </div>
            )}
          </div>
        </>
      )}

      {walletModalVisible && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center"
            onClick={() => setWalletModalVisible(false)}
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
              className="flex justify-center items-center w-full h-16 px-2 py-1 bg-gradient-to-r from-[#07AEEA] to-[#D3984E] rounded-xl cursor-pointer gap-2 text-lg"
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
