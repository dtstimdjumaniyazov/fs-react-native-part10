import { useMutation, useApolloClient } from "@apollo/client/react";
import { AUTHENTICATE } from "../graphql/queries";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const [mutate, result] = useMutation(AUTHENTICATE);

    const signIn = async ({ username, password}) => {
        const response = await mutate({
            variables: {
                username,
                password
            },
        });

        await authStorage.setAccessToken(response.data.authenticate.accessToken);
        await apolloClient.resetStore();

        return response;
    }

    return [signIn, result]
}

export default useSignIn;