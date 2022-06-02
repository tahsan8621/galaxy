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
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem("token");
        if (token) {
            return router.push('http://localhost:3001')
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://35.201.2.209:8000/login', {
            method: 'post', headers: {
                'Content-type': 'application/json'
            }, body: JSON.stringify({email, password})
        })

        if (res.status == 200) {
            const token="tdasfasdf1212SDFGHJ"
            window.localStorage.setItem('token', token);
            router.push('/')
        } else {
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
