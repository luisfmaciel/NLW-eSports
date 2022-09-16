import { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameParams } from '../../@types/navigation';

import logoImg from '../../assets/logo-nlw-esports.png';

import { Background } from '../../components/Background';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { Heading } from '../../components/Heading';

import { THEME } from '../../theme';
import { styles } from './styles';

export function Game() {
  const [duos, setDuo] = useState<DuoCardProps[]>([]);

  const route = useRoute();
  const navigation = useNavigation();
  const game = route.params as GameParams;

  useEffect(() => {
    fetch(`http://192.168.0.24:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => {
        setDuo(data);
      });
  }, [])

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading
          title={game.title}
          subtitle={'Conecte-se e começe a jogar!'}
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => {}}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda
            </Text>
          )}
        />

      </SafeAreaView>
    </Background>
  );
}