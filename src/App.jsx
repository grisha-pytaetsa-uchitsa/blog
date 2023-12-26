import { useDispatch, useSelector } from 'react-redux';
import { Alert, Space } from 'antd';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import CardList from './components/Card-list/Card-list';
import Header from './components/Header/Header';
import SignUp from './components/Sign-up/Sign-up';
import SignIn from './components/Sign-in/Sign-in';
import Edit from './components/Edit/Edit';
import NewArticle from './components/New-article/New-article';
import FullCard from './components/Full-card/Full-card';
import RequireAuth from './hoc/RequireAuth';
import EditArticle from './components/Edit-article/Edit-article';
import { getUser } from './store/userSlice';

function App() {
  const { error } = useSelector((state) => state.card);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = JSON.parse(localStorage.getItem('token'));
      dispatch(getUser(token));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      {error && (
        <Space className="errorText" direction="vertical">
          <Alert message="Error" description={error} type="error" closable />
        </Space>
      )}

      <Routes>
        <Route path="/" element={<CardList />} />
        <Route
          path="/new-article"
          element={
            <RequireAuth>
              <NewArticle />
            </RequireAuth>
          }
        />
        <Route path="/articles/:slug/edit" element={<EditArticle />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Edit />
            </RequireAuth>
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/articles/:id" element={<FullCard />} />
      </Routes>
    </div>
  );
}

export default App;
