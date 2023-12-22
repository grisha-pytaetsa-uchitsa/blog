import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flex, Spin } from 'antd';

import { logOut } from '../../store/userSlice';

import styles from './Header.module.scss';

export default function Header() {
  const { status } = useSelector((state) => state.card);
  const { user } = useSelector((state) => state.user);
  const { isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.headerText}>
        Realworld Blog
      </Link>

      {status === 'loading' && (
        <Flex className="spiner" align="center" gap="middle" justify="center">
          <Spin size="small" />
          <Spin />
          <Spin size="large" />
        </Flex>
      )}

      {isAuth && (
        <div className={styles.buttonContainer}>
          <Link to="/new-article" className={styles.create} type="button">
            Create article
          </Link>
          <Link to="/profile" className={styles.user} type="button">
            <span>{user.username}</span>
            <img src={user.image} alt="user" />
          </Link>
          <Link to="/" className={styles.logout} onClick={() => dispatch(logOut())}>
            Log out
          </Link>
        </div>
      )}

      {!isAuth && (
        <div className={styles.buttonContainer}>
          <Link to="/sign-in" className={styles.signin} type="button">
            Sign In
          </Link>
          <Link to="/sign-up" className={styles.signup} type="button">
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
