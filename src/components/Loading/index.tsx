import React, { useMemo } from 'react'
// import classnames from 'classnames'
import PropTypes from 'prop-types'
import './style.scss'

interface ILoading {
  className?: string
  children: React.ReactNode
  width?: string | number
  height?: string | number
  outsideColor?: string
  insideColor?: string
  duration?: string | number | any
}

const Loading: React.FunctionComponent<ILoading> = (props) => {
  const {
    className,
    children,
    width,
    height,
    outsideColor,
    insideColor,
    duration,
    ...rest
  } = props
  const outsideColorAnimation = useMemo(
    () => `${outsideColor};${insideColor};${outsideColor}`,
    []
  )
  const insideColorAnimation = useMemo(
    () => `${insideColor};${outsideColor};${insideColor}`,
    []
  )

  return (
    <div className="loading" {...rest}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 50 50"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="transparent"
          stroke-width="3"
          stroke-dasharray="31.415, 31.415"
          stroke={outsideColor}
          stroke-linecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0, 25 25;360, 25 25"
            dur={`${duration}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke"
            values={outsideColorAnimation}
            dur={`${+duration * 2}s`}
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="25"
          cy="25"
          r="10"
          fill="transparent"
          stroke-width="3"
          stroke-dasharray="15.7, 15.7"
          stroke={insideColor}
          stroke-linecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="360, 25 25;0, 25 25"
            dur={`${duration}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke"
            values={insideColorAnimation}
            dur={`${+duration * 2}s`}
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <div className="loading-text">{children}</div>
    </div>
  )
}
Loading.defaultProps = {
  width: 50,
  height: 50,
  outsideColor: '#02bcfe',
  insideColor: '#3be6cb',
  duration: 2,
}

Loading.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default Loading
