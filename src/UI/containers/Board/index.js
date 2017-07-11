import Board from './Board';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    fetchBoard,
    loadMorePosts,
    scrollHeader,
    fetchThread,
    searchBoard
} from '~/redux/actions';

import {
    getBoardID,
    getBoardPosts,
    getBoardPostsBySearch,
    getBoardPostsByFilter,
    getBoardStatistics,
    isBoardBeingSearched,
    isBoardFetching,
    isBoardFiltered,
} from '~/redux/selectors'

function mapStateToProps(state) {
    return {
        boardID: getBoardID(state),
        posts: getBoardPosts(state),
        postsBySearchTerm: getBoardPostsBySearch(state),
        postsByFilterTerm: getBoardPostsByFilter(state),
        isBeingSearched: isBoardBeingSearched(state),
        isFiltered: isBoardFiltered(state),
        isFetching: isBoardFetching(state),
        statistics: getBoardStatistics(state)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchBoard,
        fetchThread,
        loadMorePosts,
        scrollHeader,
        searchBoard
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
