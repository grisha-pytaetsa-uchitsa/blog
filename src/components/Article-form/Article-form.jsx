/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useFieldArray, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import styles from './Article-form.module.scss';

export default function ArticleForm({ title, onSubmitFn, listOfTags, editArticle }) {
  const { currentCard } = useSelector((state) => state.card);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      tagList: listOfTags,
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
    rules: {
      required: 'all fields must be filled in',
    },
  });

  return (
    <div className={styles.articleContainer}>
      <h1 className={styles.title}>{title}</h1>

      <form className={styles.form} onSubmit={handleSubmit(onSubmitFn)}>
        <label className={styles.inputLabel}>
          Title
          <input
            type="text"
            placeholder="Title"
            defaultValue={editArticle ? currentCard.title : null}
            {...register('title', {
              required: 'Required field',
              minLength: { value: 1, message: 'Your title needs to be at least 1 characters.' },
              maxLength: { value: 40, message: 'Username is too long, no more than 40 characters.' },
            })}
          />
        </label>

        <div className={styles.warningText}>{errors?.title && <p>{errors?.title?.message || 'Error'}</p>}</div>

        <label className={styles.inputLabel}>
          Short description
          <input
            type="text"
            placeholder="Description"
            defaultValue={editArticle ? currentCard.description : null}
            {...register('description', {
              required: 'Required field',
              minLength: { value: 1, message: 'Your title needs to be at least 1 character.' },
              maxLength: { value: 100, message: 'Username is too long, no more than 100 characters.' },
            })}
          />
        </label>

        <div className={styles.warningText}>
          {errors?.description && <p>{errors?.description?.message || 'Error'}</p>}
        </div>

        <label className={styles.inputLabel}>
          Text
          <textarea
            placeholder="Text"
            defaultValue={editArticle ? currentCard.body : null}
            {...register('body', {
              required: 'Required field',
              minLength: { value: 1, message: 'Your text needs to be at least 1 character.' },
            })}
          />
        </label>

        <div className={styles.warningText}>{errors?.body && <p>{errors?.body?.message || 'Error'}</p>}</div>

        <label className={styles.inputLabelTags}>
          Tags
          <div className={styles.tagContainer}>
            <div className={styles.onlyTagContainer}>
              {fields.map((field, index) => (
                <div className={styles.tag} key={field.id}>
                  <div>
                    <input
                      type="text"
                      placeholder="Tag"
                      defaultValue={editArticle ? currentCard.taglist : null}
                      {...register(`tagList.${index}.name`, {
                        required: 'Required field',
                        minLength: { value: 1, message: 'Your title needs to be at least 1 characters.' },
                        maxLength: { value: 20, message: 'Username is too long, no more than 20 characters.' },
                      })}
                    />
                  </div>
                  <button className={styles.delete} type="button" onClick={() => remove(index)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <button
              className={styles.add}
              type="button"
              onClick={() => {
                append();
              }}
            >
              Add tag
            </button>
          </div>
        </label>

        <div className={styles.warningText}>
          <p>{errors.tagList?.root?.message}</p>
        </div>

        <button className={styles.buttonCreate} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
