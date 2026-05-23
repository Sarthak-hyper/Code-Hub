import React, { useEffect, useState } from "react";
import "../style.css";
import { Link } from "react-router-dom";
import "../upcoming.css";
import bg from "../../resources/backvideo(low).mp4";
import Board from "../othercomponents/board.js";
import UserInitials from "../othercomponents/userInitials.js";
import axios from "axios";

function Landingpage() {
  const [userName, setUserName] = useState("Profile");
  const [nextContest, setNextContest] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleleet = () => {
    window.location.href = "https://leetcode.com/contest/";
  };
  const handlecc = () => {
    window.location.href = "https://www.codechef.com/contests";
  };
  const handlecf = () => {
    window.location.href = "https://codeforces.com/contests";
  };

  const videoStyles = {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const navStyles = {
    backgroundColor: "rgba(0, 0, 0, 1)",
    padding: "10px",
    position: "sticky",
    top: 0,

    width: "100%",
    zIndex: 1000,
    transition: "color 0.3s ease",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const navTitleStyles = {
    margin: 0,
    fontSize: "1.5rem",
    transition: "font-size 0.3s ease",
  };

  const navItemStyles = {
    margin: "0 10px",
    color: "white",
    textDecoration: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  };

  const profileCircleStyles = {
    width: "30px",
    height: "30px",
    marginLeft: "2em",
    borderRadius: "50%",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    marginLeft: "2em",
  };

  const getStartedButtonStyles =
    "rounded-full bg-white py-2 px-4 text-black hover:bg-gray-200 focus:bg-gray-200";

  const getStartedButtonStylesnew =
    "rounded-full bg-black py-2 px-4 text-white hover:bg-green-200 focus:bg-green-200 mt-1";

  const mainStyles = {
    overflowX: "hidden",
  };

  const sectionStyles = {
    background: "white",
    padding: "40px",
  };

  const scrollToSection = () => {
    const section = document.getElementById("leaderboards-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [nextWednesday, setNextWednesday] = useState("");
  function getNextLeetCodeContest() {
    const today = new Date();
    const dayOfWeek = today.getDay();

    if (dayOfWeek === 0) {
      return "Today";
    }

    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + (7 - dayOfWeek));

    if (nextSunday > today) {
      return nextSunday.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      });
    }

    nextSunday.setDate(nextSunday.getDate() + 7);
    return nextSunday.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  }

  const calculateNextWednesday = () => {
    const today = new Date();
    let dayOfWeek = today.getDay();
    if (dayOfWeek === 3) {
      dayOfWeek = 10;
    }
    const daysUntilWednesday = (10 - dayOfWeek + 7) % 7;
    const nextWednesdayDate = new Date(
      today.getTime() + daysUntilWednesday * 24 * 60 * 60 * 1000
    );
    const nextWednesdayFormatted = `${
      nextWednesdayDate.getMonth() + 1
    }/${nextWednesdayDate.getDate()}/${nextWednesdayDate.getFullYear()}`;
    setNextWednesday(nextWednesdayFormatted);
  };

  useEffect(() => {
    calculateNextWednesday();
    const interval = setInterval(calculateNextWednesday, 24 * 36000000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchNextContest = async () => {
      try {
        const response = await axios.get(
          "https://codeforces.com/api/contest.list?gym=false"
        );
        const contests = response.data.result.filter(
          (contest) => contest.phase === "BEFORE"
        );
        if (contests.length > 0) {
          const nextContest = contests[contests.length - 1];
          setNextContest(nextContest);
        }
      } catch (error) {
        console.error("Error fetching next contest:", error);
      }
    };

    fetchNextContest();

    const interval = setInterval(fetchNextContest, 24 * 3600000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://code-hub-808r.onrender.com/user/details`, {
          withCredentials: true,
        });
        setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const [nextLeetContest, setNextLeetContest] = useState(null);

  useEffect(() => {
    const next = getNextLeetCodeContest();
    setNextLeetContest(next);
    const intervall = setInterval(next, 24 * 3600000);

    return () => clearInterval(intervall);
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div style={mainStyles}>
      {/* Navbar */}
      <div style={navStyles}>
        <div>
          <h2 style={navTitleStyles} className="text-white">
            Code Hub
          </h2>
        </div>

        <div className="hamburger-menu" onClick={handleMenuToggle}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Navbar links */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" style={navItemStyles}>
            Home
          </Link>
          <a
            style={navItemStyles}
            href="#leaderboards"
            onClick={scrollToSection}
          >
            Leaderboards
          </a>
          <Link to="/team" style={navItemStyles}>
            About Us
          </Link>
          <a style={navItemStyles} href="#question-bank">
            Practice
          </a>
        </div>
        <div style={profileCircleStyles}>
          {userName === 'Profile'?(
          <Link to="/login">
            <UserInitials name={userName} />
          </Link>
          ):(
          <Link to="/profile">
            <UserInitials name={userName} />
          </Link>)}
        </div>
      </div>

      <main className="relative h-screen w-screen">
        <video autoPlay loop muted style={videoStyles}>
          <source src={bg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div
          className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-white flex items-center main-container-started"
          style={{ maxWidth: "80%", width: "fit-content" }}
        >
          <div className="mr-8 container-started">
            <h1
              className="text-9xl font-bold mb-2 custom-font"
              id="codeHubTitle"
            >
              Code Hub
            </h1>

            <p className="text-lg mb-4" style={{ whiteSpace: "nowrap" }}>
              Let us compete here in the arena
            </p>
            <Link to="/register">
              <button className={getStartedButtonStyles}>Get Started</button>
            </Link>
          </div>
        </div>

        <div className="pos-cards stylediv">
          <h2 className="text-4xl font-bold mb-1 text-white custom-font">
            Upcoming Contests
          </h2>
          <div className="cards">
            <div className="card">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAsVBMVEX///9PgcH/1ACuDwpHfL+ctNj/0QD/9typAADv3NxhjMatBAD/4XTTl5f/1zC0NDI9d72Co9Fpksm6y+Tc5fGnvd08dr3T3u5WhsPo7vawxOGhudv/9tP/7rH/1hP//vfZoJ+wFxP/54v/7az/6JT//fL/9Mr/3VL/31z/4Wz/5ID/8Lv/2z/57u3lwcDqzMveray/U1G6RkTJc3HQiIfNgYD/++nEZmX25+a5QT7CXVtLKWyXAAADgElEQVR4nO3daVPaQBjA8RhjDAQxAcJlBe8DgXJVab//B2s4qu10Zo+nQ5Nt///XZmd/86zgG7OeR0RERERERERERERE9F/UytJGVVUjzVpFb/IPanaTIDhSFwRJt1n0RoW1qjrdu7Lq5BybbUPfpraDY8xsgDkxK3rDtjUTK+DRUeLYFHu2wJzYK3rTVjVMP2Q+ChpFb9qmjv0I8yF2it62Ran9CPMhpkVv2yLJCPMhFr1t80SH1Klj2pcc0vyY9oveuHEXQuFF0Rs37kQoPCl648YhRFj+ECIsfwgRlj+ECMsfQoTlDyHC8ocQYflDiLD8IUR4qE4vb2rKRrefzFYqp/CyHoahry4MB3f3jgoffJ3uHXnrpPDG0Lc1Pg7dEz5ZAPMGOmLphDU7oO/XHRNe2gL98Nkp4b01MCc+uCQcCYSac1ou4VDg0w2xXMIXyQh9v+aOcCQC+r47wrEMGKr+eiuXcCAUnjojlAERIkSIECFChAgRIkSI0HnhZHp1pmz22Wnh7DyKolhZ/gPzqavC6XUUHxsUR4uKk8KlmW9nvHJQuIhMfZuipXPCufEA98SVY8KV1QS3xKlTwoo18DiOnRIuLM/odogrh4SCEe6G6Izwi2CE299EZ4TXImG8ckY4kRzSXLhwRij6Ncy7/ueFxwgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSI8ADCQ7xH+BB3q8v/H78uFL4qdtMXCvuKNdfCdyqcezWZUPk+704iEiYd1aKxiBgvBTcjbHtSbcYTCpVrvsnebTITXY2QH9IX5W5SyTENUuWaU9EMo4nnPYlmqNyM7JiqD6ns9S3xW/7gq+R+C911Og37IQYNzZozwRCj9eZJm2t09o01m/F69kNMerpFv1oPcfc6M8nlAfpLn5q2xKSpXXMSWxLj+f7Joe13ourb/kdZ2wrYzgzWrNgR8+/C9x5t7nsaqL7sP2raENv6CW5a23zaRPOfH70zJobP2gut9rWqpic1qbYM1/TeTF8NGUdnvz75WtPeurbhhY+Gl8tta3aTQPehGgRJ12yAuypz3dtLd28wXU5+e3T4MhrXlY1rt2YH9KNWljaqqhppZjy/fevZcnGu7Ntqql+GiIiIiIiIiIiIiIjob/cdbx3Q0gt9Dn0AAAAASUVORK5CYII="
                alt="Codeforces"
                className="w-full h-20 object-cover mb-4 rounded-md"
              />
              <div className="content1">
                <h3 className="text-xl font-bold mb-2">Codeforces</h3>
                {nextContest ? (
                  <p className="text-gray-600">
                    Next is on: <br />{" "}
                    {new Date(
                      nextContest.startTimeSeconds * 1000
                    ).toLocaleString()}
                  </p>
                ) : (
                  <p className="text-gray-600">No Upcoming Contest</p>
                )}
              </div>
              <button className={getStartedButtonStylesnew} onClick={handlecf}>
                Register
              </button>
            </div>
            <div className="card">
              <img
                src="https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/zruiknbedz8yqafxbazb"
                alt="CodeChef"
                className="w-full h-20 object-cover mb-4 rounded-md"
              />
              <div className="content1">
                <h3 className="text-xl font-bold mb-2">CodeChef</h3>
                <p className="text-gray-600">
                  Next is on:<br></br> {nextWednesday}, 8:00 PM
                </p>
              </div>
              <button className={getStartedButtonStylesnew} onClick={handlecc}>
                Register
              </button>
            </div>
            <div className="card">
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/free-leetcode-3628885-3030025.png?f=webp"
                alt="LeetCode"
                className="w-full h-20 object-cover mb-4 rounded-md"
              />{" "}
              <div className="content1">
                <h3 className="text-xl font-bold mb-2">LeetCode</h3>
                {nextLeetContest ? (
                  <div className="text-gray-600">
                    <h2>Next is on:</h2>
                    <p>{nextLeetContest}, 8:00 AM</p>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              <button
                className={getStartedButtonStylesnew}
                onClick={handleleet}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </main>

      <section id="leaderboards-section" style={sectionStyles}>
        <Board> </Board>
      </section>
    </div>
  );
}

export default Landingpage;
