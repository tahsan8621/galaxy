import React, {useEffect, useState} from 'react';
import axios from "axios";

const Home = ({data}) => {
    const [user, setUser] = useState([])


    useEffect(() => {
        const newUserData = data.devices;
        setUser(newUserData)
        console.log(user[0]?.name)
        let getList = document.getElementById("user").innerText;


        let dynamicStyles = null;

        function addAnimation(body) {
            if (!dynamicStyles) {
                dynamicStyles = document.createElement('style');
                dynamicStyles.type = 'text/css';
                document.head.appendChild(dynamicStyles);
            }

            dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
        }

        for (var i = 1; i <= getList; i++) {
            if (i % 2 == 0) {
                addAnimation(`
                  @keyframes movement_${i} {
                     0%  { -webkit-transform: rotate(0deg) translateY(${100 * i}px) rotate(0deg) scale(1); }
                  50%  { -webkit-transform: rotate(-180deg) translateY(${100 * i}px) rotate(180deg) scale(1); }
                  100%  { -webkit-transform: rotate(-360deg) translateY(${100 * i}px) rotate(360deg) scale(1); }
                  }
                `);
            } else {
                addAnimation(`
                  @keyframes movement_${i} {
                     0%  { -webkit-transform: rotate(0deg) translateY(${100 * i}px) rotate(0deg) scale(1); }
                  50%  { -webkit-transform: rotate(180deg) translateY(${100 * i}px) rotate(-180deg) scale(1); }
                  100%  { -webkit-transform: rotate(360deg) translateY(${100 * i}px) rotate(-360deg) scale(1); }
                  }
                `);
            }


            var element = document.createElement("div");
            element.className = "globe";
            element.style.animation = `7s linear infinite movement_${i}`;
            element.textContent = `${user[i-1]?.name}`;
            document.getElementById("atom").appendChild(element);
        }
    });

    return (

        <div id="atom">
            Currently Active
            <div id="user">
                {user.length}
            </div>


        </div>);

}

export async function getServerSideProps() {


    // Fetch data from external API
    const res = await fetch(`http://35.201.2.209:8000/devices`)
    //setInterval(res, 1000);
    const data = await res.json()
    console.log(data.devices)
    // Pass data to the page via props
    return {props: {data}}
}

export default Home;
