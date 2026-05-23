import React, {useState,useEffect} from "react";

import axios from "axios";
import '../style.css';

export default function Board(){
  const getStartedButtonStyles = 'rounded-full bg-black py-1 px-2 text-white  hover:bg-green-900 focus:bg-green-900'; 
  const [codeforcesLeaderboard, setCodeforcesLeaderboard] = useState([]);
  const [codechefLeaderboard, setCodechefLeaderboard] = useState([]);
  const [leetcodeLeaderboard, setLeetcodeLeaderboard] = useState([]);
  const [activePlatform, setActivePlatform] = useState('codeforces');
  useEffect(() => {
    fetchLeaderboard('codeforces'); // Fetch Codeforces leaderboard by default
  }, []);
  const fetchLeaderboard = async (platform) => {
    try {
      const response = await axios.get(`https://code-hub-808r.onrender.com/board/${platform}`);
      switch (platform) {
        case 'codeforces':
          setCodeforcesLeaderboard(response.data);
          break;
        case 'codechef':
          setCodechefLeaderboard(response.data);
          break;
        case 'leetcode':
          setLeetcodeLeaderboard(response.data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const handlePlatformChange = (platform) => {
    setActivePlatform(platform);
    fetchLeaderboard(platform);
  };

  return(
    <div className="board">
      <h1 className=" text-4xl text-black-600 font-extrabold">Leaderboards</h1>
      <div className="platforms">
        <button onClick={() => handlePlatformChange('codeforces')} className={getStartedButtonStyles}>CodeForces</button>
        <button onClick={() => handlePlatformChange('codechef')} className={getStartedButtonStyles}>CodeChef</button>
        <button onClick={() => handlePlatformChange('leetcode')} className={getStartedButtonStyles}>LeetCode</button>
      </div>
      <div>
        {activePlatform === 'codeforces' && (
          <LeaderboardTable1 leaderboard={codeforcesLeaderboard} platform="Codeforces" />
        )}
        {activePlatform === 'codechef' && (
          <LeaderboardTable2 leaderboard={codechefLeaderboard} platform="Codechef" />
        )}
        {activePlatform === 'leetcode' && (
          <LeaderboardTable3 leaderboard={leetcodeLeaderboard} platform="LeetCode" />
        )}
      </div>
    </div>
  )
}

const LeaderboardTable1 = ({ leaderboard, platform }) => {
  return (
    <div >
      <h2 className="text-lg font-semibold mb-4">Leaderboard - {platform}</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200" >
            <th className="w-16 px-4 py-2">Rank</th>
            <th className="w-64 px-4 py-2">Name</th>
            <th className="w-64 px-4 py-2">Username</th>
            <th className="w-16 px-4 py-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.codeforces}</td>
              <td className="border px-4 py-2">{user.forcesRating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const LeaderboardTable2 = ({ leaderboard, platform }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Leaderboard - {platform}</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200" >
            <th className="w-16 px-4 py-2">Rank</th>
            <th className="w-64 px-4 py-2">Name</th>
            <th className="w-64 px-4 py-2">Username</th>
            <th className="w-16 px-4 py-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.codechef}</td>
              <td className="border px-4 py-2">{user.chefRating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const LeaderboardTable3 = ({ leaderboard, platform }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Leaderboard - {platform}</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200" >
            <th className="w-16 px-4 py-2">Rank</th>
            <th className="w-64 px-4 py-2">Name</th>
            <th className="w-64 px-4 py-2">Username</th>
            <th className="w-16 px-4 py-2">Ranking</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.leetcode}</td>
              <td className="border px-4 py-2">{user.leetRating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
