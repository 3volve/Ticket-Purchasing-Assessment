import * as React from 'react';
import { CardContent, Collapse } from '@mui/material';

import 'Main.css';
import placeholder from 'assets/Placeholder-Image.png';

function ShowComponent(props) {
  /**
   * Note: I could have added more details to these, such as dates of performances or stuff like that,
   *  but I figured this was enough for the purposes of the mock webpage.
   */

  return (
    <div>
      <span className="Show-Title">
        <h3>{ props.name }</h3>
        <p className="Price">Ticket Price: { props.price }</p>
      </span>
      <Collapse in={props.focusedId == props.id}>
        <CardContent className="Flex-Row">
          <img src={ placeholder } alt="Placeholder image for a real play's visual aid." className="Placeholder"></img>
          <p className="No-Margin">{ props.description }</p>
        </CardContent>
      </Collapse>
    </div>
  );
}

export default ShowComponent;