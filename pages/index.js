import React, {useEffect, useState} from 'react';
import axios from "axios";
import {NextResponse} from "next/server";
import {useRouter} from "next/router";
import Button from "../components/Button";

const Home = ({data}) => {
    const route = useRouter()
    const [user, setUser] = useState([])

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.setItem("token", '');
        return route.push('http://localhost:3001/login')
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("token");
            if (!token) {
                return route.push('http://localhost:3001/login')
            }
        }
        setUser(data.devices)
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
            fetchData(); // <--  invoke in interval callback
        }, 6000);

        fetchData(); // <--  invoke on mount

        return () => clearInterval(id);
    }, [])
    useEffect(() => {
        let getList = user.length;
        let dynamicStyles = null;
        function addAnimation(body) {
            if (!dynamicStyles) {
                dynamicStyles = document.createElement('style');
                dynamicStyles.type = 'text/css';
                document.head.appendChild(dynamicStyles);
            }

            dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
        }
        const boxes = document.querySelectorAll('.globe');
        boxes.forEach(box => {
            box.remove();
        });
        for (let i = 1; i <= getList; i++) {

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


            let element = document.createElement("div");
            element.className = "globe";
            element.style.animation = `7s linear infinite movement_${i}`;

            document.getElementById("atom").appendChild(element);
        }
    });

    return (
        <div className="bg-orange">
            <div id="atom">
                <div id="user">
                    <h2>{user.length}</h2>
                    <span>DEVICES ONLINE</span>
                </div>
            </div>

            <footer className="footer d-flex j-cc">
                <div className="">
                    <button type="submit" className="btn btn-bg-default mg-r">Notify</button>
                    <button type="submit" className="btn btn-bg-dark" onClick={handleLogout}>log out</button>
                </div>
            </footer>


        </div>
    );

}
Home.getInitialProps = async (ctx) => {
    const res = await fetch('http://35.201.2.209:8000/devices')
    const json = await res.json()
    return {data: json}
}


export default Home;
