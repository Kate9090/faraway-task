import { RootState } from 'app/store/reducer';
import {TypedUseSelectorHook, useSelector} from 'react-redux';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
