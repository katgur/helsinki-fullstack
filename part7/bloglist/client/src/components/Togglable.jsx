import { useState, Children, isValidElement, cloneElement } from "react"
import PropTypes from "prop-types"

function Togglable({ children, buttonLabel }) {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? "none" : "" }
    const showWhenVisible = { display: visible ? "" : "none" }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const childrenWithProps = Children.map(children, child => {
        if (isValidElement(child)) {
            return cloneElement(child, { toggleVisibility });
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {childrenWithProps}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
}

Togglable.displayName = "Togglable"
Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable
