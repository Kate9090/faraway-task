import React, {useEffect, useState} from 'react';

import { Pagination, List } from 'antd';

import {ICardProps} from 'entities/Card/Card';
import useTypedSelector from 'hooks/useTypedSelector';

import styles from './CharactersList.module.scss';
// import { useDispatch } from 'react-redux';
import { fetchCharacterRequest, fetchCharacterSearchRequest } from 'app/store/characterList/action';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { CharactersActionTypes } from 'app/store/characterList/types';


const CharactersList = () => {
	// const [charactersData, setData] = useState([]);
	// const [page, setPage] = useState<number>(1);
	// const [total, setTotal] = useState<number>(0);
	const dispatch = useAppDispatch();

	const {searchedName: search, loading, data: charactersData, page, total} = useTypedSelector(state => state.characterList);

	useEffect(() => {
		if (search) {
			dispatch(fetchCharacterSearchRequest(search));
		} else {
			dispatch(fetchCharacterRequest(page))
		}
	}, [page, search]);

	const handlePageChange = (page: number) => {
		dispatch({
			type: CharactersActionTypes.SET_PAGE,
			payload: page
		});
	}

  return (
		<>	
			<div className={styles.CharactersList}>
				{loading && <div className={styles.CharactersList__Loading}>Loading ....</div>}
				<List
					size="small"
					bordered
					dataSource={charactersData}
					renderItem={(item: ICardProps) => <List.Item>{item.name}</List.Item>}
				/>
			</div>

			<Pagination size="small" defaultCurrent={page} total={total} onChange={handlePageChange} />
		</>
	)
}

export default CharactersList;
