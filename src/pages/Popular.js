// 대세 콘텐츠 페이지
import React from 'react';
import Header from '../components/common/Header';
import './Popular.css';

const Popular = () => {
  return (
    <div className="popular-page">
      <Header />
      <main className="popular-content">
        <h1>대세 콘텐츠 페이지</h1>
        {/* Table View / 무한 스크롤 구현 예정 */}
      </main>
    </div>
  );
};

export default Popular;

