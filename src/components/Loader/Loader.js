import React from 'react';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import styles from './Loader.module.css';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function Loader() {
  return (
    <div className={styles.container}>
      <Spin indicator={antIcon} />
    </div>
  );
}
