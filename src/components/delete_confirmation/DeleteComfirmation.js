import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteInvoice } from "../../redux/invoice/invoiceActions";
import { toggleConfirmation } from "../../redux/delete_confirmation/deleteConfirmationActions";
import Card from "../shared_components/Card";
import Button from "../shared_components/Button";
import DeleteComfirmationStyles from "./DeleteConfirmaionStyles";

function DeleteComfirmation(props) {
  const darkTheme = useSelector((state) => state.theme);
  const confirmation = useSelector((state) => state.deleteConfirmation);
  const dispatch = useDispatch();
  const classes = DeleteComfirmationStyles();

  useEffect(() => {
    if (confirmation) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  });

  const handleDelete = () => {
    dispatch(deleteInvoice(props.id));

    setTimeout(() => {
      props.history.push("/");
      dispatch(toggleConfirmation());
    }, 300);
  };
  return (
    <div>
      <div
        className={classes.overlay}
        onClick={() => {}}
        style={{
          left: confirmation && "0",
          opacity: confirmation && "1",
          pointerEvents: confirmation && "all",
        }}
      >
        <div className={classes.deleteCard}>
          <Card>
            <h2 style={{ color: darkTheme && "white" }}>Comfirm Deletion</h2>
            <p>
              Are you sure you want to delete invoice #{props.id}? This action
              cannot be undone.
            </p>

            <div className={classes.btn_container}>
              <Button
                color="#7E88C3"
                background={darkTheme ? "#252945" : "#F9FAFE"}
                onClick={() => {
                  dispatch(toggleConfirmation());
                }}
              >
                Cancel
              </Button>
              <Button color="white" background="#EC5757" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DeleteComfirmation;
