import Popup from 'reactjs-popup';
import Button from '../Button/Button';
import './ModalPopup.scss';

const ModalPopup = ({ trigger, text, onYesClick }) => {
  return (
    <Popup trigger={trigger} modal nested>
      {(close) => (
        <div className='modal'>
          <button className='close' onClick={close}>
            &times;
          </button>
          <div className='content'>{text}</div>
          <div className='actions'>
            <Button
              text={'Nie'}
              className='button'
              onclick={() => {
                close();
              }}
            />

            <Button
              text={'Tak'}
              className='green-button button'
              onclick={() => {
                onYesClick();
                close();
              }}
            />
          </div>
        </div>
      )}
    </Popup>
  );
};

export default ModalPopup;
