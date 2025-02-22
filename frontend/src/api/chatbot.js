import axios from 'axios';

const API_URL = 'http://localhost:8000/chat'; // Replace with your actual API endpoint

export const sendMessage = async (message) => {
  try {
    const response = await axios.post(API_URL, { message });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const getVoiceResponse = async (message) => {
  try {
    const response = await axios.post(`${API_URL}/voice`, { message });
    return response.data;
  } catch (error) {
    console.error('Error getting voice response:', error);
    throw error;
  }
};