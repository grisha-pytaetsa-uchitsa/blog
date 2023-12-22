/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { operationWithAcc } from '../../store/userSlice';

import styles from './Sign-up.module.scss';

export default function SignUp() {
  const dispatch = useDispatch();
  const password = useRef({});

  const navigate = useNavigate();
  const goHome = () => navigate('/', { replace: true });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    mode: 'onChange',
  });

  password.current = watch('password', '');

  const onSubmitFn = (data) => {
    const newData = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    dispatch(operationWithAcc(newData));
    reset();
    goHome();
  };

  return (
    <div className={styles.SignUpContainer}>
      <h1 className={styles.title}>Create new account</h1>

      <form className={styles.form} onSubmit={handleSubmit(onSubmitFn)}>
        <label className={styles.inputLabel}>
          Username
          <input
            type="text"
            placeholder="Username"
            {...register('username', {
              required: 'Required field',
              minLength: { value: 3, message: 'Your username needs to be at least 3 characters.' },
              maxLength: { value: 20, message: 'Username is too long, no more than 20 characters.' },
            })}
          />
        </label>

        <div className={styles.warningText}>{errors?.username && <p>{errors?.username?.message || 'Error'}</p>}</div>

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

        <label className={styles.inputLabel}>
          Repeat Password
          <input
            type="password"
            placeholder="Password"
            {...register('repeatPassword', {
              required: 'Required field',
              validate: (value) => value === password.current || 'Passwords must match',
            })}
          />
        </label>

        <div className={styles.warningText}>
          {errors?.repeatPassword && <p>{errors?.repeatPassword?.message || 'Error'}</p>}
        </div>

        <label className={styles.inputCheckbox}>
          <input
            className={styles.checkbox}
            type="checkbox"
            {...register('checkbox', { required: 'Required field' })}
          />
          <span>I agree to the processing of my personal information</span>
        </label>

        <div className={styles.warningText}>{errors?.checkbox && <p>{errors?.checkbox?.message || 'Error'}</p>}</div>

        <button className={styles.buttonCreate} type="submit">
          Create
        </button>
      </form>

      <p>
        Already have an account? <Link to="/sign-in">Sign In.</Link>
      </p>
    </div>
  );
}
