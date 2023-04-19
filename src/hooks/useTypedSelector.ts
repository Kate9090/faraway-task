import { RootState } from 'app/store/characterList';
import {TypedUseSelectorHook, useSelector} from 'react-redux';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
