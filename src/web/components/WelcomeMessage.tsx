import axios from "axios";
import {useState} from "react";

export default function WelcomeMessage(){
    const access_token = localStorage.getItem('access_token');
    const [username, setUsername] = useState("");
    
    const getUsername = async function(){
        if (!access_token) {
            console.error("No access token found");
            return;
        }

        try{
            const res1 = await axios.get('https://api.spotify.com/v1/me', {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + access_token
                    },
                })
            const userName = res1.data.display_name;
            setUsername(userName);
        } catch (error) {
            console.error("Error fetching username: ", error);
        }
    }
    
    getUsername();

    return(
        <b style={{
                position: "absolute", 
                top: "20px",          
                right: "70px",        
        }}> Welcome, {username} </b>
    )
}
