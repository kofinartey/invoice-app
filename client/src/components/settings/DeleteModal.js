import React from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
//my imports
import { deleteAllInvoices } from "../../redux/invoice/invoiceActions";
import { deleteUser } from "../../redux/auth/authActions";
import {
  deletedNotification,
  hideNotification,
} from "../../redux/invoice/invoiceActions";
import Card from "../shared_components/Card";
import Button from "../shared_components/Button";
import DeleteModalStyles from "./DeleteModalStyles";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

function DeleteModal(props) {
  const classes = DeleteModalStyles();
  const history = useHistory();
  const { modal, cancelModal, id } = props;
  const dispatch = useDispatch();
  const handleCancel = () => {
    cancelModal();
  };
  const handleDelete = () => {
    if (modal.type === "deleteInvoices") {
      dispatch(deleteAllInvoices(id));
      cancelModal();
      dispatch(deletedNotification());
      setTimeout(() => {
        dispatch(hideNotification());
      }, 1000);
    } else {
      dispatch(deleteUser(history));
    }
  };
  return (
    <div className={classes.DeleteModal}>
      <motion.div
        className={classes.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className={classes.modal}>
          <Card>
            <div className={classes.modal__wrapper}>
              <div>
                <WarningRoundedIcon style={{ color: "#EC5757" }} />
              </div>

              {/* conditionally display modal message */}
              {modal.type === "deleteInvoices" ? (
                <div>
                  <p>All invoices will be permanently deleted.</p>
                  <p>Do you wish to continue?</p>
                </div>
              ) : (
                <div>
                  <p>User account will be permanently deleted.</p>
                  <p>All invoices will be deleted.</p>
                  <p>Do you wish to continue?</p>
                </div>
              )}

              <div className={classes.button__section}>
                <Button onClick={handleCancel}> CANCEL</Button>
                <Button
                  color="white"
                  background="#EC5757"
                  onClick={handleDelete}
                >
                  {modal.type === "deleteInvoices"
                    ? " DELETE INVOICES"
                    : "DELETE ACCOUNT"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}

export default DeleteModal;
