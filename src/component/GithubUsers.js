import React, { useEffect, useState } from 'react';
import axios from "axios";

function GithubUsers() {
    const [userName, setUserName] = useState("");
    const [userInfo, setUserInfo] = useState({});

    function searchUser() {
        axios.get(`https://api.github.com/users/${userName}`)
            .then((response) => setUserInfo(response.data))
            .catch(() => console.log("Error"))
    }
    function clearUser(){
        setUserName("");
        setUserInfo({});
    }
    useEffect(()=>{
        axios.get(`https://api.github.com/users/${userName}`)
            .then((response) => setUserInfo(response.data))
            .catch(() => console.log("Error"))

    },[userName]);

    //we are using useeffect to search after every key presss, username is changing, and useeffect works onchange
    //and we are not required to click search button



    return (
        <div>
            <div className="github-from">
                Enter Github Username: <input type='text' placeholder='Enter Github Username' onChange={(e) => setUserName(e.target.value)} value = {userName} />
                <button onClick={searchUser}>Search</button>
            </div>
            <div className="github-user">
                {
                    userInfo.name && // we have added this because, if name is not present then below code will not execute.
                    <div>
                        <img src={userInfo.avatar_url} style={{width:"200px"}}></img>
                        <h1>{userInfo.name}</h1>
                        <p>{userInfo.followers}</p>
                        <p>{userInfo.following}</p>
                        <p>{userInfo.public_repos}</p>
                        <a href={userInfo.html_url} target="_blank"> Link to Profile</a>
                    </div>
                }
                <><button onClick = {clearUser}>
                    Clear</button></>



            </div>
        </div>
    )
}

export default GithubUsers;
