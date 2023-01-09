import * as React from 'react';
import CardComponent from 'support-components/CardComponent.js'

class CardService extends React.Component {
    fetchCardData = (confirmCvv, editCardHandler, deleteCardHandler) => {
        /**
         * This is a location where I would put in async data retrieval.
         * This would contact the server api to retrieve information of what current cards are stored by the user.
         * In the meantime instead of doing a bunch of async handling with observers or whatever stuff, I'll just have this send in hardcoded list.
         * I would probably have a user session stored in the browser's session database, and be able to retrieve and send the user information
         *  if they had an active session going.
         * 
         * Note: I wouldn't be recieving the actual full card number from the server, only the last 4 digits, so that is all I will store or diplay here.
         * Note: I will also assume that any passed in info for the cards such as dates will have already been scrubbed to ensure valid values
         * 
         * I would attempt to use something like...
         * return fetch("https://somebackenddatabase.random/api/savedCards?user=username&anyOtherInfoLikeSessionInfoOrSuch")
         *       .then((response) => response.json())
         *       .then((data) => do something with the data that would format it and turn it into these show component jsx elements);
         * */
        
        return new Map([
            ["0900", <CardComponent 
                type="Visa"
                num="0900"
                owner="Evo Sokoloff-Toney"
                savedName="BESU Joint Account"
                expireDate={ new Date("2030-01-25") }
                confirmCvv={ confirmCvv }
                editHandler={ editCardHandler }
                deleteHandler={ deleteCardHandler }
            />],
            ["6969", <CardComponent
                type="Mastercard"
                num="6969"
                owner="Noice Fostaloff"
                savedName=""
                expireDate={ new Date("2026-01-09") }
                confirmCvv={ confirmCvv }
                editHandler={ editCardHandler }
                deleteHandler={ deleteCardHandler }
            />]
        ]);
    }
}

export default new CardService();