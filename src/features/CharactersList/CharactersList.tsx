import React, {useEffect, useState} from 'react';

import { Pagination, List } from 'antd';

import Card from 'entities/Card/Card';
import {ICardProps} from 'entities/Card/Card';

import styles from 'features/CharactersList/CharactersList.module.scss';

const url = "https://swapi.dev/api/people";

const CharactersList = () => {
	const [charactersData, setData] = useState([]);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);

	useEffect(() => {
		const dataFetch = async () => {
			const dataFromFetch = await (await fetch(`${url}/?page=${page}`)).json();
			
			setTotal(dataFromFetch.count);

      // const dataWithPagination = dataFromFetch.slice(
      //   page * 10,
      //   (page + 1) * 10
      // );

      setData(dataFromFetch.results);
    };

    dataFetch();
	}, []);

  return (
		

		<>	
		{/* <div className={styles.CharactersList}> */}
			{/* {charactersData?.map((item: ICardProps) => (
			<div key={item?.name} className={styles.CharactersList__Card}>
				<Card name={item?.name} height={item.height} mass={item.mass} birth_year={item.birth_year} />
			</div>))} */}
			<List
				size="small"
				// header={<div>Header</div>}
				// footer={<div>Footer</div>}
				bordered
				dataSource={charactersData}
				renderItem={(item: ICardProps) => <List.Item>{item.name}</List.Item>}
			/>

			<Pagination defaultCurrent={page} total={total} />;
		</>
	)
}

export default CharactersList;
