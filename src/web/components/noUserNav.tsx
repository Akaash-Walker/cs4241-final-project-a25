import {useNavigate} from "react-router";
import UserIcon from "./UserIcon.tsx"
import WelcomeMessage from "./WelcomeMessage.tsx"

export default function NoUserNav() {
    const navigate = useNavigate();

    return (
        <div className="navbar bg-base-100 shadow-sm px-8">
            <div className="navbar-start">
                <img className="btn btn-ghost text-xl" 
                    src= {'public/HeatifyLogo.png'} 
                    width={50} height={50} 
                    alt='Heatify Logo' 
                    style={{
                        padding: "0px", 
                    }}
                    onClick={() => navigate("/")}/>

                <b style ={{top: "10px", left: "50px"}}>Heatify</b>
                <WelcomeMessage />
                <UserIcon />
            </div>
        </div>
    );
}