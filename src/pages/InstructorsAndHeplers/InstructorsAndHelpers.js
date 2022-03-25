import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PlusIcon from '../../components/Icons/PlusIcon';
import Loader from '../../components/Loader/Loader';
import UpdateOrder from '../../components/UpdateOrder/UpdateOrder';
import MasterTemplate from '../../templates/MasterTemplate/MasterTemplate';
import { httpRequest, redirect } from '../../utils/requests';
import './InstructorsAndHelpers.scss';
import InstructorsAndHelpersTile from './sub-components/InstructorsAndHelpersTile/InstructorsAndHelpersTile';

const InstructorsAndHelpers = () => {
  const [loader, setLoader] = useState(true);
  const [InstructorsAndHelpersData, setInstructorsAndHelpersData] = useState(
    []
  );

  useEffect(async () => {
    try {
      const status = await httpRequest('GET', '/auth/authorize');
    } catch (e) {
      redirect('/');
    }
  }, []);

  useEffect(async () => {
    const data = await httpRequest('GET', '/instructors');
    setInstructorsAndHelpersData(data.data.data);
    setLoader(false);
  }, []);

  return (
    <MasterTemplate>
      {loader && <Loader />}
      {!loader && (
        <main>
          <div className='container'>
            <h1>Instruktorzy i pomocnicy</h1>
            <div className='section-tiles'>
              {InstructorsAndHelpersData.map((el) => (
                <InstructorsAndHelpersTile name={el.name} id={el.id} />
              ))}

              <Link to='/admin/instruktorzy-i-pomocnicy/dodaj'>
                <div className='add-section-tile'>
                  <h2>DODAJ NOWEGO INSTRUKTORA LUB POMOCNIKA</h2>
                  <PlusIcon className='plus' />
                </div>
              </Link>

              <UpdateOrder
                tableName={'Instructor'}
                data={InstructorsAndHelpersData}
              />
            </div>
          </div>
        </main>
      )}
    </MasterTemplate>
  );
};

export default InstructorsAndHelpers;
