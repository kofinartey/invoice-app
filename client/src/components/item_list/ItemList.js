import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../redux/items/itemActions";
import Item from "./Item";
import { StyledInput, StyledLabel } from "../shared_components/FormElements";
import useInputState from "../../hooks/useInputState";
import ItemListStyles from "./ItemListStyles";

//Remember that this componet only receives props from edit form no new forms
function ItemList(props) {
  const classes = ItemListStyles();
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.theme);
  const itemList = useSelector((state) => state.items);
  const [itemError, setItemError] = useState(false);
  const [name, updateName, resetName] = useInputState("");
  const [qty, updateQty, resetQty] = useInputState("");
  const [price, updatePrice, resetPrice] = useInputState("");
  const [total, updateTotal] = useState("");

  //for edit forms push the editted invoice's items into the item state
  useEffect(() => {
    if (props.items) {
      props.items.map((item) => {
        dispatch(addItem(item));
        return item;
      });
    }
  }, [dispatch, props.items]);

  //update total on price or qty change
  useEffect(() => {
    if (qty === "" || price === "") {
      updateTotal("0");
    } else {
      let calculated = parseFloat(qty) * parseFloat(price);
      updateTotal(calculated.toFixed(2));
    }
  }, [qty, price]);

  const dataToAdd = {
    name: name,
    quantity: parseInt(qty),
    price: parseInt(price),
    total: parseInt(total),
  };

  const validateInputs = () => {
    if (
      name.trim().length > 0 &&
      isNaN(parseInt(name)) &&
      qty.trim().length > 0 &&
      price.trim().length > 0 &&
      !isNaN(parseInt(qty)) &&
      !isNaN(parseInt(price))
    ) {
      return true;
    } else {
      return false;
    }
  };
  validateInputs();

  const handleAdd = (e) => {
    e.preventDefault();
    const isValid = validateInputs();
    if (isValid) {
      dispatch(addItem(dataToAdd));
      resetName();
      resetQty();
      resetPrice();
    } else {
      setItemError(true);
      setTimeout(() => {
        setItemError(false);
      }, 3000);
    }
  };

  return (
    <div className={classes.ItemList}>
      <h2>Item List</h2>
      <div>
        {itemList.map((item) => (
          <Item
            item={item}
            key={item.name}
            // handleChange={handleChange(item.id)}
          />
        ))}
      </div>
      <div className={classes.form}>
        {/* Had to use a differnt form of input other than the custom built <Input/> 
        component because it was causing a few issues */}
        <div>
          <StyledLabel htmlFor="name">Item Name</StyledLabel>
          <StyledInput id="name" value={name} onChange={updateName} />
        </div>
        <div>
          <StyledLabel htmlFor="qty">Qty</StyledLabel>
          <StyledInput id="qty" value={qty} onChange={updateQty} />
        </div>
        <div>
          <StyledLabel htmlFor="price">Price</StyledLabel>
          <StyledInput id="price" value={price} onChange={updatePrice} />
        </div>

        <div className={classes.total} style={{ color: darkTheme && "white" }}>
          <StyledLabel>Total</StyledLabel>
          <h4>{total}</h4>
        </div>
        {itemError && (
          <p className={classes.itemError}>*** Invalid Item Entries </p>
        )}
      </div>

      <button
        className={classes.button}
        style={{ backgroundColor: darkTheme && "#252945" }}
        onClick={handleAdd}
      >
        + Add New Item
      </button>
    </div>
  );
}

export default ItemList;
