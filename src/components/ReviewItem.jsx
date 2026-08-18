import { View, Pressable, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import Text from './Text';
import theme from './theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.white,
  },
  topRow: {
    flexDirection: 'row',
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  infoContainer: {
    flexShrink: 1,
  },
  username: {
    marginBottom: 4,
  },
  date: {
    marginBottom: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 15,
  },
  button: {
    flex: 1,
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#d73a4a',
  },
});

const ReviewItem = ({ review, heading, onViewRepository, onDeleteReview }) => {
  const showActions = Boolean(onViewRepository || onDeleteReview);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.ratingContainer}>
          <Text color="primary" fontWeight="bold" fontSize="subheading">
            {review.rating}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.username} fontWeight="bold">
            {heading}
          </Text>
          <Text style={styles.date} color="textSecondary">
            {format(new Date(review.createdAt), 'dd MMM yyyy')}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      {showActions && (
        <View style={styles.actionsRow}>
          <Pressable style={[styles.button, styles.viewButton]} onPress={onViewRepository}>
            <Text color="white" fontWeight="bold">View repository</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.deleteButton]} onPress={onDeleteReview}>
            <Text color="white" fontWeight="bold">Delete review</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
