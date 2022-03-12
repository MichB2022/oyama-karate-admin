import Popup from 'reactjs-popup';
import Button from '../Button/Button';
import './InfoModalPopup.scss';

const InfoModalPopup = ({ trigger, text, action = () => null }) => {
  return (
    <Popup trigger={trigger} modal nested>
      {(close) => (
        <div className='modal'>
          <button className='close' onClick={() => close()}>
            &times;
          </button>
          <div className='content'>{text}</div>
          <div className='actions'>
            <Button
              text={'Ok'}
              className='button'
              onclick={() => {
                action();
                close();
              }}
            />
          </div>
        </div>
      )}
    </Popup>
  );
};

export default InfoModalPopup;
