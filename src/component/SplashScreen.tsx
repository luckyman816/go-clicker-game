/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

const ProgressBar = ({ duration }: { duration: number }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
	let interval: any;

	if (value < 100) {
	  interval = setInterval(() => {
		setValue((prev) => Math.min(prev + 1, 100));
	  }, duration / 100); // Adjusting the interval to match the duration
	}

	return () => clearInterval(interval);
  }, [value, duration]);

  return (
	<div className="flex items-center justify-center">
	  <div className="w-full radial-gradient flex items-center h-auto">
		<div
		  className="linear-gradient h-[5px]"
		  style={{ width: `${value}%` }}
		></div>
	  </div>
	</div>
  );
};
export default function SplashScreen() {
  const duration = 3000; // Duration in milliseconds (e.g., 3 seconds)

  return (
	<>
	  <ProgressBar duration={duration} />
	  <div className="splash-screen relative flex items-center justify-center w-full h-full">
		<img
		  src="/image/splash_screen.jpg"
		  className="w-full h-full object-cover"
		  alt="Splash Screen"
		/>

		<img
		  src="/image/splash_screen_logo.svg"
		  className="mx-auto absolute top-[10%]"
		  alt="Splash Screen"
		/>
		<img
		  src="/image/splash_screen_text.svg"
		  className="mx-auto absolute top-[25%]"
		  alt="Splash Screen"
		/>
		<img
		  src="/image/splash_screen_social.svg"
		  className="mx-auto absolute bottom-[5%]"
		  alt="Splash Screen"
		/>
	  </div>
	</>
  );
}