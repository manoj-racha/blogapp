import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
// import RootLayout from './RootLayout';
import Home from './Components/Home/Home';
import Signin from './Components/Singin/Signin';
import Signup from './Components/Signup/Signup';
import Footer from './Components/Footer/Footer';
import {lazy,Suspense} from 'react'
import UserProfile from './Components/UserProfile/userProfile';
import AuthorProfile from './Components/authorProfile/authorProfile';
import AtriclesByAuthors from './Components/ArticlesByAuthors/AtriclesByAuthors';
import AddArticle from './Components/Add-Article/addArticle';
// import Articles from './Components/articles/Articles';

import Article from './Components/article/article';
import Error from './Components/Error';
const Articles = lazy(()=>import('./Components/articles/Articles'))

const router = createBrowserRouter([
  {
    path: '',
    element: <RootLayout />,
    errorElement: <Error/>,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'signin',
        element: <Signin />,
      },
      {
        path: 'user-profile',
        element: <UserProfile />,
        children:[
          {
            path:'articles',
            element:<Suspense fallback="loading..."><Articles/></Suspense> 
          },
          {
            path : 'article/:articleId',
            element : <Article/>
        },
        ]
      },
      {
        path: 'author-profile',
        element: <AuthorProfile />,
        children: [
          {
            path: 'new-article',
            element: <AddArticle />,
          },
          {
            path: 'articles-by-author/:author',
            element: <AtriclesByAuthors />,
          },
          {
              path : 'article/:articleId',
              element : <Article/>
          },
          {
            path :'',
            element : <Navigate to ='articles-by-author/:author'/>
          }
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
