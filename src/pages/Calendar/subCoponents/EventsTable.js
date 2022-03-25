import React, { useEffect, useState } from 'react';
import { VscNewFile } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import LeftArrow from '../../../components/Icons/LeftArrow';
import RightArrow from '../../../components/Icons/RightArrow';
import Loader from '../../../components/Loader/Loader';
import { httpRequest } from '../../../utils/requests';
import EventRow from './EventRow/EventRow';

const PER_PAGE = 10;

function EventsTable() {
  const [eventsData, setEventsData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [titleToFilter, setTitleToFilter] = useState(false);
  const [filteredByCategory, setFilteredByCategory] = useState('all');
  const [eventCategories, setEventCategories] = useState([]);

  useEffect(async () => {
    await eventsRequest();
    const categories = await httpRequest('GET', '/eventcategories');
    setEventCategories(categories.data.data);

    setLoader(false);
  }, []);

  useEffect(async () => {
    setLoader(true);
    await eventsRequest(
      titleToFilter !== '' && titleToFilter !== false,
      filteredByCategory !== 'all'
    );
    setLoader(false);
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

  const eventsRequest = async (isTitle, isFilteredByCategory) => {
    const calendarData = await httpRequest(
      'GET',
      `/calendar?page=${page}&perpage=${PER_PAGE}${
        isTitle ? `&title=${titleToFilter}` : ''
      }${isFilteredByCategory ? `&filterByCategory=${filteredByCategory}` : ''}
      `
    );
    setEventsData(calendarData.data.data);
    setPagination(calendarData.data.pagination);
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
            {eventCategories.map((el) => (
              <option value={el.id} key={el.id}>
                {el.name}
              </option>
            ))}
          </select>
        </div>
      </form>
      <section className='articles'>
        <div className='headers'>
          <h3>tytuł</h3>
          <h3>zdjęcie</h3>
          <h3>data rozpoczęcia</h3>
          <h3>data zakończenia</h3>
          <Link to='/admin/kalendarz/nowe-wydarzenie' className='new-article'>
            <VscNewFile />
            <p>Nowe wydarzenie</p>
          </Link>
        </div>
        <div className='belt'></div>
        <div className='main-articles-container'>
          {loader && <Loader />}
          {!loader &&
            eventsData.map((el) => <EventRow event={el} key={el.id} />)}
        </div>

        {eventsData.length > 0 && (
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
    </>
  );
}

export default EventsTable;
