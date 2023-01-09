import * as React from 'react';
import { FormControlLabel, Collapse, Checkbox, Button, Paper } from '@mui/material';

// In a real application I would probably utilize info on the credit card or given by the user to determine a sales tax here if that is applicable.
const taxOrServiceRate = 0.08;
const orderProcessingFee = 2.95;

function SummaryComponent(props) {
  const [termsAccepted, setTermsAcceptance] = React.useState(false);
  
  const ticketTotal = formatPrice(props.selectedShow?.props.price * props.numTickets);
  const serviceFeeTotal = formatPrice(props.selectedShow?.props.price * props.numTickets * taxOrServiceRate);
  const total = formatPrice(ticketTotal + serviceFeeTotal + orderProcessingFee);

  function placeOrder(show, payment) {
    // I would then use these two properties to send off the order:
    // props.selectedShow, props.selectedCard

    // This is where I would put the code that sends out the order to the backend server database.
    // I would probably also perform some sort of handshake error-checking steps here to ensure safe carrying of customer data
    // and other such vital financial steps.

    console.log("Ticket Purchased");
  }

  const handleTermsChange = (event) => {
    let checkState = event.target.checked;
    setTermsAcceptance(checkState);
  }

  function formatPrice(price) {
    return (Math.round(price * 100) / 100);
  }

  return (
    <Paper 
      className="Content-Box"
      elevation={5}
      hidden={ props.selectedShow == undefined || props.selectedCard == undefined }
    >
      <Collapse
        in={ props.selectedShow != undefined && props.selectedCard != undefined }
        timeout="auto"
        // orientation="horizontal" didn't work how I wanted it to, but I don't want to fully give up on it just yet.
        unmountOnExit
      >
          <h1>
            Total
            <p className="Price">${ total.toFixed(2) }</p>
          </h1>

          <h3>Tickets</h3>
          <p>
            Resale Tickets: { props.selectedShow?.props.price } x { props.numTickets }
            <span className="Price">${ ticketTotal.toFixed(2) }</span>
          </p>

          <h3>Fees</h3>
          <p style={{ marginBottom: "0px" }}>
            Service Fee: { formatPrice(props.selectedShow?.props.price * taxOrServiceRate).toFixed(2) } x { props.numTickets }
            <span className="Price">${ serviceFeeTotal.toFixed(2) }</span>
          </p>
          <p style={{ marginTop: "0px" }}>
            Order Processing Fee
            <span className="Price">${ orderProcessingFee.toFixed(2) }</span>
          </p>

          <h3>Delivery</h3>
          <p>
            There are obviously no delivery fees, unless you want a piece of paper shipped to you?
          </p>
          <br/><br/>

            <FormControlLabel
              control={<Checkbox />}
              label={
                <span style={{
                  color: "dimgrey",
                  fontSize: "calc(8px + 1vmin)"
                }}>
                  I have read and agree to the current&nbsp;
                  <a
                    className="Clickable-Text"
                    onClick={(e) => { console.log("Navigate away!"); e.preventDefault() }}>
                    Terms of Use
                  </a>
                </span> }
              onChange={ handleTermsChange }
            />
          <Button
            fullWidth={ true }
            variant="contained"
            color="success"
            disabled={ props.selectedCard == undefined || /* Didn't work: !props.selectedCardHasValidCvv || */ props.selectedShow == undefined || !termsAccepted }
            onClick={() => placeOrder()}
          >
            <b>Place Order</b>
          </Button>
      </Collapse>
    </Paper>
  );
}

export default SummaryComponent;