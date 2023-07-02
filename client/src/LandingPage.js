import React, { useState } from 'react';



export default function LandingPage () {
    const [register, setRegister] = useState(false)
    const [login, setLogin] = useState(false)

    return (

        <main>
            <h1 className="header">Welcome to StrideSocial! </h1>
            <div className='options'>
                <button className="" onClick={() => {
                    setRegister(true);
                    setLogin(false);
                    }}>Register</button>
                <button className="" onClick={() => {
                    setLogin(true);
                    setRegister(false);
                    }}>Login </button>
            </div>
            <div className=''>
                {register===true && login === false ? <Register /> : null }
                {login=== true && register === false ? <Login /> : null }
            </div>

        </main>

    )

}