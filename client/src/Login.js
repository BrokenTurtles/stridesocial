import React, { useEffect, useState } from 'react';
import axios from 'axios';

const axiosFunction = async (email, password) =>{
    const config = { headers : { 'Content-Type' : 'application/json' }};
    const data = {
        email,
        password
    }
    const result = await axios.post('/api/users/login', data, config);
    // console.log(result.data);
    return result.data.validUser;
}

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const inputEmail = (event)=>{
        setEmail(event.target.value);
    }
    const inputPassword = (event)=>{
        setPassword(event.target.value);
    }   

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await axiosFunction(email, password);
        return (!result ? setError(true) : setError(false));

    }

    return(
        <div>
            <form id='login' onSubmit={handleSubmit}>
            Username: <input type='text' value={email} onChange={inputEmail}/>
            Password: <input type='password' value={password} onChange={inputPassword}/>
            <input type="submit" />
            </form>
            <div>{error === true ? <div>Invalid username or password</div> : null} </div>
        </div>

    )
}

export default Login;