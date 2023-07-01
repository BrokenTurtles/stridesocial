import React, { useState } from 'react';
import axios from 'axios';

const ax = async (name, email, password) => {
  const config = { headers: { 'Content-Type': 'application/json' } };
  const data = {
    name,
    email,
    password,
  };
  const result = await axios.post('api/users', data, config);
  console.log(result);
};

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordMissMatch, setPasswordMissMatch] = useState('false');

  const newName = (event) => {
    setName(event.target.value);
  };

  const newEmail = (event) => {
    setEmail(event.target.value);
  };

  const newPassword1 = (event) => {
    setPassword1(event.target.value);
  };

  const newPassword2 = (event) => {
    setPassword2(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password1 === password2) {
      console.log('Password Match');
      setPasswordMissMatch(false);
      const password = password1;
      await ax(name, email, password);
    } else {
      console.log('Password MISMatch');
      setPasswordMissMatch(true);
    }
  };
  return (
    <div>
      <form id='registration' onSubmit={handleSubmit}>
        <label id='lablel'>Enter Your Name</label>
        <input type='text' value={name} onChange={newName}></input>

        <label id='lablel'>Enter Your Email</label>
        <input type='text' value={email} onChange={newEmail}></input>

        <label id='lablel'>Enter Your Password</label>
        <input
          type='password'
          value={password1}
          onChange={newPassword1}
        ></input>

        <label id='lablel'>Confirm Your Password</label>
        <input
          type='password'
          value={password2}
          onChange={newPassword2}
        ></input>
        <input type='submit' />
      </form>
      <div>
        {passwordMissMatch === true ? <div>Passwords do not match </div> : null}
      </div>
    </div>
  );
};

export default Register;
