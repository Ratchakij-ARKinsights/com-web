import { useContext } from 'react';
import { ApiDataContext } from '../contexts/ApiDataContext';

export default function useApiData() {
    return useContext(ApiDataContext);
}
