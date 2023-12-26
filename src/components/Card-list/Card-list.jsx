/* eslint-disable react/jsx-props-no-spreading */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Card from '../Card/Card';
import PaginationComponet from '../Pagination/Pagination';
import { fetchGetArticles } from '../../store/cardSlice';

import styles from './Card-list.module.scss';

export default function CardList() {
  const { cards, changeLike } = useSelector((state) => state.card);
  const { isAuth, user } = useSelector((state) => state.user);
  const { token } = user;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchGetArticles({ token }));
    } else {
      dispatch(fetchGetArticles({}));
    }
  }, [dispatch, isAuth, token, changeLike]);

  return (
    <ul className={styles.cardList}>
      {cards.map((el) => (
        <li key={`${el.slug}${el.title}`}>
          <Card {...el} />
        </li>
      ))}
      <PaginationComponet className={styles.pagination} />
    </ul>
  );
}
