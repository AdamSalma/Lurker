import React from 'react';
import cx from 'classnames';
import './TitledIcon.styles';

import Icon from '~/components/Icon';

export default function TitledIcon ({ name, title, className }) {
    return <div className={cx("TitledIcon", className)}>
        <Icon name={name} className="TitledIcon"/>
        <span>{title}</span>
    </div>
}
