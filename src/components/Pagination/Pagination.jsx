import { useState } from 'react';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import './Pagination.module.scss';

import { fetchGetArticles } from '../../store/cardSlice';

function PaginationComponet() {
  const { cardsCount } = useSelector((state) => state.card);
  const { isAuth, user } = useSelector((state) => state.user);
  const { token } = user;
  const dispatch = useDispatch();

  const [current, setCurrent] = useState(1);

  const onChange = (page) => {
    setCurrent(page);

    const skipNum = page * 5 - 5;

    if (isAuth) {
      const data = {
        token,
        skipNum,
      };

      dispatch(fetchGetArticles(data));
    } else {
      dispatch(fetchGetArticles({ skipNum }));
    }
  };

  return (
    <Pagination
      className="pagination"
      size="small"
      current={current}
      total={cardsCount}
      showSizeChanger={false}
      defaultPageSize={5}
      onChange={onChange}
    />
  );
}

export default PaginationComponet;
