import React from 'react';

function NewsFeed({ summaries }) {
  return (
    <div className="news-feed">
      {summaries.map((item, index) => (
        <div key={index} className="news-card">
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
}

export default NewsFeed;
