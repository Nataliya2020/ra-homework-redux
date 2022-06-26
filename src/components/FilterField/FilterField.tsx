import {useSelector, useDispatch} from 'react-redux';
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

function FilterField() {
  const dispatch = useDispatch();
  const userValue = useSelector((store: IProps) => store.items.filterValue);

  const searchValue = (e: { target: { name: string; value: string; }; }) => {
    dispatch({
      type: at.DELETE_MISMATCHED_VALUES, payload: {
        userValue: e.target.value
      }
    });
  }

  const submitFilter = (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();
  }

  return (
    <>
      <form className={"form"} onSubmit={submitFilter}>
        <label>
          <input className={"field filter-field"} name={"name"} value={userValue} onChange={searchValue}
                 placeholder={"Введите начало фразы..."}/>
          <span> Фильтрация списка
        </span>
        </label>
      </form>
    </>
  );
}

export default FilterField;
