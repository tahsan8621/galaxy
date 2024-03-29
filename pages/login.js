import React, {useState} from 'react';
import Input from "../components/Input";
import Button from "../components/Button";
import Head from "next/head";
import {useRouter} from "next/router";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = fetch(`${process.env.API_END_POINT}/login`, {
            method: 'post', headers: {
                'Content-type': 'application/json'
            }, body: JSON.stringify({email, password})
        })
            .then((response) => response.text())
            .then((token) => {
                return token;
            });
        const token = await res;

        if (token != "Invalid email and password combination") {

            window.localStorage.setItem('token', token);
           return  router.push('/')
        }
         else {
            setError('invalid credentials')
        }

    }
    return (<>
        <Head>
            <link rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"/>
        </Head>
        <div className="bg-dark d-flex j-cc a-ic">
            <div className="login_container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input_group">
                        <Input type="email" placeholder="Email Address"
                               value={email}
                               required="required"
                               onChange={(event) => setEmail(event.target.value)}
                        >
                            <i className="fa-solid fa-envelope"></i>
                        </Input>
                        <Input type="password" placeholder="Password"
                               value={password}
                               onChange={(event) => setPassword(event.target.value)}
                        >
                            <i className="fa-solid fa-certificate"></i>
                        </Input>
                    </div>
                    {error && (<div className="err-msg">
                        {error}
                    </div>)}
                    <div className="d-flex j-cc mg-t">
                        <Button type="submit" class_name="btn btn-bg-blue ">Login</Button>
                    </div>
                </form>
            </div>

        </div>
    </>);
}
export default Login;
