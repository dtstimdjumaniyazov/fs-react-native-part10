import { FlatList, View, StyleSheet, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
import ReviewItem from './ReviewItem';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { user, loading, refetch } = useAuthorizedUser({ includeReviews: true });
  const [deleteReview] = useDeleteReview();
  const navigate = useNavigate();

  if (loading) {
    return null;
  }

  const reviewNodes = user?.reviews
    ? user.reviews.edges.map(edge => edge.node)
    : [];

  const onViewRepository = (repositoryId) => {
    navigate(`/repository/${repositoryId}`);
  };

  const onDeleteReview = (id) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'CANCEL', style: 'cancel' },
        {
          text: 'DELETE',
          onPress: async () => {
            await deleteReview(id);
            await refetch();
          },
        },
      ],
    );
  };

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          heading={item.repository.fullName}
          onViewRepository={() => onViewRepository(item.repository.id)}
          onDeleteReview={() => onDeleteReview(item.id)}
        />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
