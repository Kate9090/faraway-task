import React from 'react';
// import {useDispatch } from 'react-redux'

import {Input} from 'antd';
import { setSearchedName } from 'app/store/characterList/action';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setSearchNameAction } from 'app/store/characterList/reducer';

const { Search } = Input;

const CharacterFilter = () => {
	const dispatch = useAppDispatch();

	const handleSearch = (name: string) => {
		dispatch(setSearchNameAction(name));
	}

  return (
		<Search placeholder="Input search character's name" onSearch={handleSearch} style={{ width: 300 }} />
	)
}

export default CharacterFilter;
