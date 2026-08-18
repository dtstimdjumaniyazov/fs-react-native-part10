import { TextInput, StyleSheet } from 'react-native';
import theme from './theme';

const styles = StyleSheet.create({
  input: {
    margin: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#d1d5da',
    borderRadius: 4,
    backgroundColor: theme.colors.white,
  },
});

const RepositorySearchInput = ({ value, onChangeText }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder="Search"
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default RepositorySearchInput;
