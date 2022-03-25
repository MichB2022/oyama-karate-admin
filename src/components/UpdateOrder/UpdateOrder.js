import { httpRequest } from '../../utils/requests';
import Button from '../Button/Button';
import InfoModalPopup from '../InfoModalPopup/InfoModalPopup';
import './UpdateOrder.scss';

function UpdateOrder({ tableName, data }) {
  const handleSaveBtn = async () => {
    const ids = [];
    for (const i in data) {
      const input = document.getElementById(`order-${i}`);
      ids.push(input.value);
    }
    const newData = { table: tableName, ids };
    await httpRequest('POST', '/homepage/updateorder', newData);
  };

  return (
    <div className='select-order'>
      <h1>Ustal Kolejność</h1>
      <div className='order'>
        {data.map((el, index) => (
          <div>
            {`${index + 1}.   `}
            <select
              key={`order-${index}`}
              id={`order-${index}`}
              className='select'
              defaultValue={el.id}
            >
              {data.map((el) => (
                <option key={`option-${index}-${el.id}`} value={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className='buttons special-btn-update'>
          {
            <InfoModalPopup
              trigger={
                <div className='green-btns'>
                  <Button text={'ZAPISZ'} onclick={() => handleSaveBtn()} />
                </div>
              }
              text='Zmiany zostały zapisane'
            />
          }
        </div>
      </div>
    </div>
  );
}

export default UpdateOrder;
