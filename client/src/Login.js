import React, {useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const axiosFunction = async (email, password) =>{
    const config = {headers : { 'Content-Type' : 'application/json' }};
    const data = {
        email,
        password
    }
    try{
        const result = await axios.post('/api/users/login', data, config);
        console.log(result)
        localStorage.setItem('user', JSON.stringify(result.data))
        return result.data
        
    }catch(error){
console.log(error)

    }
 
}



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const inputEmail = (event)=>{
        setEmail(event.target.value);
    }
    const inputPassword = (event)=>{
        setPassword(event.target.value);
    }   

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const user = await axiosFunction(email, password);
            console.log('this is my user', user)
            if(user) navigate('/posts')
        }catch(error){
            console.log(error.message)
        }
        
    }

    return(
        <div className='login'>
            <form id='login' onSubmit={handleSubmit}>
            Username: <input type='text' value={email} onChange={inputEmail}/>
            Password: <input type='password' value={password} onChange={inputPassword}/>
            <input type="submit" />
            </form>
            
        </div>

    )
}

export default Login;