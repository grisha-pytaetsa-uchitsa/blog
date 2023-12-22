/* eslint-disable react/no-array-index-key */
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFavorite } from '../../store/cardSlice';

import styles from './Card.module.scss';

export default function Card({ title, author, tagList, description, createdAt, favorited, favoritesCount, slug }) {
  const { user, isAuth } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const likesFn = () => {
    let likeInfo = {
      token: user.token,
      type: 'POST',
      slug,
    };

    if (favorited) {
      likeInfo = {
        token: user.token,
        type: 'DELETE',
        slug,
      };
    }
    dispatch(fetchFavorite(likeInfo));
  };

  return (
    <div className={styles.fullCard}>
      <div className={styles.miniCard}>
        <div className={styles.article}>
          <div className={styles.titleInfo}>
            <Link to={`/articles/${slug}`}>
              <h1 className={styles.title}>{title}</h1>
            </Link>
            <button className={styles.like} type="button" disabled={!isAuth} onClick={likesFn}>
              {favorited ? (
                <img src="./img/Heart_corazon.svg" alt="like" />
              ) : (
                <img src="./img/emptyHeart.svg" alt="like" />
              )}
              {favoritesCount}
            </button>
          </div>
          <div className={styles.alltags}>
            {tagList.map((el, i) => (
              <span className={styles.tag} key={i}>
                {el}
              </span>
            ))}
          </div>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.author}>
          <div className={styles.info}>
            <h1 className={styles.name}>{author.username}</h1>
            <span className={styles.date}>{format(new Date(createdAt), 'MMMM dd, yyyy')}</span>
          </div>
          <img className={styles.avatar} src={author.image} alt="avatar" />
        </div>
      </div>
    </div>
  );
}
