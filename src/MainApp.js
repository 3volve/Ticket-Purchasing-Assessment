import * as React from 'react';
import 'Main.css';
import ShowSelectionComponent from "support-components/ShowSelectionComponent.js"
import PaymentComponent from 'support-components/PaymentComponent.js'
import SummaryComponent from 'support-components/SummaryComponent.js'
import ShowComponent from 'support-components/ShowComponent.js'
import CardComponent from 'support-components/CardComponent.js'

function MainApp(props) {
  const [selectedShow, setSelectedShow] = React.useState(undefined);
  const [selectedCard, setSelectedCard] = React.useState(undefined);
  const [selectedCardHasValidCvv, setIfValidCvv] = React.useState(false);
  const [numTickets, setNumTickets] = React.useState(0);

  return (
    <div className="Body">
      <div className="Main-App">
        <div className="Left-Column">
          <ShowSelectionComponent setSelectedShow={ setSelectedShow } setNumTickets={ setNumTickets }/>
          <PaymentComponent setSelectedCard={ setSelectedCard } selectedCard={ selectedCard } selectedShow={ selectedShow } setIfValidCvv={ setIfValidCvv } />
        </div>
        <div className="Right-Column">
          <SummaryComponent selectedShow={ selectedShow } numTickets={ numTickets } selectedCard={ selectedCard } selectedCardHasValidCvv={ selectedCardHasValidCvv } />
        </div>
      </div>
    </div>
  );
}

export default MainApp;
