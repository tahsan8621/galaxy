import React, {useEffect, useState} from 'react';
import axios from "axios";

const Home = ({data}) => {
    const [user, setUser] = useState([])


    useEffect(() => {
        // (1) define within effect callback scope
        const fetchData = async () => {
            try {

                const res = await fetch('http://35.201.2.209:8000/devices');
                const json = await res.json();
                setUser(json.devices);
            } catch (error) {
                console.log(error);
            }
        };

        const id = setInterval(() => {
            fetchData(); // <-- (3) invoke in interval callback
        }, 6000);

        fetchData(); // <-- (2) invoke on mount

        return () => clearInterval(id);
    }, [])
    useEffect(() => {


        console.log(user[0]?.name)
        let getList = document.getElementById("user").innerText;


        let dynamicStyles = null;

        //list.removeChild(list.children[1]);


        function addAnimation(body) {
            if (!dynamicStyles) {
                dynamicStyles = document.createElement('style');
                dynamicStyles.type = 'text/css';
                document.head.appendChild(dynamicStyles);
            }

            dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
        }

        // const list = document.getElementById("atom");
        //
        // if (list.hasChildNodes()) {
        //     list.removeChild(list.children[0]);
        // }
        const boxes = document.querySelectorAll('.globe');

        boxes.forEach(box => {
            box.remove();
        });

        for (var i = 1; i <= getList; i++) {
            const list = document.getElementsByClassName("globe");
            if (list.length > 0) {
                console.log(list)
            }
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
            element.textContent = `${user[i - 1]?.name}`;

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
Home.getInitialProps = async (ctx) => {
    const res = await fetch('http://35.201.2.209:8000/devices')
    const json = await res.json()
    return {data: json}
}


export default Home;
