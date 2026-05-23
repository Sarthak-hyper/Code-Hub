
import React, { useEffect, useState } from "react";
import axios from 'axios'
import bg from '../../resources/bg2.mp4';
import '../UserProfile.css'; 
import UserInitials from "../othercomponents/userInitials.js";
import { Link,useNavigate } from "react-router-dom";
import img from '../../resources/adi.jpeg'

const UserProfile = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [userData, setUserData] = useState({
    name: "Sample Name",
    email: "SampleName@example.com",
    codeforcesUsername: "SampleName_cf",
    codechefUsername: "SampleName_cc",
    leetcodeUsername: "SampleName_lc",
  });
  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsEditable(true);
  };
  const handleLogoutClick = async () => {
    try {
      const res = await axios.get('https://code-hub-808r.onrender.com/user/logout', {withCredentials:true});
      console.log(res.data)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  };

  const handleSaveClick = async() => {
    setIsEditable(false); 
    try {
      const response = await axios.post('https://code-hub-808r.onrender.com/user/update',userData,{withCredentials:true});
      console.log(response.data)
      alert("User Updated Successfully")
    } catch (error) {
      console.log(error)
      alert("Error Updating the User")
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const [userName, setUserName] = useState("P");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://code-hub-808r.onrender.com/user/details`, {
          withCredentials: true,
        });
        setUserName(response.data.name);
        const { name, email, codeforces, codechef, leetcode } = response.data;
        setUserData({
          name: name,
          email: email,
          codeforcesUsername: codeforces ,
          codechefUsername: codechef ,
          leetcodeUsername: leetcode 
        });
          
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
 
  const [menuOpen, setMenuOpen] = useState(false); 
  

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
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };


  const mainStyles = {
    overflowX: "hidden",
  };

  const scrollToSection = () => {
    const section = document.getElementById('leaderboards-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={mainStyles}>
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
          <Link to="/" style={navItemStyles}>
            Leaderboards
          </Link>
          <Link to="/team" style={navItemStyles}>
            About Us
          </Link>
          <a style={navItemStyles} href="#question-bank">
            Practice
          </a>
        </div>
        <div style={profileCircleStyles}>
          <Link to="/profile">
            <UserInitials name={userName} />
          </Link>
        </div>
      </div>

      <main className="relative h-screen w-screen">
        <video autoPlay loop muted style={videoStyles}>
          <source src={bg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className='user-detail-container'>
          <div className='user-detail imger'>
             <h2><UserInitials name={userName} /></h2>
          </div>
          <div className='user-detail first'>
            <label>Name:</label>
            {isEditable ? (
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
              />
            ) : (
              <span>{userData.name}</span>
            )}
          </div>
          <div className='user-detail'>
            <label>Email:</label>
            {isEditable ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
              />
            ) : (
              <span>{userData.email}</span>
            )}
          </div>
          <div className='user-detail'>
            <label>Codeforces Username:</label>
            {isEditable ? (
              <input
                type="text"
                name="codeforcesUsername"
                value={userData.codeforcesUsername}
                onChange={handleInputChange}
              />
            ) : (
              <span>{userData.codeforcesUsername}</span>
            )}
          </div>
          <div className='user-detail'>
            <label>Codechef Username:</label>
            {isEditable ? (
              <input
                type="text"
                name="codechefUsername"
                value={userData.codechefUsername}
                onChange={handleInputChange}
              />
            ) : (
              <span>{userData.codechefUsername}</span>
            )}
          </div>
          <div className='user-detail'>
            <label>Leetcode Username:</label>
            {isEditable ? (
              <input
                type="text"
                name="leetcodeUsername"
                value={userData.leetcodeUsername}
                onChange={handleInputChange}
              />
            ) : (
              <span>{userData.leetcodeUsername}</span>
            )}
          </div>
          <div>
          {isEditable ? (
            <button onClick={handleSaveClick}>Save</button>
          ) : (
            <button onClick={handleEditClick}>Edit</button>
          )}
          <button onClick={handleLogoutClick}>Logout</button> </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
