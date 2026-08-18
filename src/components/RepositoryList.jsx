import { useState } from 'react';
import { FlatList, View, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';
import RepositoryItem from './RepositoryItem';
import RepositoryOrderPicker, { orderOptions } from './RepositoryOrderPicker';
import RepositorySearchInput from './RepositorySearchInput';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  onPressItem = () => {},
  ListHeaderComponent,
}) => {
  const repositoriesNodes = repositories
    ? repositories?.edges?.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoriesNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={({item}) => (
        <Pressable onPress={() => onPressItem(item.id)}>
          <RepositoryItem repo={item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const [orderKey, setOrderKey] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const { orderBy, orderDirection } = orderOptions[orderKey];
  const { repositories } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchKeyword,
  });
  const navigate = useNavigate();

  const onPressItem = (id) => {
    navigate(`/repository/${id}`);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onPressItem={onPressItem}
      ListHeaderComponent={
        <>
          <RepositorySearchInput value={searchKeyword} onChangeText={setSearchKeyword} />
          <RepositoryOrderPicker selectedKey={orderKey} onValueChange={setOrderKey} />
        </>
      }
    />
  );
};

export default RepositoryList;