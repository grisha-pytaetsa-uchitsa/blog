/* eslint-disable react/jsx-props-no-spreading */
import styles from './Tag.module.scss';

export default function Tag({ tagsArr, last, addNewTag, register, deleteTag }) {
  return (
    <div className={styles.tag}>
      <input
        type="text"
        placeholder="Tag"
        {...register('tags', {
          required: 'Required field',
          minLength: { value: 1, message: 'Your title needs to be at least 1 characters.' },
          maxLength: { value: 20, message: 'Username is too long, no more than 20 characters.' },
        })}
      />
      {tagsArr.length >= 2 ? (
        <button className={styles.delete} type="button" onClick={deleteTag}>
          Delete
        </button>
      ) : null}
      {(last || tagsArr.length < 2) && (
        <button className={styles.add} type="button" onClick={addNewTag}>
          Add tag
        </button>
      )}
    </div>
  );
}
