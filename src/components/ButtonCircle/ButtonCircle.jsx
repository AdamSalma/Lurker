import React, {Component} from 'react'
import classes from 'classnames'

export default class ControlWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggled: false
        }

        this.handleClick = this.handleClick.bind(this)
    }

    render() {
        const controlClasses = classes('control-wrapper', {
            "selected": this.props.isActive
        })

        return (
            <div className={controlClasses} onClick={this.handleClick}>
                {this.renderChildren()}
            </div>
        )
    }

    renderChildren() {
        const { children, toggleProps } = this.props

        if (this.state.isToggled) {
            console.log("RENDERING TOGGLED PROPS")
            return React.Children.map(children, child => {
                // Use custom props
                return React.cloneElement(child, toggleProps)
            })
        } else {
            return children
        }
    }

    handleClick() {
        this.setState(state => {
            return {
                isToggled: !state.isToggled
            }
        })
    }
}