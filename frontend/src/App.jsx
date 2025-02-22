import React from 'react';
import ChatBox from './components/ChatBox';
import './App.css';
import bgImage from '../src/robo.gif';



function App() {
  return (
    <div className="app-container flex h-[100vh] pl-[3.5vw] pt-[8vh]">
      <ChatBox />
      <div className="flex"><img src={bgImage} alt="" /></div>
    </div>
  );
}

export default App;