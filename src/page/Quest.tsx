// import { useNavigate } from "react-router-dom";
import QuestList from "../component/QuestList";
interface QuestProps {
  goToHome: () => void;
}

export default function Quest({goToHome}: QuestProps) {
  // const navigate = useNavigate();

  return (
    <div className="max-h-[932px] mx-auto flex flex-col justify-start">
      <div className="mx-auto pt-[10px] relative w-full h mb-[10px]">
        <button className="absolute left-[22px] top-[15px] bg-transparent p-0 border-none" 
        onClick={goToHome}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="white" />
          </svg>
        </button>
        <h1 className="heading mt-4">Complete Tasks <br/> & Earn Bonuses</h1>

      </div>
      <div className="px-[16px] mt-5">
        <QuestList />
      </div>
    </div>
  );
}
