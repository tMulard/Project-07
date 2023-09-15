import { displayCardsOnPage, displayStats} from '../factories/card.js';
import {getData} from '../utils/data.js'
import { fillLists } from '../factories/list.js';
const init = async () => {
    const data = await getData()
    displayCardsOnPage(data);
    displayStats(data);
    fillLists(data)
};       

init();