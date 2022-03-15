import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PlusIcon from '../../components/Icons/PlusIcon';
import Loader from '../../components/Loader/Loader';
import { httpRequest, redirect } from '../../utils/requests';
import GaleryTile from './sub-components/GaleryTile/GaleryTile';
import './Galery.scss';
import MasterTemplate from '../../templates/MasterTemplate/MasterTemplate';

const Galery = () => {
  const [loader, setLoader] = useState(true);
  const [galeryData, setGaleryData] = useState([]);

  useEffect(async () => {
    try {
      const status = await httpRequest('GET', '/auth/authorize');
    } catch (e) {
      redirect('/');
    }
  }, []);

  useEffect(async () => {
    const data = await httpRequest('GET', '/galery');
    setGaleryData(data.data.data);
    setLoader(false);
  }, []);

  const handleAddBtn = async () => {
    const galeryName = document.getElementById('new-group');
    const galery = await httpRequest('POST', '/galery', {
      name: galeryName?.value
    });
    redirect(`/admin/galerie/dodaj/${galery.data.data.id}`);
  };

  return (
    <MasterTemplate>
      {loader && <Loader />}
      {!loader && (
        <main>
          <div className='container'>
            <h1>Galerie</h1>
            <div className='section-tiles'>
              {galeryData.map((el) => (
                <GaleryTile name={el.name} id={el.id} />
              ))}

              <div className='add-section-tile'>
                <h2>DODAJ NOWĄ GALERIĘ O NAZWIE:</h2>
                <input id='new-group' />
                <div onClick={handleAddBtn}>
                  <PlusIcon className='plus' />
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </MasterTemplate>
  );
};

export default Galery;
