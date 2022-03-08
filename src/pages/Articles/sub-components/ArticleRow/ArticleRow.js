import axios from 'axios';
import React, { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { CgFileRemove } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';
import ModalPopup from '../../../../components/ModalPopup/ModalPopup';
import { API_UPLOADS_URL, API_URL } from '../../../../configs/api';
import { httpRequest } from '../../../../utils/requests';
import './ArticleRow.scss';

const ArticleRow = ({ article }) => {
  const { title, bigImgUrl, tags, id, createdAt } = article;

  const [deleted, setDeleted] = useState(false);

  const handleRemoveClick = async () => {
    await httpRequest('DELETE', `/articles/${id}`);
    setDeleted(true);
  };

  if (deleted) {
    return null;
  }

  return (
    <div className='article'>
      <div className='title'>{title}</div>
      <div className='img'>
        <a href={`${API_UPLOADS_URL}/articles/${bigImgUrl}`} target={'_blank'}>
          LINK
        </a>
      </div>
      <div className='date'>{createdAt.slice(0, 10)}</div>
      <div className='tags'>
        {tags.map((el, index) => (
          <p key={`p-${id}-${index}`}>{el}</p>
        ))}
      </div>
      <div className='edit-or-remove'>
        <Link to={`/admin/aktualnosci/nowy/${id}`}>
          <div>
            <p>edytuj</p>
            <BiEdit />
          </div>
        </Link>
        <ModalPopup
          trigger={
            <div className='remove-btn'>
              <p>usuń</p>
              <CgFileRemove />
            </div>
          }
          text='Czy na pewno chcesz usunąć ten artykuł?'
          onYesClick={handleRemoveClick}
        />
      </div>
    </div>
  );
};

export default ArticleRow;
