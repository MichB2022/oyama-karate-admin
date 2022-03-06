import React, { useEffect, useState } from 'react';
import { VscNewFile } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import LeftArrow from '../../components/Icons/LeftArrow';
import RightArrow from '../../components/Icons/RightArrow';
import Loader from '../../components/Loader/Loader';
import { httpRequest } from '../../utils/requests';
import './Articles.scss';
import ArticleRow from './sub-components/ArticleRow/ArticleRow';

const PER_PAGE = 8;

const Articles = () => {
  const [articlesData, setArticlesData] = useState({});
  const [louder, setLouder] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [categories, setcategories] = useState([]);
  const [titleToFilter, setTitleToFilter] = useState(false);
  const [filteredByCategory, setFilteredByCategory] = useState('all');

  const articleRequest = async (isTitle, isFilteredByCategory) => {
    const articlesResult = await httpRequest(
      'GET',
      `/articles?page=${page}&perpage=${PER_PAGE}${
        isTitle ? `&title=${titleToFilter}` : ''
      }${isFilteredByCategory ? `&filterByCategory=${filteredByCategory}` : ''}
      `
    );
    setArticlesData({ articles: articlesResult.data.data });
    setPagination(articlesResult.data.pagination);
  };

  useEffect(async () => {
    await articleRequest();
    const categories = await httpRequest('GET', `/categories`);
    setcategories(categories.data.data);
    setLouder(false);
  }, []);

  useEffect(async () => {
    setLouder(true);
    await articleRequest(
      titleToFilter !== '' && titleToFilter !== false,
      filteredByCategory !== 'all'
    );
    setLouder(false);
  }, [page, titleToFilter, filteredByCategory]);

  const getPagination = () => {
    const paginationElements = [];

    for (let i = 1; i < pagination.pagesCount + 1; i++) {
      paginationElements.push(
        <div
          key={`pagination-tile-${i}`}
          className={`pagination-tile ${
            i === pagination.currentPage ? 'pagination-active' : ''
          }`}
          onClick={() => {
            if (i !== pagination.currentPage) {
              setPage(i);
            }
          }}
        >
          {i}
        </div>
      );
    }
    return paginationElements;
  };

  const changePage = (direction) => {
    if (direction === 'LEFT' && pagination.currentPage > 1) {
      setPage(page - 1);
    } else if (
      direction === 'RIGHT' &&
      pagination.currentPage < pagination.pagesCount
    ) {
      setPage(page + 1);
    }
  };

  return (
    <>
      <main>
        <div className='news-container'>
          <h1>Aktualności</h1>

          <form className='inputs-container'>
            <div className='input-container'>
              <label htmlFor='title'>wyszukaj po tytule: </label>
              <input
                type='text'
                name='title'
                placeholder='podaj tytuł'
                onChange={(e) => setTitleToFilter(e.target.value)}
              />
            </div>

            <div className='input-container'>
              <label htmlFor='sort'>filtruj po kategorii: </label>
              <select
                name='sorting'
                className='select'
                defaultValue={'all'}
                onChange={(e) => setFilteredByCategory(e.target.value)}
              >
                <option value={'all'}>-- wszystkie --</option>
                {categories.map((el) => (
                  <option value={el.id} key={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
          {louder && <Loader />}
          {!louder && (
            <section className='articles'>
              <div className='headers'>
                <h3>tytuł</h3>
                <h3>zdjęcie</h3>
                <h3>dodano</h3>
                <h3>tagi</h3>
                <Link to='/admin/aktualnosci/nowy' className='new-article'>
                  <VscNewFile />
                  <p>Nowy Artykuł</p>
                </Link>
              </div>
              <div className='belt'></div>
              <div className='main-articles-container'>
                {articlesData.articles.map((el) => (
                  <ArticleRow article={el} key={el.id} />
                ))}
              </div>

              {articlesData.articles.length > 0 && (
                <div className='pagination-container'>
                  <div className='pagination-content'>
                    <LeftArrow
                      className='pagination-arrow'
                      onClick={() => changePage('LEFT')}
                    />
                    <div className='pagination'>{getPagination()}</div>
                    <RightArrow
                      className='pagination-arrow'
                      onClick={() => changePage('RIGHT')}
                    />
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </>
  );
};

export default Articles;
