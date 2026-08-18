import { View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from './theme';

const styles = StyleSheet.create({
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

const LanguageTag = ({ language }) => {
  return (
    <View style={styles.tag}>
      <Text color="white">{language}</Text>
    </View>
  );
};

export default LanguageTag;
