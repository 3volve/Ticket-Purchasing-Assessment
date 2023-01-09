import * as React from 'react';
import { InputAdornment, CardContent, TextField, Collapse } from '@mui/material';

import 'Main.css';
import Utils from 'support-components/Utils.js'
import checkmark from 'assets/CheckMark.png';
import cvvexample from 'assets/CVV-Example-Alt.png';

function CardComponent(props) {

  return (
    <div className="Card-Component">
      <span>
        <h3 style={{textSize: ""}}>{ props.savedName != "" ? props.savedName : props.type + " - " + props.num }</h3>
      </span>
      <CardContent
        className="Flex-Column"
        sx={{
          paddingTop: "0px"
        }}
      >
        <p style={{margin: "16px 0px 4px 16px"}}>{ props.owner } | Expires&nbsp;<b>{ Utils.formatDate(props.expireDate) }</b></p>
        <p style={{margin: "0px 0px 16px 16px"}}>
          <a className="Clickable-Text" onClick={(e) => { props.editHandler(props.num); e.preventDefault() }}>Edit</a>
          &nbsp;|&nbsp;
          <a className="Clickable-Text" onClick={(e) => { props.deleteHandler(props.num); e.preventDefault() }}>Delete</a>
        </p>
        <span className="Flex-Row">
          <TextField
            id={ props.num }
            type='password'
            label="CVV"
            InputProps={{
              endAdornment: <InputAdornment position="end"><img className="Small-CheckMark" src={checkmark} alt="" /></InputAdornment>,
            }}
            size="small"
            onChange={ props.confirmCvv }
            sx={{
              width: "150px",
            }}
          />
          <img src={ cvvexample } style={{marginLeft: "8px"}} />
        </span>
      </CardContent>
    </div>
  );
}

export default CardComponent;