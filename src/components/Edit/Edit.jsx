/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { editAcc } from '../../store/userSlice';

import styles from './Edit.module.scss';

export default function Edit() {
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const password = useRef({});
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
      token,
      data,
    };
    dispatch(editAcc(newData));
    reset();
    goBack();
  };

  return (
    <div className={styles.editContainer}>
      <h1 className={styles.title}>Edit Profile</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmitFn)}>
        <label className={styles.inputLabel}>
          Username
          <input
            type="text"
            placeholder="Username"
            defaultValue={user.username}
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
            defaultValue={user.email}
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
          New password
          <input
            type="password"
            placeholder="New password"
            {...register('password', {
              required: 'Required field',
              minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
              maxLength: { value: 40, message: 'Password is too long, no more than 40 characters.' },
            })}
          />
        </label>

        <div className={styles.warningText}>{errors?.password && <p>{errors?.password?.message || 'Error'}</p>}</div>

        <label className={styles.inputLabel}>
          Avatar image (url)
          <input
            type="text"
            placeholder="Avatar image (url)"
            defaultValue={user.image}
            {...register('image', {
              required: 'Required field',
            })}
          />
        </label>

        <div className={styles.warningText}>{errors?.image && <p>{errors?.image?.message || 'Error'}</p>}</div>

        <button className={styles.buttonCreate} type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
