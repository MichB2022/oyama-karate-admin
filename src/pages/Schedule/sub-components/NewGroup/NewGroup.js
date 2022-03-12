import React, { useEffect, useState } from 'react';
import { VscNewFile } from 'react-icons/vsc';
import { Link, useParams } from 'react-router-dom';
import Button from '../../../../components/Button/Button';
import LeftArrow from '../../../../components/Icons/LeftArrow';
import RightArrow from '../../../../components/Icons/RightArrow';
import InfoModalPopup from '../../../../components/InfoModalPopup/InfoModalPopup';
import Loader from '../../../../components/Loader/Loader';
import ModalPopup from '../../../../components/ModalPopup/ModalPopup';
import { httpRequest, redirect } from '../../../../utils/requests';
import ScheduleRow from '../ScheduleRow/ScheduleRow';
import './NewGroup.scss';

const NewGroup = () => {
  const { groupId } = useParams();
  const [louder, setlouder] = useState(true);
  const [groupsData, setgroupsData] = useState({});
  const [group, setGroup] = useState({});

  useEffect(async () => {
    const group = await httpRequest('GET', `/schedule/${groupId}`);
    const rows = await httpRequest('GET', `/schedule/row/${groupId}`);
    setgroupsData({ groups: rows.data.data });
    setGroup(group.data.data);
    setlouder(false);
  }, []);

  const handleRemoveClick = async () => {
    await httpRequest('DELETE', `/schedule/${groupId}`);
    redirect('/admin/harmonogram');
  };

  return (
    <>
      {louder && <Loader />}
      {!louder && (
        <main>
          <div className='news-container'>
            <h1>Harmonogram dla grupy {group?.name || 'Nowa Grupa'}</h1>

            <section className='articles'>
              <div className='headers'>
                <h3>Miejsce</h3>
                <h3>Adres</h3>
                <h3>Dzień</h3>
                <h3>Instruktor</h3>
                <h3>Pomocnicy</h3>
                <Link
                  to={`/admin/harmonogram/dodaj/wiersz/${groupId}`}
                  className='new-article'
                >
                  <VscNewFile />
                  <p>Dodaj wiersz</p>
                </Link>
              </div>
              <div className='belt'></div>
              <div className='main-articles-container'>
                {groupsData.groups.map((el) => (
                  <ScheduleRow key={el.id} groupId={groupId} group={el} />
                ))}
              </div>

              <div className='buttons'>
                {
                  <InfoModalPopup
                    trigger={
                      <div className='green-btns'>
                        <Link to='/admin/harmonogram'>
                          <Button text={'POWRÓT'} />
                        </Link>
                      </div>
                    }
                    text='Zmiany zostały zapisane'
                  />
                }

                {
                  <ModalPopup
                    trigger={
                      <div>
                        <Button text={'USUŃ GRUPĘ'} />
                      </div>
                    }
                    text='Czy na pewno chcesz usunąć tę grupę?'
                    onYesClick={handleRemoveClick}
                  />
                }
              </div>
            </section>
          </div>
        </main>
      )}
    </>
  );
};

export default NewGroup;
