import React, { useState } from 'react';
import axios from 'axios';

const TableDemo = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    codeforces: '',
    codechef: '',
    leetcode: '',
    college: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://code-hub-808r.onrender.com/profile/register', formData);
      console.log('User registered successfully:', response.data);
      
      setError('');
    } catch (error) {
      console.error('Error registering user:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="codeforces" placeholder="Username" value={formData.codeforces} onChange={handleChange} required />
        <input type="text" name="codechef" placeholder="Username" value={formData.codechef} onChange={handleChange} required />
        <input type="text" name="leetcode" placeholder="Username" value={formData.leetcode} onChange={handleChange} required />
        <input type="text" name="college" placeholder="College" value={formData.college} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TableDemo;
