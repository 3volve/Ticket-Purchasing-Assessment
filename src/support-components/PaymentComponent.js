import * as React from 'react';
import { FormControlLabel, FormControl, RadioGroup, FormGroup, TextField, Collapse, Paper, Radio, Button, Grid, Autocomplete } from '@mui/material';

import CardService from 'service-components/CardService'
import CardComponent from 'support-components/CardComponent'
import ticketlogo from 'assets/TicketMasterLogo.png';
import addcard from 'assets/Add-New-Card-Button.png';
import takenCards from 'assets/Taken-Credits.png';
import checkmark from 'assets/CheckMark.png';


function PaymentComponent(props) {
  const [focused, setFocused] = React.useState("");
  const [name, setName] = React.useState("");
  const [owner, setOwner] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [expireMonth, setExpireMonth] = React.useState(null);
  const [expireYear, setExpireYear] = React.useState(null);
  const [inputMonth, setInputMonth] = React.useState('');
  const [inputYear, setInputYear] = React.useState('');
  const [selectedCardHasValidCvv, setIfValidCvv] = React.useState(false);
  
  const editCardHandler = (targetNum) => {
    let targetCard = cards.get(targetNum);

    setName(targetCard.props.savedName);
    setOwner(targetCard.props.owner);
    setCvv("");

    //This wouldn't actually be putting the real number there, but rather representing that it has it stored in hash in the database,
    // and would update it with a new one if replaced, but otherwise won't touch.
    setNumber("xxxxxxxxxxxx" + targetCard.props.num);
    setExpireMonth(months[targetCard.props.expireDate.getMonth()]);
    setInputMonth(months[targetCard.props.expireDate.getMonth()]);
    setExpireYear("" + targetCard.props.expireDate.getFullYear());
    setInputYear("" + targetCard.props.expireDate.getFullYear());

    setFocused("-1");
    props.setSelectedCard(undefined);

    let tempMap = cards;
    setCards(tempMap);
  }

  // This function operates a little slowly and hangs oddly for some reason, but I'm out of time to figure it out.
  const deleteCardHandler = (targetNum) => {
    props.setSelectedCard(undefined);
    setFocused("0");

    let tempMap = cards;
    tempMap.delete(targetNum);
    setCards(tempMap);

    console.log("and send deleted card details back to server to delete it in the database as well in a method in the CardService class.");
    //I would probably just have it retrieve the new information from the server rather than manually remove the element from the map.
  }


  // I put this function in last minute, because I realized I needed to have something that implied checking if the CVV on a saved card matched up,
  // but I ran out of time and it doesn't seem to work unfortunately.
  const confirmCvv = (event) => {
    let dummyCheckingFunction = (value, targetCard) => value != "";

    setIfValidCvv(dummyCheckingFunction(event.target.value, cards.get(event.target.id)));
  }

  // I would probably add a loading symbol and only load in the entries maybe with some animations once it retrieved the data.
  const [cards, setCards] = React.useState(CardService.fetchCardData(confirmCvv, editCardHandler, deleteCardHandler));
  
  /* But for now, this is what I would have done if I were actually using promises.
  const cards = [];
  React.useEffect(() => {
    cards = CardService.fetchCardData(focused, editCardHandler, deleteCardHandler);
  }, []); */

  const handleRadioChange = (event) => {
    var selected = cards.get(event.target.value);

    setFocused(selected.props.num);
    props.setSelectedCard(selected);
    props.setIfValidCvv(false);
  };

  const handleAddCardExpand = () => {
    setFocused("-1");
    props.setSelectedCard();
    props.setIfValidCvv(false);
  }

  const handleSubmit = (event) => {
    let formattedMonth = months.indexOf(expireMonth) + 1;

    if (formattedMonth < 10) formattedMonth = "0" + formattedMonth;

    let newCard = 
    <CardComponent
      savedName={ name }
      owner={ owner }
      num={ number.substring(12) }
      expireDate={ new Date(expireYear + "-01-" + formattedMonth) }
      confirmCvv={ confirmCvv }
      editHandler={ editCardHandler }
      deleteHandler={ deleteCardHandler }
    />
    
    let tempMap = cards;
    tempMap.set(newCard.props.num, newCard);
    setCards(tempMap);

    setName("");
    setOwner("");
    setCvv("");

    //This wouldn't actually be putting the real number there, but rather representing that it has it stored in hash in the database,
    // and would update it with a new one if replaced, but otherwise won't touch.
    setNumber("");
    setExpireMonth(null);
    setInputMonth("");
    setExpireYear(null);
    setInputYear("");

    setFocused("0");

    props.setSelectedCard(undefined);
    // Here is where I would put the code to check if card functions or not, and then submit the card to be stored in backend.
  }

  return (
    <Paper 
      className="Content-Box"
      elevation={5}
      hidden={ props.selectedShow == undefined }
    >
      <Collapse
        in={ props.selectedShow != undefined }
        timeout="auto"
      >
        <h1>
          Payment
          <img className="CheckMark" src={checkmark} alt=""></img>
          <img className="TicketMasterLogo" src={ticketlogo} alt=""></img>
        </h1>
        <div>
          <h2>
            Use Credit / Debit Card
          </h2>
          <FormControl>
            <RadioGroup
              aria-labelledby="Card-Radio-Form-Label"
              name="card-radio-buttons-group"
              onChange={ handleRadioChange }
            >
              {
                cards.size > 0 && (Array.from(cards.values())).map((item) =>
                <FormControlLabel
                  id={ item.props.num + "-radio" }
                  style={{ alignItems: 'flex-start' }}
                  value={ item.props.num }
                  control={ <Radio checked={ focused == item.props.num }/> }
                  label={ item }
                  key={ item.props.num }
                />)
              }
            </RadioGroup>
          </FormControl>
          <FormGroup
              aria-labelledby="Add-Card-Form-Label"
              name="add-card-inputfields-group"
              onSubmit={ handleSubmit }
            >
            <Button
              fullWidth={ true }
              style={{ justifyContent: "start" }}
              onClick={ handleAddCardExpand }
            >
              <img src={ addcard } />
            </Button>
            <Collapse
              in={ focused == "-1" }
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="card-name"
                    size="small"
                    label="Custom Card Name (Optional)"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    sx={{
                      width: "100%"
                    }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="card-owner"
                    size="small"
                    label="Card Owner"
                    value={owner}
                    onChange={(event) => setOwner(event.target.value)}
                    sx={{
                      width: "100%"
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="card-cvv"
                    size="small"
                    type='password'
                    label="CVV"
                    value={cvv}
                    onChange={(event) => setCvv(event.target.value)}
                    sx={{
                      width: "100%"
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="card-number"
                    size="small"
                    type='password'
                    label="Card Number"
                    value={number}
                    onChange={(event) => setNumber(event.target.value)}
                    sx={{
                      width: "100%"
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    id="card-month"
                    options={ months }
                    size="small"
                    autoComplete
                    autoHighlight
                    value={expireMonth}
                    onChange={(event, newValue) => {console.log("setExpireMonth" + newValue);setExpireMonth(newValue)}}
                    inputValue={inputMonth}
                    onInputChange={(event, newValue) => {console.log("setInputMonth" + newValue);setInputMonth(newValue)}}
                    renderInput={(params) => (
                      <TextField {...params} label="Month" variant="outlined" />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    id="card-year"
                    options={ Array.from(new Array(15), (x, i) => "" + (i + 2017)) }
                    size="small"
                    autoComplete
                    autoHighlight
                    autoSelect
                    value={expireYear}
                    onChange={(event, newValue) => {console.log("setExpireYear" + newValue);setExpireYear(newValue)}}
                    inputValue={inputYear}
                    onInputChange={(event, newValue) => {console.log("setInputYear" + newValue);setInputYear(newValue)}}
                    renderInput={(params) => (
                      <TextField {...params} label="Year" variant="outlined" />
                    )}
                  />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={4}>
                  <img src={ takenCards } style={{ width: "100%" }} />
                </Grid>
              </Grid>
              <Button
                fullWidth={ true }
                variant="contained"
                color="success"
                disabled={ false }
                onClick={ handleSubmit }
                style={{marginTop: "16px"}}
              >
                Add or Modify Card
              </Button>
            </Collapse>
          </FormGroup>
        </div>
      </Collapse>
    </Paper>
  );
}

const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

export default PaymentComponent;