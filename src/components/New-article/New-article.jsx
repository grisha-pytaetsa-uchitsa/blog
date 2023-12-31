/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { createArticle } from '../../store/articleSlice';
import ArticleForm from '../Article-form/Article-form';

export default function NewArticle() {
  const { user } = useSelector((state) => state.user);
  const { token } = user;

  const dispatch = useDispatch();

  const title = 'Create new article';
  const listOfTags = [{ name: '' }];
  const editArticle = false;

  const navigate = useNavigate();
  const goHome = () => navigate('/', { replace: true });

  const onSubmitFn = (data) => {
    const newTagList = data.tagList.map((el) => el.name);

    const newData = {
      token,
      info: {
        ...data,
        tagList: newTagList,
      },
    };

    dispatch(createArticle(newData));

    goHome();
  };

  return <ArticleForm title={title} listOfTags={listOfTags} editArticle={editArticle} onSubmitFn={onSubmitFn} />;
}
