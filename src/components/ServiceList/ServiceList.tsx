import edit from './edit.png';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actionTypes as at} from '../actions';

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

function ServiceList() {
  const dispatch = useDispatch();
  const items = useSelector((store: IProps) => store.items.item);
  const filterValue = useSelector((store: IProps) => store.items.filterValue);

  const handleRemove = (id: number) => {
    dispatch({type: at.DELETE_ITEM, payload: id});
  }

  const handleEdit = (id: number) => {
    dispatch({type: at.EDIT_ITEM, payload: true});
    dispatch({type: at.EDIT_ID, payload: id});
  }

  return (
    <>
      <ul className={"list list-items"}>
        {items.map(item => {
          return (item.id !== null && (!filterValue || item.name.toLowerCase().includes(filterValue.toLowerCase()))) ?
            <li className={"list-item"} key={item.id}>
              <div className={"service-name"}>{item.name}</div>
              <div className={"service-price"}>{item.price}</div>
              <div className={"service-btn"}>
                <button className={"btn btn-edit"} onClick={(e) => handleEdit(item.id)}><img className={"img-edit"}
                                                                                                src={edit}
                                                                                                alt={"иконка редактирования услуги"}/>
                </button>
                <button className={"btn"} onClick={(e) => handleRemove(item.id)}>X</button>
              </div>
            </li>
            : null;

        })}
      </ul>
    </>
  )
}

export default ServiceList;
