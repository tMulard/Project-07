import { displayCardsOnPage} from './factories/card.js';
import {getData} from './utils/data.js'

const init = async () => {
    const data = await getData()
    displayCardsOnPage(data);
};

init();