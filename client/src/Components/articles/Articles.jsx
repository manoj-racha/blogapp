import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { axiousWithToken } from '../../axiousWithToken';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Articles = () => {
  const [articlesList, setArticlesList] = useState([]);
  const navigate = useNavigate();

  const getArticlesOfCurrentUser = async () => {
    try {
      const res = await axiousWithToken.get(`http://localhost:4000/user-api/articles`);
      setArticlesList(res.data.payload ); // Ensure it sets an array even if payload is undefined
      console.log(res)
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticlesList([]); // Set an empty array on error
    }
  };
  
  useEffect(() => {
  
    getArticlesOfCurrentUser();

}, []);

const gotoArticleView = (articleObj) => {
   
  navigate(`../article/${articleObj.articleId}`,{state:articleObj});
};

  return (
    <div>
      <div>
      <div className="row row-cols-1 row-cols-md-3 row-cols-sm-2 g-4 mt-5">
        {articlesList.length > 0 ? (
          articlesList.map((article) => (
            <div className="col" key={article.articleId}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.content.substring(0, 80)}...</p>
                  <button className="custom-btn btn-4" onClick={() => gotoArticleView(article)}>Read More</button>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">
                    <p className="fs-4 me-2">Last updated on {new Date(article.dateOfModification).toLocaleDateString()}</p>
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No articles found</div>
        )}
      </div>
    </div>
    </div>
  )
}

export default Articles
