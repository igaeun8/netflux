// 찾아보기 페이지
import React from 'react';
import Header from '../components/common/Header';
import './Search.css';

const Search = () => {
  return (
    <div className="search-page">
      <Header />
      <main className="search-content">
        <h1>찾아보기 페이지</h1>
        {/* 필터링 UI 구현 예정 */}
      </main>
    </div>
  );
};

export default Search;

