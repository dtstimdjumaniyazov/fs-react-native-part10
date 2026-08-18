import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ orderBy, orderDirection, searchKeyword } = {}) => {
    const {data, error, loading} = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables: { orderBy, orderDirection, searchKeyword },
    })

    const repositories = data?.repositories;


    return { repositories, error, loading};
}

export default useRepositories;