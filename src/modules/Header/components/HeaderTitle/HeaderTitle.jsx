import './HeaderTitle.styles';
import React, { Component, PropTypes } from 'react';
import cx from 'classnames'

import { Tooltip, IconCircle } from '~/components';
import { bindMembersToClass } from '~/utils/react'

const i = window.appSettings.icons

class HeaderTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hovering: false
        }
        bindMembersToClass(this, 'handleMouseLeave', 'handleMouseEnter');
    }

    render () {
        const {
            className,
            children,
            ...restProps
        } = this.props;

        const titleClass = cx('HeaderTitle', className, {
            'HeaderTitle--hovering': this.state.hovering
        })

        return (
            <div className={titleClass}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}>
              <button
                className='button'
                {...restProps}>
                  {children}
              </button>
            </div>
        )
    }

    handleMouseEnter() {
        this.setState({
            hovering: true
        });
    }

    handleMouseLeave() {
        this.setState({
            hovering: false
        });
    }
}

HeaderTitle.displayName = 'HeaderTitle';

export default HeaderTitle;
