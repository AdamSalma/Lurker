import Axios from 'axios';
import express from 'express';
import {chan as morphBoard} from '../helpers/morph-board';
import {chan as morphThread} from '../helpers/morph-thread';
import defaultRequest from '../helpers/request-config-4chan.js';

console.log("Default request is", defaultRequest);
const router = express.Router();

router.get('/:boardID', function(req, res){
    const boardID = req.params.boardID;
    const url = 'https://a.4cdn.org/' +boardID+ '/catalog.json';
    console.log("Board::", url, defaultRequest)
	Axios(url, defaultRequest)
        .then(function(board) {
            res.send(morphBoard(board.data, boardID))
        }).catch(err => errorHandler(err))
});

router.get('/:boardID/:threadID', function(req, res, next){
    const boardID = req.params.boardID;
    const threadID = req.params.threadID;
    const url = 'http://a.4cdn.org/'+boardID+'/thread/'+threadID+'.json';

    if (isNaN(threadID)) next();

    defaultRequest.headers['Origin'] = 'http://boards.4chan.org/' +boardID;
    Axios(url, defaultRequest)
        .then(function(threads) {
            res.send(morphThread(threads.data.posts, boardID));
        }).catch( err => errorHandler(err));
});

function errorHandler(err){
    console.error(err.message, err);
    throw new Error(err)
}

module.exports = router;
