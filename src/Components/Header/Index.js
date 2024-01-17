import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Components/Header/index.css';

const Index = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleHeaderClick = (clickedUser) => {
    // Navigate to the '/About' route and pass the clicked user data
    navigate('/About', { state: { userData: clickedUser } });
  };

  return (
    <div>
      <h1 className='header_section'>Directory</h1>
      <div>
        {userData.map((user) => (
          <div key={user.id} className='header_tile' onClick={() => handleHeaderClick(user)}>
            <div className='Person_details'>
              <span className='name'>Name: {user.name}</span>
              <span className='post'>Posts: {10}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
