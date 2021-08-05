import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Card from "../shared_components/Card";
import StatusCard from "../shared_components/StatusCard";
import InvoiceDetailsStyles from "./InvoiceDetailsStyles";
import leftArrow from "../../assets/icon-arrow-left.svg";
import Button from "../shared_components/Button";

function InvoiceDetails(props) {
  const classes = InvoiceDetailsStyles();
  const invoiceData = useSelector((state) => state.invoice);
  const darkTheme = useSelector((state) => state.theme);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    let width = window.innerWidth;
    setWindowWidth(width);
  });
  const formatDate = (date) => {
    return dayjs(date).format("DD MMM YYYY");
  };

  return (
    <div
      className={classes.InvoiceDetails}
      style={{ backgroundColor: darkTheme && "#141625" }}
    >
      <div className={classes.wrapper}>
        <div>
          <Link to="/" className={classes.goBack}>
            <img src={leftArrow} alt="" />
            <h4 style={{ color: darkTheme && "white" }}>Go Back</h4>
          </Link>
        </div>

        {invoiceData.map((invoice) => {
          if (invoice.id === props.id) {
            return (
              <>
                <Card>
                  <div className={classes.top_card}>
                    <div className={classes.status__wrapper}>
                      <p>Status</p>
                      <StatusCard status={invoice.status}>
                        {invoice.status}
                      </StatusCard>
                    </div>

                    {/* buttons to show in status bar at larger screen widths */}
                    {windowWidth > 768 && (
                      <div>
                        <Button
                          color="#7E88C3"
                          background={darkTheme ? "#252945" : "#F9FAFE"}
                        >
                          Edit
                        </Button>
                        <Button color="white" background="#EC5757">
                          Delete
                        </Button>
                        <Button color="white" background="#7C5DFA">
                          Mark as Paid
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
                <Card>
                  <div className={classes.details_card}>
                    <div className={classes.id}>
                      <h4 style={{ color: darkTheme && "white" }}>
                        <span>#</span>
                        {invoice.id}
                      </h4>
                      <p>{invoice.description}</p>
                    </div>

                    {/* sender's details */}
                    <div className={classes.senders_details}>
                      <p>{invoice.senderAddress.street}</p>
                      <p>{invoice.senderAddress.city}</p>
                      <p>{invoice.senderAddress.postCode}</p>
                      <p>{invoice.senderAddress.country}</p>
                    </div>

                    {/* invoice date */}
                    <div className={classes.invoice_date}>
                      <p>Invoice Date</p>
                      <h4 style={{ color: darkTheme && "white" }}>
                        {formatDate(invoice.createdAt)}
                      </h4>
                    </div>

                    {/* payment date */}
                    <div className={classes.payment_date}>
                      <p>Payment Due</p>
                      <h4 style={{ color: darkTheme && "white" }}>
                        {formatDate(invoice.paymentDue)}
                      </h4>
                    </div>

                    {/* client details */}
                    <div className={classes.client_details}>
                      <p>Bill To</p>
                      <h4 style={{ color: darkTheme && "white" }}>
                        {invoice.clientName}
                      </h4>
                      <p>{invoice.clientAddress.street}</p>
                      <p>{invoice.clientAddress.city}</p>
                      <p>{invoice.clientAddress.postCode}</p>
                      <p>{invoice.clientAddress.country}</p>
                    </div>

                    {/* client email */}
                    <div className={classes.client_email}>
                      <p>Sent to</p>
                      <h4 style={{ color: darkTheme && "white" }}>
                        {invoice.clientEmail}
                      </h4>
                    </div>

                    {/* project pricing details. Render diffrent entities depending on page width*/}
                    <div
                      className={classes.pricing}
                      style={{ backgroundColor: darkTheme && "#252945" }}
                    >
                      {windowWidth < 768 ? (
                        invoice.items.map((item) => (
                          <div className={classes.item}>
                            <h5 style={{ color: darkTheme && "white" }}>
                              {item.name}
                            </h5>
                            <h5>
                              {item.quantity} x £{item.price.toFixed(2)}
                            </h5>
                            <h5 style={{ color: darkTheme && "white" }}>
                              £{item.total.toFixed(2)}
                            </h5>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className={classes.item_thead}>
                            <p>Item Name</p>
                            <p>QTY.</p>
                            <p>Price</p>
                            <p>Total</p>
                          </div>
                          {invoice.items.map((item) => {
                            return (
                              <div className={classes.item_tbody}>
                                <h5 style={{ color: darkTheme && "white" }}>
                                  {item.name}
                                </h5>
                                <h5 style={{ color: darkTheme && "white" }}>
                                  {item.quantity}
                                </h5>
                                <h5 style={{ color: darkTheme && "white" }}>
                                  £{item.price.toFixed(2)}
                                </h5>
                                <h5 style={{ color: darkTheme && "white" }}>
                                  £{item.total.toFixed(2)}
                                </h5>
                              </div>
                            );
                          })}
                        </>
                      )}

                      <div
                        className={classes.grandTotal}
                        style={{ backgroundColor: darkTheme && "#0C0E16" }}
                      >
                        <p>Amount Due</p>
                        <h3>£ {invoice.total.toFixed(2)}</h3>
                      </div>
                    </div>
                  </div>
                </Card>
              </>
            );
          } else {
            return null;
          }
        })}
      </div>
      <footer
        className={classes.footer}
        style={{ backgroundColor: darkTheme && "#1E2139" }}
      >
        <Button color="#7E88C3" background={darkTheme ? "#252945" : "#F9FAFE"}>
          Edit
        </Button>
        <Button color="white" background="#EC5757">
          Delete
        </Button>
        <Button color="white" background="#7C5DFA">
          Mark as Paid
        </Button>
      </footer>
    </div>
  );
}

export default InvoiceDetails;
