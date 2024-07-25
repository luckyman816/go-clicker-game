/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import '../StreakScreen.css';
import { useNavigate } from "react-router-dom";

const Streak: React.FC = () => {
    const navigate = useNavigate();
  // @ts-ignore: TS6133

    const [claimStatus, setClaimStatus] = useState<'pending' | 'success' | 'error' | 'idle'>('idle');

    // Simulated data for days
    const days = [
        { day: 'Day 1', amount: 5, status: 'claimed' },
        { day: 'Day 2', amount: 10, status: 'available' },
        { day: 'Day 3', amount: 15, status: 'upcoming' },
        { day: 'Day 4', amount: 20, status: 'upcoming' },
        { day: 'Day 5', amount: 25, status: 'upcoming' },
        { day: 'Day 6', amount: 30, status: 'upcoming' },
        { day: 'Day 7', amount: 35, status: 'upcoming' },
        { day: 'Day 9', amount: 40, status: 'upcoming' },
        { day: 'Day 10', amount: 25, status: 'upcoming' },
        { day: 'Day 11', amount: 30, status: 'upcoming' },
        { day: 'Day 12', amount: 35, status: 'upcoming' },
        { day: 'Day 13', amount: 40, status: 'upcoming' },
    ];

    const DayCard: React.FC<{ day: string; amount: number; status: 'claimed' | 'available' | 'upcoming' }> = ({
        day,
        amount,
        status,
    }) => {
        let cardClass = 'day-card';

        switch (status) {
            case 'claimed':
                cardClass += ' claimed';
                break;
            case 'available':
                cardClass += ' available';
                break;
            case 'upcoming':
                cardClass += ' upcoming';
                break;
            default:
                break;
        }

        return (
            <div className={cardClass}>
                <div className="day">{day}</div>
                <img src='/image/coin_small.svg' alt="Coin Icon" className="coin-icon" />
                <div className="amount">{amount} Coins</div>
            </div>
        );
    };


    const handleClaim = () => {
        // Simulate claim process
        setClaimStatus('pending');
        setTimeout(() => {
            // Simulate success after some delay
            setClaimStatus('success');
            // console.log('Rewards claimed!');
        }, 2000); // Simulate a 2 second delay
    };

    return (
        <>
            <button className="absolute left-[22px] top-[15px] bg-transparent p-0 border-none" onClick={() => navigate(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="white" />
                </svg>
            </button>
            <div className="flex flex-col justify-between h-screen p-2">
                <div className="content-wrapper">
                    <h1 className="heading mt-4">Streak</h1>
                    <div className="day-grid mt-10">
                        {days.map((day, index) => (
                            // @ts-ignore: TS2322
                            <DayCard key={index} day={day.day} amount={day.amount} status={day.status} />
                        ))}
                    </div>
                </div>
                <button
                    className={`bg-gradient-to-r from-[#07AEEA] to-[#D3984E] text-white rounded-xl h-16  px-36 py-7 flex items-center justify-center text-2xl mt-4 mb-4 mx-4`}
                    onClick={handleClaim}
                >
                    Claim
                </button>
            </div>
        </>

    );
};

export default Streak;
