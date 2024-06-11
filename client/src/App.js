import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
// import RootLayout from './RootLayout';
import Home from './Components/Home/Home';
import Signin from './Components/Singin/Signin';
import Signup from './Components/Signup/Signup';
import Footer from './Components/Footer/Footer';
import UserProfile from './Components/UserProfile/userProfile';
import AuthorProfile from './Components/authorProfile/authorProfile';
import AtriclesByAuthors from './Components/ArticlesByAuthors/AtriclesByAuthors';
import AddArticle from './Components/Add-Article/addArticle';
import Articles from './Components/articles/Articles';
import Article from './Components/article/article';

const router = createBrowserRouter([
  {
    path: '',
    element: <RootLayout />,
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
            element: <Articles/>
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
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
