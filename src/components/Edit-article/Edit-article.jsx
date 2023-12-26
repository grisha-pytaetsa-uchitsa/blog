import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { updateArticle } from '../../store/articleSlice';
import ArticleForm from '../Article-form/Article-form';

export default function EditArticle() {
  const { currentCard } = useSelector((state) => state.card);
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const { slug } = currentCard;

  const dispatch = useDispatch();

  const title = 'Edit article';
  const listOfTags = currentCard.tagList.map((el) => {
    const newEl = {
      name: el,
    };
    return newEl;
  });
  const editArticle = true;

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const onSubmitFn = (data) => {
    const newTagList = data.tagList.map((el) => el.name);

    const newData = {
      token,
      slug,
      info: {
        ...data,
        tagList: newTagList,
      },
    };
    dispatch(updateArticle(newData));

    goBack();
  };
  return <ArticleForm title={title} listOfTags={listOfTags} editArticle={editArticle} onSubmitFn={onSubmitFn} />;
}
