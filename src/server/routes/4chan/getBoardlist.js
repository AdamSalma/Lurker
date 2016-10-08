import Axios from 'axios';
import {extractBoardList} from '../../helpers/morph-4chan';
import {chan as options} from '../../helpers/request-config.js';

export default function (req, res, next) {
	console.log("Getting boardlist")
    const url = `http://a.4cdn.org/boards.json`;
    Axios(url, options)
        .then( boardlist => res.send(extractBoardList(boardlist.data.boards)) )
        .catch( err => console.log(`ERROR - Boardlist fetch ${err}`));
};