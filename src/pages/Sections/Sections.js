import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PlusIcon from '../../components/Icons/PlusIcon';
import Loader from '../../components/Loader/Loader';
import { httpRequest } from '../../utils/requests';
import './Sections.scss';
import SectionTile from './sub-components/SectionTile/SectionTile';

const Sections = () => {
  const [loader, setLoader] = useState(true);
  const [labelsData, setLabelsData] = useState({});

  useEffect(async () => {
    const labelsContent = await httpRequest('GET', '/sections/labels');
    setLabelsData(labelsContent.data.data);
    setLoader(false);
  }, []);

  return (
    <>
      {loader && <Loader />}
      {!loader && (
        <main>
          <div className='container'>
            <h1>Nasze Sekcje</h1>
            <div className='section-tiles'>
              {labelsData.map((el) => (
                <SectionTile place={el.label} id={el.id} key={el.id} />
              ))}

              <Link to='/admin/sekcje/dodaj'>
                <div className='add-section-tile'>
                  <h2>DODAJ NOWĄ SEKCJĘ</h2>
                  <PlusIcon className='plus' />
                </div>
              </Link>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Sections;
