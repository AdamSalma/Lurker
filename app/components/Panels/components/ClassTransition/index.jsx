import React, { PureComponent } from 'react';
import cx from 'classnames';
import {isFunction} from '~/utils/types';
import './styles';


class ClassTransition extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true
        }
    }

    render() {
        const { className, effect, children, ...restProps } = this.props;

        const classEffect = this.getEffectClass(effect);
        const classes = cx('ClassTransition', className, classEffect, {
            "ClassTransition--animate-in": !this.state.isHidden,
            "ClassTransition--animate-out": this.state.isHidden
        });

        return (
            <div className={classes} {...restProps}>
                {children}
            </div>
        );
    }

    show = ({ callback, duration=240 }) => {
        isFunction(callback) && setTimeout(callback, duration);
        this.setState({ isHidden: false });
    }

    hide = ({ callback, duration=240 }) => {
        this.setState({ isHidden: true });
        isFunction(callback) && setTimeout(callback, duration);
    }

    getEffectClass(effect) {
        switch (effect) {
            case "scale":
                return "ClassTransition--scale-effect"
            case "fade":
                return "ClassTransition--fade-effect"
            case "fade scale":
            case "scale fade":
            default:
                return "ClassTransition--fade-scale-effect"
        }
    }
}

ClassTransition.displayName = 'ClassTransition';

export default ClassTransition;
