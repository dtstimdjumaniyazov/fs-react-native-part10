import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import theme from './theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: 5,
  },
});

export const orderOptions = {
  latest: {
    label: 'Latest repositories',
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  },
  highestRated: {
    label: 'Highest rated repositories',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
  },
  lowestRated: {
    label: 'Lowest rated repositories',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  },
};

const RepositoryOrderPicker = ({ selectedKey, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Picker selectedValue={selectedKey} onValueChange={onValueChange}>
        {Object.entries(orderOptions).map(([key, { label }]) => (
          <Picker.Item key={key} label={label} value={key} />
        ))}
      </Picker>
    </View>
  );
};

export default RepositoryOrderPicker;
