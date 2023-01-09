import * as React from 'react';
import { FormControlLabel, FormControl, FormLabel, RadioGroup, TextField, Radio, Paper } from '@mui/material';

import checkmark from 'assets/CheckMark.png';
import ShowService from 'service-components/ShowService.js'

function ShowSelectionComponent(props) {
  const [focused, setFocused] = React.useState("");

  // I would probably add a loading symbol and only load in the entries maybe with some animations once it retrieved the data.
  const shows = ShowService.fetchShowData(focused);
  /* But for now, this is what I would have done if I were actually using promises.
  const shows = [];
  React.useEffect(() => {
    shows = ShowService.fetchShowData();
  }, []); */

  const handleTicketChange = (event) => {
    // I could also add handling for a max number of tickets here
    // that could be dynamically set to whatever the number of remaining tickets are left
    // I would have to watch out for changes of the show that adjust the total, which most likely wouldn't trigger this change handler.
    if (event.target.value < 0) {
      event.target.value = 0;
    }
    props.setNumTickets(event.target.value);
  };

  const handleRadioChange = (event) => {
    var selected = shows.get(event.target.value);
    setFocused(selected.props.id);

    props.setSelectedShow(selected);
  };

  return (
    <Paper
      className="Content-Box"
      elevation={5}
    >
      <h2>
        Shows Selection
        <img className="CheckMark" src={checkmark} alt=""></img>
        <form
          className='Ticket-Number'
          onChange={ handleTicketChange }
        >
          <TextField
            id="ticket-num"
            label="Number of Tickets"
            type="number"
            size="small"
            variant="filled"
          />
        </form>
      </h2>

      <FormControl>
        <FormLabel className="Show-Radio-Form"><h3 style={{color: "black"}}>Available Shows:</h3></FormLabel>
        <RadioGroup
          aria-labelledby="Show-Radio-Form-Label"
          name="show-radio-buttons-group"
          onChange={ handleRadioChange }
        >
          {
            shows.size > 0 && (Array.from(shows.values())).map((item) =>
            <FormControlLabel
              className="Radio-Show-Entries"
              style={{ alignItems: 'flex-start' }}
              value={ item.props.id }
              control={ <Radio /> }
              label={ item }
              key={ item.props.id }
            />)
          }
        </RadioGroup>
      </FormControl>

    </Paper>
  );
}

export default ShowSelectionComponent;