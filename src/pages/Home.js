// 홈 페이지
import React from 'react';
import Header from '../components/common/Header';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <main className="home-content">
        <h1>홈 페이지</h1>
        {/* 여기에 영화 리스트 컴포넌트 추가 예정 */}
      </main>
    </div>
  );
};

export default Home;

