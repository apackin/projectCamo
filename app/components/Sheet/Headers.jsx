import React, { Component, PropTypes } from 'react';
import ColumnOptions from './ColumnOptions';
import AddColumn from './AddColumn';
import classNames from 'classnames/bind';
import styles from 'css/components/table';

const cx = classNames.bind(styles);

function generateColumnOptions (headers) {
  return headers.map((header) => {
      return (
          <ColumnOptions data={header} key={header.id}/>
      )
  })
}

const Headers = (props) => {
  console.log("rendered")
  return (
      <div className={cx('theaders')}>
        <div className={cx('topCorner')} />
        <div className={cx('topCorner')}></div>
        {generateColumnOptions(props.headers)}
        <AddColumn />
      </div>
    );
}

export default Headers;
