import React, { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'

import './style.css'

import { getLocation } from '../../redux/selectors/router'

const NavbarButton = ({
  route, label, external, href, onClick,
}) => {
  const dispatch = useDispatch()
  const { pathname } = useSelector(getLocation)
  const navigate = (path) => dispatch(push(path))

  if (href) {
    const anchorProps = external ? {
      target: '_blank',
      rel: 'noopener noreferrer',
    } : {}
    return (
      <a href={href} {...anchorProps}>
        {label}
      </a>
    )
  }

  return (
    <button
      type='button'
      className={ClassNames('hfui-navbarbutton', { active: pathname === route })}
      onClick={onClick || (route === pathname ? undefined : () => navigate(route))}
    >
      {label}
    </button>
  )
}

NavbarButton.propTypes = {
  route: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string, PropTypes.array, PropTypes.element,
  ]).isRequired,
  href: PropTypes.string,
  external: PropTypes.bool,
  onClick: PropTypes.func,
}

NavbarButton.defaultProps = {
  route: '',
  href: '',
  external: false,
  onClick: null,
}

export default memo(NavbarButton)
