import React from 'react';

import { Layout, Row, Typography } from 'antd';

import CharactersList from 'features/CharactersList/CharactersList';
import CharacterFilter from 'entities/CharacterFilters/CharacterFilters';

import styles from 'pages/CharacterPage/index.module.scss';

const CharacterPage = () => {
  return (
    <Layout className={styles.CharacterPage}>
      <Layout>
        <Row justify="center">
          <Typography.Title level={1}>Characters</Typography.Title>
        </Row>

        <Row justify="center">
          <CharacterFilter />
        </Row>

      </Layout>

      <Layout.Content>
        <CharactersList />
      </Layout.Content>
    </Layout>
  )
}

export default CharacterPage;
