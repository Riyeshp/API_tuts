import React, { useState } from 'react';
import axios from 'axios';

function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('http://localhost:

