/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useTonAddress } from "@tonconnect/ui-react";
interface ReferralsProps {
  goToHome: () => void;
}
const Referrals = ({goToHome}: ReferralsProps) => {
  const address = useTonAddress();
  const TgBotHandle = import.meta.env.VITE_TGBOT_HANDLE;
  const [referralLink, setReferralLink] = useState<string>(
    `https://t.me/${TgBotHandle}`
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [referralDetails, setReferralDetails] = useState<any>([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const getReferrals = async () => {
      await getReferralCode();
      await getReferralDetails();
    };

    getReferrals();
  }, []);

  const getReferralCode = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/api/v1/users/getReferralCode`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            walletAddress: address
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const data = await response.json();
      if (!data) {
        throw new Error("Invalid response data");
      }
      setReferralLink(`https://t.me/${TgBotHandle}?start=${data.referralCode}`);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const getReferralDetails = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/api/v1/users/getReferralDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            walletAddress: address
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const data = await response.json();
      if (!data) {
        throw new Error("Invalid response data");
      }
      // console.log("Referral Details: ", data);
      setReferralDetails(data.referralDetail);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  // const navigate = useNavigate();

  const handleCopyLink = () => {
    setCopied(true);
    setModalVisible(true);
  };

  return (
    <>
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
      <div className="flex flex-col justify-between p-2">
        <div className="content-wrapper px-4">
          <>
            {" "}
            <h1 className="heading mt-4">Referrals</h1>
            <h5 className="text-lg mt-2">
              You and your friend will receive bonuses
            </h5>
            <div className="transform w-full mt-2 py-2 shadow-lg bg-[#1E3D4B] rounded-md flex items-center justify-center gap-5">
              <div>
                <img src="/image/gift.png" alt="check" className="w-8 h-8" />
              </div>
              <div className="text-start">
                <p className="text-2xl font-bold">Invite a friend</p>
                <div className="flex justify-center items-center">
                  <img
                    src="/image/coin_small.svg"
                    alt="coin"
                    className="w-6 h-6"
                  />
                  <span className="text-2xl ml-1">+1000</span>
                  <span className="text-[12px] ml-2">
                    for you and your friend
                  </span>
                </div>
              </div>
            </div>
            <p className="text-2xl w-full mt-4" style={{ textAlign: "start" }}>
              My Referrals:
            </p>
          </>

          {referralDetails && referralDetails.length > 0 ? (
            <div className="w-full flex flex-col overflow-auto max-h-[45vh]">
              {referralDetails.map((item: any, index: number) => (
                <div
                  key={index}
                  className="transform w-full mt-2 py-2 shadow-xl flex items-center justify-between gap-5"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src="/image/user.jpg"
                      alt="check"
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="text-start">
                      <p className="text-lg">
                        {item.telegram_firstname} {item.telegram_lastname}{" "}
                      </p>
                      <div className="flex justify-start items-center">
                        <img
                          src="/image/coin_small.svg"
                          alt="coin"
                          className="w-4 h-4 mr-2"
                        />
                        <span>{item.totalScore}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-start">
                    <p className="text-2xl font-bold">{item.name}</p>
                    <div className="flex justify-center items-center">
                      <img
                        src="/image/coin_small.svg"
                        alt="coin"
                        className="w-6 h-6"
                      />
                      <span className="text-2xl ml-1">+1000</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // <div className="flex flex-col items-center justify-center h-full">
            //   <div className="transform w-full mt-2 py-2 shadow-lg bg-[#1E3D4B] rounded-md flex items-center justify-center gap-5 mt-4">
            //     <div className="text-start">
            //       <p className="text-xl font-bold text-white">You do not have any referrals yet</p>
            //     </div>
            //   </div>
            // <div className="mt-auto text-2xl text-[#D99748] text-center mt-2">
            //   Tap the button below to copy and
            //   <br /> share the link with your friends!
            // </div>
            // </div>

            <div className="flex flex-col items-center justify-center h-full w-full">
              <div className="w-full mt-2 py-4 shadow-lg bg-[#1E3D4B] rounded-md flex items-center justify-center gap-5">
                <div className="text-start">
                  <p className="text-xl font-bold text-white">
                    You do not have any referrals yet
                  </p>
                </div>
              </div>
              <div className="text-2xl text-[#D99748] text-center mt-14">
                Tap the button below to copy and
                <br /> share the link with your friends!
              </div>
            </div>
          )}
        </div>
        <CopyToClipboard text={referralLink} onCopy={handleCopyLink}>
          <button
            className={`bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white rounded-xl h-16 py-7 flex items-center justify-center text-2xl mt-4 mb-4 mx-4`}
          >
            <img
              src="/image/icon/copy.svg"
              alt="copy"
              className="w-6 h-6 mr-2"
            />{" "}
            {copied ? "Copied" : "Copy referral link"}
          </button>
        </CopyToClipboard>
      </div>
      {modalVisible && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center"
            onClick={() => setModalVisible(false)}
          ></div>

          <div className="fixed top-4 left-0 right-0 mx-3 transform py-2 shadow-lg bg-[#1E3D4B] rounded-full flex items-center justify-around animate-slide-in-bottom transition-all overflow-y-auto">
            <div>
              <img src="/image/check.png" alt="check" className="w-8 h-8" />
            </div>
            <p className="text-2xl font-bold text-center">
              Referral link copied
            </p>
            <div className="flex justify-center items-center">
              <button
                className="text-black bg-[#4F7383] p-1 rounded-full flex items-center justify-center w-8 h-8"
                onClick={() => setModalVisible(false)}
              >
                <img
                  src="/image/icon/close_icon.svg"
                  alt="close"
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Referrals;
