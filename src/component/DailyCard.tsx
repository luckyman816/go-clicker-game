/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import './StreakScreen.css';
import CoinIcon from './CoinIcon.svg';

interface DayCardProps {
    day: string;
    amount: number;
}

const DayCard: React.FC<DayCardProps> = ({ day, amount }) => {
    const [rewardCompleted, setRewardCompleted] = useState(false);
  // @ts-ignore: TS6133
    const completeReward = () => {
        // Logic to mark the reward as completed, if needed
        setRewardCompleted(true);
    };

    return (
        <div className={`day-card ${rewardCompleted ? 'completed' : ''}`}>
            <div className="day">{day}</div>
            <img src={CoinIcon} alt="Coin Icon" className="coin-icon" />
            <div className="amount">{amount} Coins</div>

        </div>
    );
};

export default DayCard;
