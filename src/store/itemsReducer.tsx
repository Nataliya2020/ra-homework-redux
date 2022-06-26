type IinitialState = {
  item:
    {
      id: number | null,
      name: string | null,
      price: string | null
    }[] | null,
  edit: boolean | null,
  editId: number,
  nameValue: string,
  priceValue: string,
  filterValue: string
}

const initialState: IinitialState = {
  item: [
    {
      id: null,
      name: null,
      price: null
    }
  ],
  edit: false,
  editId: 0,
  nameValue: '',
  priceValue: '',
  filterValue: ''
}

export default function itemsReducer(state = initialState, action: {
  type: string;
  payload: any;
}) {
  if (state.item === null || state.item.length === 0) {
    return;
  }

  switch (action.type) {
    case 'DELETE_ITEM':
      const id = action.payload;
      if (state.item.length === 1) {
        return null;
      } else {
        if (id === state.editId) {
          return {
            ...state, nameValue: '',
            priceValue: '',
            edit: false,
            item: [...state.item.filter
            (item => item.id !== id)],
            editId: 0
          }
        }
        return {
          ...state, item: [...state.item.filter
          (item => item.id !== id)]
        };
      }

    case 'EDIT_ITEM':
      const newEdit = action.payload;
      return {
        ...state, edit: newEdit
      };

    case 'ADD_ITEM':
      const newData = action.payload;
      let elems = [...state.item];
      let count = 0;

      let result = elems.map(function (item) {
        if (newData.id === item.id) {
          item.name = newData.name;
          item.price = newData.price;
          count = 1;
        }
        return item;
      });

      if (count !== 0) {
        return {...state, item: result};
      } else {
        return {...state, item: [...state.item, newData]};
      }

    case 'CHANGE_NAME':
      const newName = action.payload;
      return {
        ...state, nameValue: newName
      };

    case 'CHANGE_PRICE':
      const newPrice = action.payload;
      return {
        ...state, priceValue: newPrice
      };

    case 'EDIT_ID':
      const idEdit = action.payload;
      return {
        ...state, editId: idEdit
      };

     case 'DELETE_MISMATCHED_VALUES':
       const valueFilter = action.payload.userValue;
return {
  ...state, filterValue: valueFilter
}
    default:
      return state
  }
}
