import React from 'react';

import { Card } from 'antd';

export interface ICardProps {
  name: string;
  birth_year: string;
  height: string;
  mass: string;
}

const CardEntity: React.FC<ICardProps> = ({name, birth_year, height, mass}) => (
  <Card title={name} bordered={false} style={{ width: 300 }}>
    <p>birth_year: {birth_year}</p>
    <p>height: {height}</p>
    <p>mass: {mass}</p>
  </Card>
);

export default CardEntity;

