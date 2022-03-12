import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import PlusIcon from '../../components/Icons/PlusIcon';
import InfoModalPopup from '../../components/InfoModalPopup/InfoModalPopup';
import Input from '../../components/Input/Input';
import InputFile from '../../components/InputFile/InputFile';
import InputTextArea from '../../components/InputTextArea/InputTextArea';
import Loader from '../../components/Loader/Loader';
import ModalPopup from '../../components/ModalPopup/ModalPopup';
import TextEditor from '../../components/TextEditor/TextEditor';
import { httpRequest, redirect } from '../../utils/requests';
import './NewSection.scss';
import Group from './sub-components/Group';

const NewSection = () => {
  const [grName, setGrName] = useState('');
  const [oldGrName, setOldGrName] = useState('');
  const [ReloadVar, setReloadVar] = useState(false);
  const inputRef = useRef();
  const { id } = useParams();
  const [loader, setLoader] = useState(true);
  const [currentSection, setCurrentSection] = useState({});
  const [deleted, setDeleted] = useState(false);
  const [deletVar, setDeleteVar] = useState(false);
  const [bigImg, setBigImg] = useState([{ file: { path: '' }, alt: '' }]);
  const [sectionDesc, setSectionDesc] = useState('');

  useEffect(async () => {
    if (id) {
      const sectionsContent = await httpRequest('GET', `/sections/${id}`);
      setCurrentSection(sectionsContent.data.data);
      setSectionDesc(sectionsContent.data.data.description);
      setBigImg([
        {
          imgUrl: sectionsContent.data.data.bigImgUrl,
          alt: sectionsContent.data.data.bigImgAlt
        }
      ]);
    } else {
      setCurrentSection({});
    }

    setLoader(false);
  }, []);

  useEffect(async () => {
    if (id) {
      const sectionsContent = await httpRequest('GET', `/sections/${id}`);
      setCurrentSection(sectionsContent.data.data);
      setSectionDesc(sectionsContent.data.data.description);
      setBigImg([
        {
          imgUrl: sectionsContent.data.data.bigImgUrl,
          alt: sectionsContent.data.data.bigImgAlt
        }
      ]);
    } else {
      setCurrentSection({});
    }

    setLoader(false);
  }, [ReloadVar]);

  useEffect(() => {
    const bigImgAlt = document.getElementById('bigImgAlt');
    if (bigImgAlt) {
      bigImgAlt.value = bigImg[0].alt;
    }
  }, [bigImg]);

  const handleSaveButton = async () => {
    const name = document.getElementById('name');
    const label = document.getElementById('label');
    const bigImgAlt = document.getElementById('bigImgAlt');
    const address = document.getElementById('address');
    const googleMapsLink = document.getElementById('googleMapsLink');

    const data = new FormData();

    if (bigImg[0].imgUrl) {
      data.append('bigImgUrl', bigImg[0].imgUrl);
    } else if (bigImg[0].img) {
      data.append('bigImg', bigImg[0].img);
    } else {
      data.append('bigImgUrl', '');
    }
    data.append('bigImgAlt', bigImgAlt ? bigImgAlt.value : '');
    data.append('name', name?.value);
    data.append('label', label?.value);
    data.append('description', sectionDesc);
    data.append('googleMapsLink', googleMapsLink?.value);
    data.append('address', address?.value);

    let section;
    if (id) {
      section = await httpRequest('PUT', `/sections/${id}`, data);
    } else {
      section = await httpRequest('POST', `/sections`, data);
    }
    if (!id) {
      redirect(`${window.location.href}/${section.data.data.id}`);
    }
  };

  const handleDelete = async (id) => {
    await httpRequest('DELETE', `/sectionsgroup/${id}`);
    setReloadVar(!ReloadVar);
    setOldGrName(grName + '-deleted');
  };

  const addGroup = async () => {
    inputRef.current.value = '';

    if (
      currentSection.groups.findIndex((el) => el.groupName === grName) !== -1 ||
      oldGrName === grName ||
      grName === ''
    ) {
      return;
    }
    await httpRequest('POST', `/sectionsgroup/add`, {
      sectionId: currentSection.id,
      groupName: `${grName}`
    });
    setOldGrName(grName);
    setReloadVar(!ReloadVar);
  };

  const handleRemoveClick = async () => {
    await httpRequest('DELETE', `/sections/${id}`);
    setDeleted(true);
  };

  if (deleted) {
    redirect('/admin/sekcje');
    return null;
  }

  return (
    <>
      {loader && <Loader />}
      {!loader && (
        <main>
          <div className='main-container'>
            <h2 className='header-container'>
              <p>Nasze sekcje - KATOWICE LIGOTA</p>
              <Link to='/admin/sekcje'>
                <Button text={'POWRÓT (bez zapisu)'} className='back-btn' />
              </Link>
            </h2>

            <Input
              label={'Nazwa selektora: '}
              className={''}
              id='label'
              value={currentSection?.label || ''}
            />

            <Input
              label={'Nazwa sekcji:'}
              className={''}
              value={currentSection?.name || ''}
              id='name'
            />

            <InputFile
              label={'Duże zdjęcie:'}
              className={''}
              id='bigImg'
              value={bigImg[0].img}
              setImgState={setBigImg}
              imgState={bigImg}
              filesRootFolder={'sections'}
            />
            <Input
              label={'alt do duzego zdjęcia: '}
              id='bigImgAlt'
              value={currentSection?.bigImgAlt || ''}
            />

            <TextEditor
              text={sectionDesc || null}
              setText={setSectionDesc}
              placeholder={'Podaj opis sekcji...'}
              label={'Opis sekcji: '}
            />

            <Input
              label={'Adres:'}
              className={'wide-input'}
              value={currentSection?.address || ''}
              id='address'
            />
            <Input
              label={'Link do Google Maps:'}
              className={'wide-input'}
              value={currentSection?.googleMapsLink || ''}
              id='googleMapsLink'
            />

            <div className='buttons'>
              {
                <InfoModalPopup
                  trigger={
                    <div className='green-btns'>
                      <Button
                        text={'ZAPISZ ZMIANY'}
                        onclick={handleSaveButton}
                      />
                      <Link to='/admin/sekcje'>
                        <Button text={'POWRÓT (bez zapisu)'} />
                      </Link>
                    </div>
                  }
                  text='Zmiany zostały zapisane'
                />
              }

              <ModalPopup
                trigger={
                  id && (
                    <Button text={'USUŃ SEKCJĘ'} onclick={handleRemoveClick} />
                  )
                }
                text='Czy na pewno chcesz usunąć tę sekcję?'
                onYesClick={handleRemoveClick}
              />
            </div>

            {id && (
              <>
                <h4>Grafik zajęć:</h4>
                <div className='groups-container'>
                  <div className='add-section-tile'>
                    <h2>DODAJ NOWĄ GRUPĘ O NAZWIE: </h2>
                    <input
                      ref={inputRef}
                      onChange={(event) => setGrName(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.keyCode === 13) {
                          addGroup();
                        }
                      }}
                    ></input>
                    <div onClick={() => addGroup()}>
                      <PlusIcon className='plus' />
                    </div>
                  </div>
                  {currentSection?.groups?.map((group) => (
                    <Group
                      groupName={group.groupName}
                      schedule={group.schedule}
                      groups={currentSection.groups}
                      groupId={group.id}
                      grName={grName}
                      setGrName={setGrName}
                      oldGrName={oldGrName}
                      setOldGrName={setOldGrName}
                      ReloadVar={ReloadVar}
                      setReloadVar={setReloadVar}
                      deletVar={deletVar}
                      setDeleteVar={setDeleteVar}
                      handleDelete={handleDelete}
                      id={id}
                      key={group.id}
                    ></Group>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      )}
    </>
  );
};

export default NewSection;
