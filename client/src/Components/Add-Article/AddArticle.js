import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddArticle = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const token = localStorage.getItem('token');
  const { currentUser } = useSelector((state) => state.userAuthorLogin);
  const axioswithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });
  const navigate = useNavigate();
  const [err, setErr] = useState('');

  const postNewArticle = async (article) => {
    article.dateOfCreation=new Date()
    article.dateOfModification=new Date()
    article.articleId=Date.now();
    article.username=currentUser.username
    article.comments=[];
    article.status=true;
    let res=await axios.post('http://localhost:4000/author-api/new-article',article)
    console.log(res)
    if(res.status===201){

        navigate(`/author-profile/articles-by-author/${currentUser.username}`)
    }else{
        setErr(res.data.message)
        console.log(res.data.message)
    }
  };

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-lg-8 col-md-8 col-sm-10">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3">Write an Article</h2>
            </div>
            <div className="card-body bg-light">
              {err && <div className="alert alert-danger">{err}</div>}
              <form onSubmit={handleSubmit(postNewArticle)}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    {...register('title', { required: true })}
                  />
                  {errors.title && <span className="text-danger">Title is required</span>}
                </div>
                <div className="mb-4">
                  <label htmlFor="category" className="form-label">
                    Select a category
                  </label>
                  <select {...register('category')} id="category" className="form-select">
                    <option value="programming">Programming</option>
                    <option value="AI&ML">AI & ML</option>
                    <option value="database">Database</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="form-label">
                    Content
                  </label>
                  <textarea
                    {...register('content', { required: true })}
                    className="form-control"
                    id="content"
                    rows="10"
                  ></textarea>
                  {errors.content && <span className="text-danger">Content is required</span>}
                </div>
                <div className="text-end">
                  <button type="submit" className="btn btn-primary">
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddArticle;
