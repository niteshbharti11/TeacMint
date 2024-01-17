import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../UserDeatils/index.css';
import Modal from '../../src/UserDeatils/useModal/index'; // Adjust the path to the Modal component

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.userData || {};
  const [posts, setPosts] = useState([]);
  const [timezones, setTimezones] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState('');
  const [date, setDate] = useState(new Date());
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=4');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const fetchTimezones = async () => {
      try {
        const response = await axios.get('https://worldtimeapi.org/api/timezone');
        setTimezones(response.data);
      } catch (error) {
        console.error('Error fetching timezones:', error);
      }
    };

    fetchPosts();
    fetchTimezones();
  }, []);

  useEffect(() => {
    let timer;

    if (!isPaused) {
      timer = setInterval(() => {
        setDate(new Date());
      }, 1000);
    }

    return function cleanup() {
      clearInterval(timer);
    };
  }, [isPaused]);

  const toggleTimer = () => {
    setIsPaused((prevState) => !prevState);
  };

  const ButtonHandler = () => {
    navigate('/');
  };

  const handleDropdownChange = (event) => {
    setSelectedTimezone(event.target.value);
  };

  const timeStop = () => {
    // Implement the logic for time stop
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className='button-container'>
        <button className='Back_button' onClick={ButtonHandler}>
          Back
        </button>
        <div className='button-group'>
          <select className='Dropdown' value={selectedTimezone} onChange={handleDropdownChange}>
            {timezones.map((timezone) => (
              <option key={timezone} value={timezone}>
                {timezone}
              </option>
            ))}
          </select>
          <button className='Back_button' onClick={openModal}>
            {date.toLocaleTimeString()}
          </button>
          <button className='Back_button' onClick={toggleTimer}>
            {isPaused ? 'Start' : 'Pause'}
          </button>
        </div>
      </div>

      <h1 className='header_section'>Profile Page</h1>
      <div className='user-details-container'>
        <div className='user-info-start'>
          <div className='username'>Name: {userData.name}</div>
          <div className='username'>Username: {userData.username} | {userData.company.catchPhrase} </div>
        </div>
        <div className='user-info-end'>
          <div className='address'>Address: {userData.address?.street || ''}</div>
          <div className='post'>Email: {userData.email} | {userData.phone}</div>
        </div>
      </div>

      <div class='cards-container' >
        {posts.map((post) => (
          <div class='card' key={post.id} onClick={() => openModal(post)}>
            <div class='card-title'>{post.title}</div>
            <div class='card-content'>{post.body}</div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} selectedPost={selectedPost} />
    </div>
  );
};

export default Index;
