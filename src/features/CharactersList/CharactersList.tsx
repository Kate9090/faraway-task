import React, {useEffect, useState} from 'react';

import { Pagination, List } from 'antd';

import {ICardProps} from 'entities/Card/Card';
import useTypedSelector from 'hooks/useTypedSelector';

import styles from './CharactersList.module.scss';
import { fetchCharacterRequest, fetchCharacterSearchRequest } from 'app/store/characterList/action';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { CharactersActionTypes } from 'app/store/characterList/types';
import { Link } from 'react-router-dom';


const CharactersList = () => {
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

	const getId = (url: string) => {
		return url.match(/(\d)+\/$/)![0].replace('/', '');
	}

  return (
		<>	
			<div className={styles.CharactersList}>
				{loading && <div className={styles.CharactersList__Loading}>Loading ....</div>}
				<List
					size="small"
					bordered
					dataSource={charactersData}
					renderItem={(item: ICardProps) => (
						<List.Item>
							<Link to={`/${getId(item.url)}`}>{item.name}</Link>
						</List.Item>)}
				/>
			</div>

			<Pagination size="small" defaultCurrent={page} total={total} onChange={handlePageChange} />
		</>
	)
}

export default CharactersList;
