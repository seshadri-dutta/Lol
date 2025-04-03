import {FaInstagram , FaLinkedin } from "react-icons/fa6";


const FollowOn = () => {
  console.log("FollowOn component is rendering...");
  return (
    <div
        className ="faded-text pt-2">
            <span>Follow on:</span>
            <div className="flex gap-4 pt-3">
                <a href = "https://www.linkedin.com/in/seshadridutta/">
                   <FaLinkedin size={30} />
                </a>
                <a href = "https://www.instagram.com/seshadridutta/">
                   <FaInstagram size={20} />
                </a>
               
            </div>
    </div>
  );
};

export default FollowOn;