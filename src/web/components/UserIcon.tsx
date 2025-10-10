import axios from "axios";
import {useState} from "react";

export default function UserIcon(){
    const access_token = localStorage.getItem('access_token');
    const [icon, setIcon] = useState("");
    
    const getIcon = async function(){
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
            const userIcon = res1.data.images[0].url;
            setIcon(userIcon);
        } catch (error) {
            console.error("Error fetching user email: ", error);
        }
    }
    
    getIcon();

    if (icon){
        return(
            <img src= {icon} className= "w-32 h-32 rounded-full object-cover" style={{
                    position: "absolute", 
                    top: "10px",          
                    right: "10px",  
                    width: 50, height: 50,      
            }}/>
        )
    }

}