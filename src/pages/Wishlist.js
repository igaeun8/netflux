// 내가 찜한 리스트 페이지
import React from 'react';
import Header from '../components/common/Header';
import './Wishlist.css';

const Wishlist = () => {
  return (
    <div className="wishlist-page">
      <Header />
      <main className="wishlist-content">
        <h1>내가 찜한 리스트 페이지</h1>
        {/* Local Storage에서 위시리스트 불러오기 예정 */}
      </main>
    </div>
  );
};

export default Wishlist;

