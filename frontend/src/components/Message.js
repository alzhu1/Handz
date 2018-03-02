import React from 'react'
import PropTypes from 'prop-types'
import classNames from "classnames"

class Message extends React.Component {
  static propTypes = {
      author: PropTypes.string,
      body: PropTypes.string.isRequired
    }

    render() {
      const classes = classNames('Message', {
        log: !this.props.author
      })

      return (
        <div className={classes}>
          {this.props.author && (
            <span className="author">{this.props.author}:</span>
          )}
          {this.props.body}
        </div>
      )
    }
  }

export default Message
