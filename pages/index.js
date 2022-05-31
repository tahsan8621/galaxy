import React, {useEffect} from 'react';

const Home = () => {
    useEffect(() => {
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
      @keyframes movement${i} { 
         0%  { -webkit-transform: rotate(0deg) translateY(${100 * i}px) rotate(0deg) scale(1); }
      50%  { -webkit-transform: rotate(-180deg) translateY(${100 * i}px) rotate(180deg) scale(1); }
      100%  { -webkit-transform: rotate(-360deg) translateY(${100 * i}px) rotate(360deg) scale(1); }
      }
    `);
            } else {
                addAnimation(`
      @keyframes movement${i} { 
         0%  { -webkit-transform: rotate(0deg) translateY(${100 * i}px) rotate(0deg) scale(1); }
      50%  { -webkit-transform: rotate(180deg) translateY(${100 * i}px) rotate(-180deg) scale(1); }
      100%  { -webkit-transform: rotate(360deg) translateY(${100 * i}px) rotate(-360deg) scale(1); }
      }
    `);
            }


            var element = document.createElement("div");
            element.className = "globe ele-1";
            element.style.animation = `7s linear infinite movement${i}`;
            element.textContent=`user-${i}`;
            document.getElementById("atom").appendChild(element);
        }
    }, []);

    return (

        <div id="atom">
            Currently Active
            <div id="user">
                10
            </div>


        </div>);

}
export default Home;
