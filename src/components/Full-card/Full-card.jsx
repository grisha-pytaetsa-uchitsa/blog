/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-useless-fragment */
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { format } from 'date-fns';
import Markdown from 'markdown-to-jsx';
import { message, Popconfirm } from 'antd';

import { fetchFavorite, fetchGetOneArticle } from '../../store/cardSlice';
import { deleteArticle } from '../../store/articleSlice';

import styles from './Full-card.module.scss';

export default function FullCard() {
  const { currentCard, status } = useSelector((state) => state.card);
  const { user, isAuth } = useSelector((state) => state.user);
  const { token } = user;
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const goHome = () => navigate('/', { replace: true });

  const { id } = useParams();

  useEffect(() => {
    if (isAuth) {
      const data = {
        token,
        id,
      };
      dispatch(fetchGetOneArticle(data));
    } else {
      dispatch(fetchGetOneArticle({ id }));
    }
  }, [dispatch, id, isAuth, token]);

  const confirm = () => {
    const data = {
      token,
      slug: currentCard.slug,
    };
    dispatch(deleteArticle(data));
    message.success('Article deleted');
    goHome();
  };

  const cancel = () => {
    message.error('Deletion canceled');
  };

  const likesFn = () => {
    let likeInfo = {
      token,
      type: 'POST',
      slug: currentCard.slug,
    };

    if (currentCard.favorited) {
      likeInfo = {
        token,
        type: 'DELETE',
        slug: currentCard.slug,
      };
    }
    dispatch(fetchFavorite(likeInfo));
  };

  return (
    <>
      {currentCard && status !== 'loading' ? (
        <div className={styles.fullCard}>
          <div className={styles.miniCard}>
            <div className={styles.article}>
              <div className={styles.titleInfo}>
                <Link to="/">
                  <h1 className={styles.title}>{currentCard.title}</h1>
                </Link>
                <button className={styles.like} type="button" disabled={!isAuth} onClick={likesFn}>
                  {currentCard.favorited ? (
                    <img src="../img/Heart_corazon.svg" alt="like" />
                  ) : (
                    <img src="../img/emptyHeart.svg" alt="like" />
                  )}
                  {currentCard.favoritesCount}
                </button>
              </div>
              <div className={styles.alltags}>
                {currentCard.tagList.map((el, i) => (
                  <span className={styles.tag} key={i}>
                    {el}
                  </span>
                ))}
              </div>
              <p className={styles.description}>{currentCard.description}</p>
            </div>
            <div>
              <div className={styles.author}>
                <div className={styles.info}>
                  <h1 className={styles.name}>{currentCard.author.username}</h1>
                  <span className={styles.date}>{format(new Date(currentCard.createdAt), 'MMMM dd, yyyy')}</span>
                </div>
                <img className={styles.avatar} src={currentCard.author.image} alt="avatar" />
              </div>
              {currentCard.author.username === user.username && (
                <div className={styles.deleteEdit}>
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this article?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <button className={styles.delete} type="button">
                      Delete
                    </button>
                  </Popconfirm>
                  <Link className={styles.edit} to={`/articles/${currentCard.slug}/edit`}>
                    Edit
                  </Link>
                </div>
              )}
            </div>
          </div>
          <Markdown className={styles.text}>{currentCard.body}</Markdown>
        </div>
      ) : null}
    </>
  );
}
