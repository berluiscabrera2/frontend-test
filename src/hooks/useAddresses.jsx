
import { useQuery } from '@tanstack/react-query'
import { getAddresses } from '../api/addressesAPI';


const useAddresses = () => {

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['addresses'],
        queryFn: getAddresses
    });

    return {data, isLoading, isError, error};
}

export default useAddresses