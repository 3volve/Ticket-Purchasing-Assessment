import * as React from 'react';
import ShowComponent from 'support-components/ShowComponent.js'

class ShowService extends React.Component {
    fetchShowData = (focusedId) => {
        /**
         * This is a location where I would put in async data retrieval.
         * This would contact the server api to retrieve information of what current shows are available.
         * In the meantime instead of doing a bunch of async handling with observers or whatever stuff, I'll just have this send in hardcoded list.
         * 
         * I would attempt to use something like...
         * return fetch("https://somebackenddatabase.random/api/currentShows?locations='whatever_is_relevant_info'")
         *       .then((response) => response.json())
         *       .then((data) => do something with the data that would format it and turn it into these show component jsx elements);
         * */
        
        return new Map([
            ["1001101", <ShowComponent id="1001101" name="Internet Piracy The Musical" description=
                "This is a lovely traditional musical, set in the idyllic countryside of upeastern manhattan. It regales us with the true story of the first internet piracy in a true modern fashion: song and dance! This musical will keep you on the edge of your seat the entire night, with the drama and tension that precursed millions of other people also sitting on their butts, but for free!"
                price="100.51" focusedId={ focusedId } />],
            ["1010010", <ShowComponent id="1010010" name="A Dream of Capes and Crepes" description="Didn't want to write a description like that for all of them, so I'm just going to copy and paste this for the rest." price="51.24" focusedId={ focusedId } />],
            ["1011001", <ShowComponent id="1011001" name="Hello Poly: Docu on Poly Marriages with Parrots" description="Didn't want to write a description like that for all of them, so I'm just going to copy and paste this for the rest." price="75.10" focusedId={ focusedId } />],
            ["1111111", <ShowComponent id="1111111" name="I Am Putting Too Much Effort Into These Names" description="Didn't want to write a description like that for all of them, so I'm just going to copy and paste this for the rest." price="1023.99" focusedId={ focusedId } />]
        ]);
    }
}

export default new ShowService();