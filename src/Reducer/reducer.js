export default function reducer(state = { items: undefined }, action) {
  switch (action.type) {
    case "get/all":
      return {
        ...state,
        items: action.items,
      };
    case "save/item":
      let items = [...state.items];
      items.push(action.item);
      return {
        ...state,
        items: items,
      };
    case "delete/item":
      let novosItems = [];
      let velhosItems = [...state.items];
      velhosItems.forEach((item) => {
        if (item.id !== parseInt(action.id)) {
          novosItems.push(item);
        }
      });
      return {
        ...state,
        items: novosItems,
      };
    case "update/item":
      let itemsAtualizados = [];
      let itemsParaAtualizar = [...state.items];
      itemsParaAtualizar.forEach((item) => {
        if (item.id === action.item.id) {
          itemsAtualizados.push(action.item);
        } else {
          itemsAtualizados.push(item);
        }
      });
      return {
        ...state,
        items: itemsAtualizados,
      };
    default:
      return state;
  }
}
