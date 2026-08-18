import { View, Image, Pressable, StyleSheet, Linking } from 'react-native';
import Text from './Text';
import LanguageTag from './LanguageTag';
import RepositoryItemStats from './RepositoryItemStats';
import theme from './theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.white,
  },
  topRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 15,
  },
  infoContainer: {
    flexShrink: 1,
  },
  fullName: {
    marginBottom: 4,
  },
  description: {
    marginBottom: 8,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginTop: 15,
  },
});

const RepositoryItem = ({ repo, showGithubButton = false }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.topRow}>
        <Image style={styles.image} source={{ uri: repo.ownerAvatarUrl }} />
        <View style={styles.infoContainer}>
          <Text style={styles.fullName} fontWeight="bold" fontSize="subheading">
            {repo.fullName}
          </Text>
          <Text style={styles.description} color="textSecondary">
            {repo.description}
          </Text>
          <LanguageTag language={repo.language} />
        </View>
      </View>
      <RepositoryItemStats repo={repo} />
      {showGithubButton && (
        <Pressable style={styles.button} onPress={() => Linking.openURL(repo.url)}>
          <Text color="white" fontWeight="bold">Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
