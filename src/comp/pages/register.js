// Register.js
import React, {useState} from "react";

import { Link, useNavigate } from "react-router-dom";
import '../style.css';
import email_img from '../../resources/email.png';
import person_img from '../../resources/person.png';
import password_img from '../../resources/password.png';
import leetcode_img from '../../resources/leetcodeicon.png';
import codechef_img from '../../resources/codecheficon.png';
import codeforces_img from '../../resources/codeforcesicon.png';
import college_img from '../../resources/college.png';
import axios from "axios";

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [codeforces, setCodeforces] = useState('');
    const [codechef, setCodechef] = useState('');
    const [leetcode, setLeetcode] = useState('');
    const [college, setCollege] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            console.log("hello")
            const response =await axios.post('https://code-hub-808r.onrender.com/profile/reg', 
                JSON.stringify({email,name,password,codeforces,codechef,leetcode,college}),
                {
                    headers:{'Content-Type':'application/json'},
                    withCredentials:true
                }
            )
            console.log(response)
            if(response.data.status === "success"){
                navigate("/")
            }else alert(response.response.data.message)
        } catch (error) {
            console.error("Register failed",error)
        }
    }
    return (
        <div className="gradient-background">
            <div className="noise"></div>
            <div className="overlay"></div>
            <div className="container-login">
                <div className="header-login">
                    <div className="text-login"> SignUp</div>
                </div>
                <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <div className="input-group">
                        {/* For name */}
                        <div className="input">
                            <img src={person_img} alt="" style={{ width: '30px', height: 'auto' }}/>
                            <input type="text" placeholder="Enter your Name" value={name} onChange={(e)=>setName(e.target.value)} required/>
                        </div>
                        {/* For Email */}
                        <div className="input">
                            <img src={email_img} alt="" style={{ width: '28px', height: 'auto' }}/>
                            <input type="email" placeholder="Enter your Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                        </div> 
                    </div>
                    <div className="input-group">
                        {/* For Password */}
                        <div className="input">
                            <img src={password_img} alt="" style={{ width: '28px', height: 'auto' }}/>
                            <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                        </div>
                        {/* For CodeForces handle */}
                        <div className="input">
                            <img src={codeforces_img} alt="" style={{ width: '25px', height: 'auto' }}/>
                            <input type="text"placeholder="Codeforces Username" value={codeforces} onChange={(e)=>setCodeforces(e.target.value)}required />
                        </div>
                    </div>
                    <div className="input-group">
                        {/* For CodeChef handle */}
                        <div className="input">
                            <img src={codechef_img} alt="" style={{ width: '23px', height: 'auto' }}/>
                            <input type="text" placeholder="Codechef Username" value={codechef} onChange={(e)=>setCodechef(e.target.value)} required/>
                        </div>
                        {/* For LeetCode handle */}
                        <div className="input">
                            <img src={leetcode_img} alt="" style={{ width: '22px', height: 'auto' }}/>
                            <input type="text" placeholder="Leetcode Username" value={leetcode} onChange={(e)=>setLeetcode(e.target.value)} required/>
                        </div>
                    </div>
                    {/* For College name */}
                    <div className="input-group">
                        <div className="input">
                            <img src={college_img} alt="" style={{ width: '35px', height: 'auto' }}/>
                            <input type="text" placeholder="Enter your College Name" value={college} onChange={(e)=>setCollege(e.target.value)} required/>
                        </div>
                    </div>
                </div>
                <div className="submit-container">
                    <button type="submit" className="register-button">Register</button>
                    <div className="login-container">
                        <span style={{ marginRight: '0.4em' }}>Already have an account? </span>
                       
                        <Link to="/login" className="login-link output">Log In</Link>
                    </div>
                </div>
                </form>
                <div className="forgot">Forgot your password? <a href="random.html" className="output">Click here</a></div>
            </div>
        </div>
    );
}
