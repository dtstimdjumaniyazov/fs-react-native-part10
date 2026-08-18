import { useQuery } from '@apollo/client/react';
import { ME } from '../graphql/queries';

const useAuthorizedUser = ({ includeReviews = false } = {}) => {
    const { data, error, loading, refetch } = useQuery(ME, {
        fetchPolicy: 'cache-and-network',
        variables: { includeReviews },
    });

    const user = data?.me;

    return { user, error, loading, refetch };
};

export default useAuthorizedUser;
