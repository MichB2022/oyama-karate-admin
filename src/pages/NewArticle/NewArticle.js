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
import InfoModalPopup from '../../components/InfoModalPopup/InfoModalPopup';
import MasterTemplate from '../../templates/MasterTemplate/MasterTemplate';
// const imgMagic = require('imagemagick');

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
  const [bigImg, setBigImg] = useState([{ file: { path: '' }, alt: '' }]);
  // const [smallImg, setSmallImg] = useState([{ file: { path: '' }, alt: '' }]);

  useEffect(async () => {
    try {
      const status = await httpRequest('GET', '/auth/authorize');
    } catch (e) {
      redirect('/');
    }
  }, []);

  useEffect(async () => {
    const categoriesResult = await axios.get(`${API_URL}/categories`);
    setcategories(categoriesResult.data.data);

    if (id) {
      const articleResult = await axios.get(`${API_URL}/articles/${id}`);
      setArticle({ ...articleResult.data.data });
      setArticleText(articleResult.data.data.text);
      setBigImg([
        {
          imgUrl: articleResult.data.data.bigImgUrl,
          alt: articleResult.data.data.bigImgAlt
        }
      ]);
      // setSmallImg([
      //   {
      //     imgUrl: articleResult.data.data.smallImgUrl,
      //     alt: articleResult.data.data.smallImgAlt
      //   }
      // ]);
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

  useEffect(() => {
    const bigImgAlt = document.getElementById('bigImgAlt');
    if (bigImgAlt) {
      bigImgAlt.value = bigImg[0].alt;
    }
  }, [bigImg]);

  // useEffect(() => {
  //   const smallImgAlt = document.getElementById('smallImgAlt');
  //   if (smallImgAlt) {
  //     smallImgAlt.value = smallImg[0].alt;
  //   }
  // }, [smallImg]);

  const createArticleContent = async () => {
    const title = document.getElementById('title');
    const categoryId = document.getElementById('categoryId');
    const shortenDesc = document.getElementById('shortenDesc');
    const pageDescription = document.getElementById('pageDescription');
    const bigImgAlt = document.getElementById('bigImgAlt');
    // const smallImgAlt = document.getElementById('smallImgAlt');

    if (
      title?.value !== '' &&
      categoryId?.value !== '' &&
      articleText?.value !== '' &&
      shortenDesc?.value !== ''
    ) {
      const data = new FormData();
      data.append('title', title ? title.value : '');
      data.append(
        'pageDescription',
        pageDescription ? pageDescription.value : ''
      );
      data.append('category_id', categoryId ? categoryId.value : '');
      data.append('text', articleText ? articleText : '');
      data.append('shortenDesc', shortenDesc ? shortenDesc.value : '');
      if (bigImg[0].imgUrl) {
        data.append('bigImgUrl', bigImg[0].imgUrl);
        // data.append('smallImgUrl', smallImg[0].imgUrl);
      } else if (bigImg[0].img) {
        data.append('bigImg', bigImg[0].img);
      } else {
        data.append('bigImgUrl', '');
        // data.append('smallImgUrl', '');
      }

      data.append('bigImgAlt', bigImgAlt ? bigImgAlt.value : '');
      // data.append('smallImgAlt', bigImgAlt ? `${bigImgAlt.value}-small` : '');
      data.append(
        'tags',
        tags.map((tag) => (tag = tag.name))
      );
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
    <MasterTemplate>
      {louder && <Loader />}
      {!louder && (
        <main>
          <div className='new-article-container'>
            <h2 className='header-container header-container-margin'>
              <p>{id ? 'Edycja Artykułu' : 'Nowy Artykuł'}</p>
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
            <Input
              label={'Opis strony:'}
              className={''}
              value={article?.pageDescription || ''}
              id='pageDescription'
            />
            <InputFile
              label={'Zdjęcie:'}
              className={''}
              id='bigImgUrl'
              value={bigImg[0].img}
              setImgState={setBigImg}
              imgState={bigImg}
              filesRootFolder={'articles'}
            />

            <Input
              label={'Alt zdjęcia:'}
              className={''}
              value={bigImg[0].alt}
              id='bigImgAlt'
            />
            {/* <InputFile
              label={'Małe zdjęcie:'}
              className={''}
              id='smallImgUrl'
              value={smallImg[0].img}
              setImgState={setSmallImg}
              imgState={smallImg}
              filesRootFolder={'articles'}
            />
            <Input
              label={'Alt do małego zdjęcia:'}
              className={''}
              value={smallImg[0].alt}
              id='smallImgAlt'
            /> */}

            <form className='input-container'>
              <label htmlFor='sort'>Wybierz kategorie artykulu: </label>
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
              {
                <InfoModalPopup
                  trigger={
                    <div className='green-btns'>
                      <Button
                        text={'ZAPISZ ZMIANY'}
                        onclick={() => createArticleContent()}
                      />
                      <Link to='/admin/aktualnosci'>
                        <Button text={'POWRÓT (bez zapisu)'} />
                      </Link>
                    </div>
                  }
                  text='Zmiany zostały zapisane'
                />
              }
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
    </MasterTemplate>
  );
};

export default NewArticle;
