import React, { FC } from 'react';
import { css } from 'emotion';
import {Link } from 'react-router-dom'
import _ from 'lodash'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames'

export interface Props {
  child: any;
}

const DropDownChild: FC<Props> = props => {
  const location = useLocation()
  const { child } = props;
  const menuItemSelected = _.startsWith(location.pathname, child.url)
  const listItemClassName = classNames({
    'sidemenu-dropdown-item-selected' : menuItemSelected
  })

  const iconClassName = css`
    margin-right: 12px;
  `;

  

  return (
    <li className={listItemClassName}>
      <Link to={child.url} className="">
        {/* {child.icon && <Icon name={child.icon as IconName} className={iconClassName} />} */}
        <span className={iconClassName}>{child.title}</span>
      </Link>
    </li>
  );
};

export default DropDownChild;
