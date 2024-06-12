import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation,useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {axiousWithToken} from '../../axiousWithToken'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdOutlineRestore } from "react-icons/md";

const Article = () => {
  const { currentUser } = useSelector((state) => state.userAuthorLogin);
  let { state } = useLocation();
  // console.log(state)
  const { register, handleSubmit, reset } = useForm();
  const[deleteStatus,setDeleteStats] = useState(state.status)
  let [comment,setComment] = useState('')
  let navigate = useNavigate();
   let [artcleEditStatus,setArticleEditStatus] = useState(false)
  const onSubmit = async(data) => {
    data.username = currentUser.username
    let res = await axiousWithToken.post(`http://localhost:4000/user-api/comment/${state.articleId}`,data)
    // console.log(res)
    if(res.data.message === 'comment is posted')
    {
      setComment(res.data.message)
    }
  
  };

  const enableEditStatus = () =>{
    setArticleEditStatus(true)
  }

// save the modified changes
const saveModifiedChanges = async(editedArticle) =>{
  // console.log("modified article",modifiedArticle)
  let modifiedArticle = {...state,...editedArticle}
  delete modifiedArticle._id;
  modifiedArticle.dateOfModification = new Date();
  let res =  await axiousWithToken.put('http://localhost:4000/author-api/article',modifiedArticle);
  if(res.data.message === 'Article is modified'){
    setArticleEditStatus(false)
    navigate(`/author-profile/article/${modifiedArticle.articleId}`,{state:res.data.article})
  }


}
const deleteArticle = async () => {
  let res = await axiousWithToken.put(`http://localhost:4000/author-api/article/${state.articleId}`, state);
  if (res.data.message === 'article is deleted') {
    // navigate(`/author-profile/articles-by-author/${state.username}`);
    setDeleteStats(true)
  } 
};

const restoreArticle = async() =>{
  let res = await axiousWithToken.put(`http://localhost:4000/author-api/article/${state.articleId}`,state);
  if (res.data.message === 'article is restored') {
    // navigate(`/author-profile/articles-by-author/${state.username}`);
    setDeleteStats(false)
}
}

  return (
    <div>   
      {
        artcleEditStatus === false ? <>
            <div>
      <div className="d-flex justify-content-between">
        <div>
          <p className="display-3 me-4">{state.title}</p>
          <span className="py-3">
            <small className="text-secondary me-4">
              Created on: {state.dateOfCreation}
            </small>
            <small className="text-secondary">
              Modified on: {state.dateOfModification}
            </small>
          </span>
        </div>
        <div>
          {currentUser.userType === "author" && (
            <>
             <span className="me-2 btn btn-info" onClick={enableEditStatus}><CiEdit /></span>
              {deleteStatus === false ?(<span className="me-2 btn btn-info" onClick={restoreArticle}><MdOutlineRestore /></span>) :
              (<span  className="me-2 btn btn-danger" onClick={deleteArticle}><MdDelete /></span>) 
            }
            </>
          )}
        </div>
      </div>
      <div>
        <p className="lead mt-3" style={{ whiteSpace: "pre-line" }}>
          {state.content}
        </p>
        <h1>{comment}</h1>
        {/* user comments */}
        <div className="comments my-4">
          {state.comments.length === 0 ? (
            <p className='display-5 ' >No comments</p>
          ) : (
            state.comments.map((commentObj,ind) =>{
              return(
                <div key={ind} className='bg-light p-3'>
                    <p className='fs-4'>
                      {commentObj.username}
                    </p>
                    <p className='ps-4'>
                        {commentObj.comment}
                    </p>
                </div>
              )
            })
          )}
        </div>
        {/* write comments by author */}
        {currentUser.userType === "user" && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              {...register("comment")}
              className="form-control mb-4"
              placeholder="Write comments here"
            />
            <button type="submit" className="btn btn-success">
              Add comment
            </button>
          </form>
        )}
      </div>
    </div>
        </> : <>
        <form onSubmit={handleSubmit(saveModifiedChanges)}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    {...register('title', { required: true } )}
                    defaultValue={state.title}
                  />
                  {/* {errors.title && <span className="text-danger">Title is required</span>} */}
                </div>
                <div className="mb-4">
                  <label htmlFor="category" className="form-label">
                    Select a category
                  </label>
                  <select {...register('category')} id="category" className="form-select" defaultValue={state.category}>
                    <option value="programming">Programming</option>
                    <option value="AI&ML">AI & ML</option>
                    <option value="database">Database</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="form-label" > 
                    Content
                  </label>
                  <textarea
                    {...register('content', { required: true })}
                    className="form-control"
                    id="content"
                    rows="10"
                    defaultValue={state.content}
                  ></textarea>
                  {/* {errors.content && <span className="text-danger">Content is required</span>} */}
                </div>
                <div className="text-end">
                  <button type="submit" className="btn btn-primary">
                    Post
                  </button>
                </div>
              </form>
        </>
      }
    </div>
  );
};

export default Article;
