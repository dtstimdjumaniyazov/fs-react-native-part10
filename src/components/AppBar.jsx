import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useApolloClient, useQuery } from '@apollo/client/react';
import { ME } from '../graphql/queries';
import Constants from 'expo-constants';
import { Link, useNavigate } from 'react-router-native';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
  },
  contentContainer: {
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const isIsSignedIn = Boolean(data?.me);

  const handleSignout = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/');
  }


  return <View style={styles.container}>
    <ScrollView horizontal contentContainerStyle={styles.contentContainer}>
      <Pressable style={{  paddingVertical: 12, paddingHorizontal: 12}}>
        <Link to="/">
          <Text style={{ color: 'white' }}>Repositories</Text>
        </Link>
      </Pressable>
      {isIsSignedIn ? (
        <>
          <Pressable style={{  paddingVertical: 12, paddingHorizontal: 12}}>
            <Link to="/create-review">
              <Text style={{ color: 'white' }}>Create a review</Text>
            </Link>
          </Pressable>
          <Pressable style={{  paddingVertical: 12, paddingHorizontal: 12}}>
            <Link to="/my-reviews">
              <Text style={{ color: 'white' }}>My reviews</Text>
            </Link>
          </Pressable>
          <Pressable style={{  paddingVertical: 12, paddingHorizontal: 12}} onPress={handleSignout}>
            <Text style={{ color: 'white' }}>Sign out</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Pressable style={{  paddingVertical: 12, paddingHorizontal: 12}}>
            <Link to="/sign-in">
              <Text style={{ color: 'white' }}>Sign in</Text>
            </Link>
          </Pressable>
          <Pressable style={{  paddingVertical: 12, paddingHorizontal: 12}}>
            <Link to="/sign-up">
              <Text style={{ color: 'white' }}>Sign up</Text>
            </Link>
          </Pressable>
        </>
      )}
    </ScrollView>
  </View>;
};

export default AppBar;
