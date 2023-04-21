import React, {useEffect, useState} from 'react';

import { Pagination, Modal, List, Space, Spin } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

import useTypedSelector from 'hooks/useTypedSelector';

import styles from './CharactersList.module.scss';
import { fetchCharacterRequest, fetchCharacterSearchRequest } from 'store/characterList/action';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { CharactersActionTypes } from 'store/characterList/types';
import { Link } from 'react-router-dom';
import { ICharacter } from 'store/character/types';

const CharactersList = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);

	const {searchedName: search, loading, data: charactersData, page, total, error} = useTypedSelector(state => state.characterList);

	useEffect(() => {
		if (dispatch && search) {
			dispatch(fetchCharacterSearchRequest(search));
		} else {
      const getData = setTimeout(() => {
        dispatch && page && dispatch(fetchCharacterRequest(page))
      }, 100)

    return () => clearTimeout(getData);
		}
  }, [page, search, dispatch]);
  
  useEffect(() => {
    if (error) {
      setOpen(true);
      const timeout = setTimeout(() => {
        setOpen(false);
      }, 3000);

      return (() => clearTimeout(timeout));
    }
  }, [error])

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
        {error && (
          <Modal 
            title = {<><ExclamationCircleFilled  style={{ color: 'red' }}/> {error}</>}
            open={open}
            footer={null}
          />
        )}
				{loading && (
          <div className={styles.CharactersList__Loading}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Spin tip="Loading..." />
            </Space>
          </div>
        )}
				<List
					size="small"
					bordered
					dataSource={charactersData}
					renderItem={(item: ICharacter) => (
						<List.Item>
							<Link to={`/${getId(item.url)}`}>{item.name}</Link>
						</List.Item>)}
				/>
			</div>

			<Pagination size="small" defaultCurrent={page} total={total} onChange={handlePageChange} showSizeChanger={false} />
		</>
	)
}

export default CharactersList;
