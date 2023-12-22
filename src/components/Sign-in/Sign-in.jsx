/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { operationWithAcc } from '../../store/userSlice';

import styles from './Sign-in.module.scss';

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goHome = () => navigate('/', { replace: true });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmitFn = (data) => {
    dispatch(operationWithAcc(data));
    reset();
    goHome();
  };

  return (
    <div className={styles.SignInContainer}>
      <h1 className={styles.title}>Sign In</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmitFn)}>
        <label className={styles.inputLabel}>
          Email address
          <input
            type="email"
            placeholder="Email address"
            {...register('email', {
              required: 'Required field',
              pattern: {
                value:
                  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                message: 'Enter valid email',
              },
            })}
          />
        </label>
        <div className={styles.warningText}>{errors?.email && <p>{errors?.email?.message || 'Error'}</p>}</div>
        <label className={styles.inputLabel}>
          Password
          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Required field',
              minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
              maxLength: { value: 40, message: 'Password is too long, no more than 40 characters.' },
            })}
          />
        </label>
        <div className={styles.warningText}>{errors?.password && <p>{errors?.password?.message || 'Error'}</p>}</div>
        <button className={styles.buttonCreate} type="submit">
          Login
        </button>
      </form>
      <p>
        Already have an account? <Link to="/sign-up">Sign Up.</Link>
      </p>
    </div>
  );
}
