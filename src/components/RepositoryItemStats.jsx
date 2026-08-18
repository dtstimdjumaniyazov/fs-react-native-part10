import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const StatItem = ({ count, label }) => (
  <View style={styles.statItem}>
    <Text fontWeight="bold">{formatCount(count)}</Text>
    <Text color="textSecondary">{label}</Text>
  </View>
);

const RepositoryItemStats = ({ repo }) => {
  return (
    <View style={styles.statsRow}>
      <StatItem count={repo.stargazersCount} label="Stars" />
      <StatItem count={repo.forksCount} label="Forks" />
      <StatItem count={repo.reviewCount} label="Reviews" />
      <StatItem count={repo.ratingAverage} label="Rating" />
    </View>
  );
};

export default RepositoryItemStats;
