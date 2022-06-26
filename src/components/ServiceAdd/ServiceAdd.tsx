import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {actionTypes as at} from '../actions';

let countId = 1;

type IProps = {
  items: {
    item:
      {
        id: number,
        name: string,
        price: string
      }[],
    edit: boolean,
    editId: number,
    nameValue: string,
    priceValue: string,
    filterValue: string
  }
}

function ServiceAdd() {
  const dispatch = useDispatch();
  const name = useSelector((store: IProps) => store.items.nameValue);
  const price = useSelector((store: IProps) => store.items.priceValue);
  const items = useSelector((store: IProps) => store.items);
  const storeEditID = useSelector((store: IProps) => store.items.editId);
  const storeEdit = useSelector((store: IProps) => store.items.edit);
  const storeLength = useSelector((store: IProps) => store.items.item.length);

  useEffect(() => {
    if (storeEdit) {
      const itemService = {
        ...items,
        item: [items.item.filter((item: { id: number; }) => item.id === storeEditID)]
      };
      dispatch({type: at.CHANGE_NAME, payload: itemService.item[0][0].name});
      dispatch({type: at.CHANGE_PRICE, payload: itemService.item[0][0].price});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, storeEdit, storeEditID]);

  if (storeLength === 1) {
    countId = 1;
  }

  const handleName = (event: { target: { name: string; value: string; }; }) => {
    dispatch({type: at.CHANGE_NAME, payload: event.target.value});
  }

  const handlePrice = (event: { target: { name: string; value: string; }; }) => {
    dispatch({type: at.CHANGE_PRICE, payload: event.target.value});
  }

  const handleCancel = () => {
    dispatch({type: at.CHANGE_NAME, payload: ''});
    dispatch({type: at.CHANGE_PRICE, payload: ''});
    dispatch({type: at.EDIT_ITEM, payload: false});
    dispatch({type: at.EDIT_ID, payload: 0});
  }

  const handleSubmit = (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();

    if (storeEditID !== 0) {
      dispatch({type: at.ADD_ITEM, payload: {name, price, id: storeEditID}});
      dispatch({type: at.CHANGE_NAME, payload: ''});
      dispatch({type: at.CHANGE_PRICE, payload: ''});
      dispatch({type: at.EDIT_ITEM, payload: false});
      dispatch({type: at.EDIT_ID, payload: 0});
    } else {
      dispatch({type: at.ADD_ITEM, payload: {name, price, id: countId}});
      countId = countId + 1;
      dispatch({type: at.CHANGE_NAME, payload: ''});
      dispatch({type: at.CHANGE_PRICE, payload: ''});
    }
  }

  return (
    <div className={"content-container"}>
      <form className={"form"} onSubmit={handleSubmit}>
        <div>
          <label className={"form-row"}>
            <span className={"name-field"}>Наименование услуги</span>
            <input className={"field"} name="name" onChange={handleName} value={name} required/>
          </label>
        </div>

        <div>
          <label className={"form-row"}>
            <span className={"name-field"}>Стоимость услуги</span>
            <input className={"field"} name="price" onChange={handlePrice} value={price} required/>
          </label>
        </div>

        <div className={"form-row form-row-button"}>
          <button type="submit" className={"btn-control"}>Save</button>
          {storeEdit ? <button className={"btn-control"} onClick={handleCancel}>Cancel</button> : null}
        </div>
      </form>
    </div>
  );
}

export default ServiceAdd;
