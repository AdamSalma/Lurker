import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    Header,
    HeaderPanels,
    Navbar,
    AlertContainer,
} from "~/modules";

import { 
    closeThread,
    changeProvider,
    toggleSetting,
    fetchBoard, 
    destroyBoard, 
    searchBoard,
    scrollPage, 
    scrollHeader, 
    toggleNavbar,
    fetchBoardList, 
    searchBoardlist, 
    addToFavourites, 
    removeFromFavourites,
    fetchThread,
    toggleHeaderPanel,
    updateMonitoredThread,
    monitorThread,
    unmonitorThread
} from '~/redux/actions';

class GlobalPage extends Component {
    /*
        Container for elements that need to be at the forefront of the page
        and independant of the z-index's of other pages:
            - Header
            - Navbar
            - Alert container
     */
 

    render() {
        const {
            scrollPage, scrollHeader, fetchBoard, fetchBoardList, 
            addToFavourites, removeFromFavourites, destroyBoard,
            searchBoard, closeThread, changeProvider, toggleNavbar, 
            toggleSetting, searchBoardlist, fetchThread, toggleHeaderPanel,
            updateMonitoredThread, monitorThread, unmonitorThread,

            status, boardList, threadIsActive, settings, threadMonitor
        } = this.props;

        return (
            <div className="page page-global">
                <Header 
                    scrollPage={scrollPage} scrollHeader={scrollHeader} 
                    fetchBoardList={fetchBoardList} fetchBoard={fetchBoard} 
                    searchBoard={searchBoard} closeThread={closeThread}
                    destroyBoard={destroyBoard} toggleHeaderPanel={toggleHeaderPanel}
                    toggleNavbar={toggleNavbar}

                    {...status} activePanel={status.activeHeaderPanel}
                    threadIsActive={threadIsActive} boardList={boardList} 
                />  
                <HeaderPanels
                    fetchThread={fetchThread} closeThread={closeThread} 
                    fetchBoard={fetchBoard}
                    updateMonitoredThread={updateMonitoredThread}
                    monitorThread={monitorThread} unmonitorThread={unmonitorThread}

                    activePanel={status.activeHeaderPanel} status={status} 
                    threadMonitor={threadMonitor} settings={settings}
                />
                {/*<Navbar 
                    fetchBoardList={fetchBoardList}
                    addToFavourites={addToFavourites}
                    removeFromFavourites={removeFromFavourites}
                    scrollPage={scrollPage} scrollHeader={scrollHeader} 
                    changeProvider={changeProvider} fetchBoard={fetchBoard}
                    toggleNavbar={toggleNavbar} toggleSetting={toggleSetting}
                    searchBoardlist={searchBoardlist} closeThread={closeThread}

                    status={status} boardList={boardList} settings={settings}
                />*/}
                <AlertContainer position="bottom right"/>
            </div>
        )
    }
}

function mapStateToProps({status, boardList, thread, settings, board, threadMonitor}) {
    return {
        status,
        boardList,
        threadIsActive: thread.isActive,
        settings,
        board,
        threadMonitor
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        scrollPage,
        searchBoard,
        scrollHeader,
        changeProvider,
        fetchBoardList,
        fetchBoard,
        addToFavourites, 
        removeFromFavourites,
        destroyBoard,
        closeThread,
        toggleNavbar,
        toggleSetting,
        searchBoardlist,
        fetchThread,
        toggleHeaderPanel,
        updateMonitoredThread,
        monitorThread,
        unmonitorThread
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalPage)
