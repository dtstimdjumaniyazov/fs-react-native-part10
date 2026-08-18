import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from './theme';
import { Navigate, Route, Routes } from 'react-router-native';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SingleRepository from './SingleRepository';
import ReviewForm from './ReviewForm';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.appBackground,
  },
});

const Main = () => {
  return (
    <>

      <View style={styles.container}>
        <AppBar />
        <Routes>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/repository/:id' element={<SingleRepository />} />
          <Route path='/create-review' element={<ReviewForm />} />
          <Route path='/my-reviews' element={<MyReviews />} />
          <Route path='/' element={<RepositoryList />} />
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    </>
  );
};

export default Main;