import "./App.css";
import Home from "./page/Home";
import Quest from "./page/Quest";
import { ToastContainer } from "react-toastify";
// import Footer from "./component/Footer";
import Leaderboard from "./component/Leaderboard";
import SplashScreen from "./component/SplashScreen";
import Referrals from "./page/Referrals";
import { EnergyProvider } from "./hooks/EnergyContext";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useEffect, useState } from "react";
import Boost from "./page/Boost";

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [showSplash, setShowSplash] = useState(true);
  const [showBoostScreen, setShowBoostScreen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Duration in milliseconds (e.g., 3 seconds)

    return () => clearTimeout(timer);
  }, []);

  const goToHome = () => {
    setSelectedIndex(0);
    setShowBoostScreen(false);
  };

  const goToBoost = () => {
    console.log("boost");
    setShowBoostScreen(true);
  };

  return (
  <>
    <ToastContainer />
    {showSplash ? (
      <SplashScreen />
    ) : (
      <div className="w-full">
        {showBoostScreen ? (
          <Boost goToHome={goToHome} />
        ) : (
          <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <TabList>
              <div className="flex fixed z-20 flex-row items-center bottom-0 w-full h-[65px] justify-between bg-navbar-gradient px-4">
                <Tab className="text-white bg-transparent outline-none focus:outline-none w-20 h-20 flex flex-col items-center justify-center">
                  <img
                    src="/image/icon/home.svg"
                    className="w-10 h-10"
                    alt="Refs"
                  />
                  <span className="text-xs">Home</span>
                </Tab>
                <Tab className="text-white bg-transparent outline-none focus:outline-none w-20 h-20 flex flex-col items-center justify-center">
                  <img
                    src="/image/icon/refs_icon.svg"
                    className="w-10 h-10"
                    alt="Refs"
                  />
                  <span className="text-xs">Refs</span>
                </Tab>
                <Tab className="text-white bg-transparent outline-none focus:outline-none w-20 h-20 flex flex-col items-center justify-center">
                  <img
                    src="/image/icon/icon_tasks.svg"
                    className="w-10 h-10"
                    alt="Tasks"
                  />
                  <span className="text-xs">Tasks</span>
                </Tab>
                <Tab className="text-white bg-transparent outline-none focus:outline-none w-20 h-20 flex flex-col items-center justify-center">
                  <img
                    src="/image/icon/icon_ranks.svg"
                    className="w-10 h-10"
                    alt="Ranks"
                  />
                  <span className="text-xs">Ranks</span>
                </Tab>
              </div>
            </TabList>
            <TabPanels>
              <TabPanel>
                <EnergyProvider>
                  <Home goToBoost={goToBoost} />
                </EnergyProvider>
              </TabPanel>
              <TabPanel>
                <Referrals goToHome={goToHome} />
              </TabPanel>
              <TabPanel>
                <Quest goToHome={goToHome} />
              </TabPanel>
              <TabPanel>
                <Leaderboard goToHome={goToHome} />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        )}
      </div>
    )}
  </>
  )
}

export default App;
