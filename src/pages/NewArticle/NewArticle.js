import React, { useEffect, useRef, useState } from 'react';
import './NewArticle.scss';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../configs/api';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import InputFile from '../../components/InputFile/InputFile';
import TextEditor from '../../components/TextEditor/TextEditor';
import Tag from '../Articles/sub-components/Tag/Tag';
import { httpRequest, redirect } from '../../utils/requests';
import InputTextArea from '../../components/InputTextArea/InputTextArea';
import 'react-quill/dist/quill.core.css';

const NewArticle = () => {
  const [ReloadVar, setReloadVar] = useState(false);
  const inputRef = useRef();
  const { id } = useParams();
  const [categories, setcategories] = useState([]);
  const [article, setArticle] = useState({});
  const [louder, setLouder] = useState(true);
  const [tags, setTags] = useState([]);
  const [isAnyFieldEmpty, setIsAnyFieldEmpty] = useState(false);
  const [articleText, setArticleText] = useState(null);

  useEffect(async () => {
    const categoriesResult = await axios.get(`${API_URL}/categories`);
    setcategories(categoriesResult.data.data);

    if (id) {
      const articleResult = await axios.get(`${API_URL}/articles/${id}`);
      setArticle({ ...articleResult.data.data });
      setArticleText(articleResult.data.data.text);
      setTags(
        articleResult.data.data.tags.map((el, index) => {
          return {
            id: index,
            name: el
          };
        })
      );
    } else {
      setTags([]);
    }
    setLouder(false);
  }, []);

  const createArticleContent = async () => {
    const title = document.getElementById('title');
    const categoryId = document.getElementById('categoryId');
    const shortenDesc = document.getElementById('shortenDesc');
    const bigImgUrl = document.getElementById('bigImgUrl');
    const bigImgAlt = document.getElementById('bigImgAlt');
    const smallImgUrl = document.getElementById('smallImgUrl');
    const smallImgAlt = document.getElementById('smallImgAlt');

    if (
      title?.value !== '' &&
      categoryId?.value !== '' &&
      articleText?.value !== '' &&
      shortenDesc?.value !== '' &&
      bigImgAlt?.value !== '' &&
      smallImgAlt?.value
    ) {
      const data = {
        title: title ? title?.value : '',
        category_id: categoryId ? categoryId?.value : '',
        text: articleText ? articleText : '',
        shortenDesc: shortenDesc ? shortenDesc?.value : '',
        bigImgUrl: bigImgUrl ? bigImgUrl?.value : '',
        bigImgAlt: bigImgAlt ? bigImgAlt?.value : '',
        smallImgUrl: smallImgUrl ? smallImgUrl?.value : '',
        smallImgAlt: smallImgAlt ? smallImgAlt?.value : '',
        tags: tags
      };
      if (id) {
        await httpRequest('PUT', `/articles/${id}`, data);
      } else {
        await httpRequest('POST', '/articles', data);
      }

      redirect('/admin/aktualnosci');
    } else {
      setIsAnyFieldEmpty(true);
    }
  };

  return (
    <>
      {louder && <Loader />}
      {!louder && (
        <main>
          <div className='new-article-container'>
            <h2 className='header-container header-container-margin'>
              <p>Nowy Artykuł</p>
              <Link to='/admin/aktualnosci'>
                <Button text={'POWRÓT (bez zapisu)'} className='back-btn' />
              </Link>
            </h2>
            <Input
              label={'Tytuł:'}
              className={''}
              value={article?.title || ''}
              id='title'
            />
            <InputFile label={'duze zdjęcie:'} className={''} id='bigImgUrl' />

            <Input
              label={'alt do duzego zdjęcia:'}
              className={''}
              value={article?.bigImgAlt || ''}
              id='bigImgAlt'
            />
            <InputFile
              label={'małe zdjęcie:'}
              className={''}
              id='smallImgUrl'
            />
            <Input
              label={'alt do małego zdjęcia:'}
              className={''}
              value={article.smallImgAlt || ''}
              id='smallImgAlt'
            />

            <form className='input-container'>
              <label htmlFor='sort'>wybierz kategorie artykulu: </label>
              <select
                name='sorting'
                className='select'
                id='categoryId'
                defaultValue={article.category_id}
              >
                {categories.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </form>

            <div className='tags-container'>
              <h3>Tagi</h3>
              <input
                ref={inputRef}
                type='text'
                placeholder='Dodaj tag'
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    setTags([
                      ...tags,
                      {
                        id: tags.length > 0 ? tags[tags.length - 1].id + 1 : 0,
                        name: event.target.value
                      }
                    ]);
                    inputRef.current.value = '';
                  }
                }}
              />
              <div className='tags'>
                {tags.map((el) => (
                  <Tag
                    key={el.id}
                    name={el.name}
                    id={el.id}
                    tags={tags}
                    ReloadVar={ReloadVar}
                    setReloadVar={setReloadVar}
                  />
                ))}
              </div>
            </div>

            <InputTextArea
              label={'Skrócony opis (bez styli): '}
              value={article.shortenDesc}
              id={'shortenDesc'}
            />

            <TextEditor
              text={articleText || null}
              setText={setArticleText}
              placeholder={'Podaj treść artykułu...'}
              label={'Treść Artykułu: '}
            />

            {isAnyFieldEmpty && (
              <div className='empty-field-warning'>
                Wszystkie pola muszą być uzupełnione!
              </div>
            )}

            <div className='buttons'>
              <div className='green-btns'>
                <Button
                  text={'ZAPISZ ZMIANY'}
                  onclick={() => createArticleContent()}
                />
                <Link to='/admin/aktualnosci'>
                  <Button text={'POWRÓT (bez zapisu)'} />
                </Link>
              </div>
            </div>

            <section className='preview'>
              <p>Podgląd artykułu: </p>
              <div
                className='ql-editor'
                dangerouslySetInnerHTML={{ __html: articleText }}
              />
            </section>
          </div>
        </main>
      )}
    </>
  );
};

export default NewArticle;
