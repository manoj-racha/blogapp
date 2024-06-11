import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {axiousWithToken} from '../../axiousWithToken'

const Article = () => {
  const { currentUser } = useSelector((state) => state.userAuthorLogin);
  let { state } = useLocation();
  // console.log(state)
  const { register, handleSubmit, reset } = useForm();
  let [comment,setComment] = useState('')
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
              <span className="me-2" onClick={enableEditStatus}>Edit</span>
              <span>Delete</span>
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
            <p className='display-3' >No comments</p>
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
        <form >
          <input type="text" />
        </form>
        </>
      }
    </div>
  );
};

export default Article;
