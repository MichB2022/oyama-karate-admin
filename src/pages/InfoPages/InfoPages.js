import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PlusIcon from '../../components/Icons/PlusIcon';
import Loader from '../../components/Loader/Loader';
import MasterTemplate from '../../templates/MasterTemplate/MasterTemplate';
import { httpRequest, redirect } from '../../utils/requests';
import './InfoPages.scss';
import InfoPageTile from './sub-components/InfoPageTile/InfoPageTile';

const InfoPages = () => {
  const [loader, setLoader] = useState(true);
  const [infoPagesData, setInfoPagesData] = useState([]);

  useEffect(async () => {
    try {
      const status = await httpRequest('GET', '/auth/authorize');
    } catch (e) {
      redirect('/');
    }
  }, []);

  useEffect(async () => {
    const data = await httpRequest('GET', '/infopages');
    setInfoPagesData(data.data.data);
    setLoader(false);
  }, []);

  return (
    <MasterTemplate>
      {loader && <Loader />}
      {!loader && (
        <main>
          <div className='container'>
            <h1>Strony informacyjne</h1>
            <div className='section-tiles'>
              {infoPagesData.map((el) => (
                <InfoPageTile title={el.title} id={el.id} key={el.id} />
              ))}

              <Link to='/admin/strony-informacyjne/dodaj'>
                <div className='add-section-tile'>
                  <h2>DODAJ NOWĄ STRONĘ INFORMACYJNĄ</h2>
                  <PlusIcon className='plus' />
                </div>
              </Link>
            </div>
          </div>
        </main>
      )}
    </MasterTemplate>
  );
};

export default InfoPages;
