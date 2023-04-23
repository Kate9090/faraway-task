import React from 'react';
import { Layout } from 'antd';
import DetailCharacter from 'features/DetailCharacter/DetailCharacter';

import styles from './index.module.scss';


const DetailCharacterPage = () => {
  return (
    <Layout className={styles.DetailCharacterPage}>
      <DetailCharacter />
    </Layout>
  )
}

export default DetailCharacterPage;

