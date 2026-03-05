import { defaultStyle } from '@/constants/fonts';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("")

  const press = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (search == "12345") {
      setIsOpen(true);
    }
    else {
      if (isOpen) setIsOpen(false);
    }
  }, [search])

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {isOpen ? (
          <Text>Я открыт</Text>
          ) : (<></>)}
        <View style={{width: "100%", backgroundColor: "#FFFFFF", flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12}}>
          <Image style={{width: 24, height: 24}} source={require("../../assets/images/search.png")}></Image>
          <TextInput
            value={search}
            onChangeText={(e) => {setSearch(e)}}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            style={{width: "100%", color: "#000000", fontSize: 14}}
          />
        </View>
        <View style={{flexDirection: "row", justifyContent: "space-between", gap: 12}}>
          <LinearGradient
            colors={['#000000', '#FF0051']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.block}
          >
          <TouchableOpacity onPress={press} style={{width: "100%"}}>
            <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 8}}>
              <View>
                <Text style={{...defaultStyle.fontDefault, marginBottom: 8}}>Система {'\n'}лояльности</Text>
                <Text style={defaultStyle.font28}>14 400 $</Text>
              </View>
              <View>
                <Image style={{width: 24, height: 24}} source={require("../../assets/images/menuBack.jpg")}></Image>
              </View>
            </View>
            <View>
              <Text style={{...defaultStyle.fontDefault, fontSize: 11, opacity: 0.6}}>Можно списать до 50% от покупки, 1 балл = 1 рубль</Text>
            </View>
          </TouchableOpacity>
          </LinearGradient>
          <View style={styles.block2}>
            <Text style={{...defaultStyle.fontDefault, color:"#000000", marginBottom: 8}}>Зовите {'\n'}друзей</Text>
            <View style={{flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 8}}><Text style={{...defaultStyle.font28, color:"#000000"}}>300</Text><Image style={{width: 32, height: 32}} source={require("../../assets/images/icons8-ruble 1.png")}></Image></View>
            <Text style={{...defaultStyle.fontDefault, fontSize: 11, color: "#8A8A8E"}}>Дарим по 500 ₽ — тебе и приведенному другу</Text>
            <Image style={{width: 24, height: 24, position: "absolute", right: 12, top: 12}} source={require("../../assets/images/chevron-down.png")}></Image>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  block: {
    maxWidth: "60%",
    minHeight: 148,
    padding: 12,
    paddingRight: 12,
    borderRadius: 20,
    width: "100%"
  },
  block2: {
    maxWidth: "40%",
    minHeight: 148,
    padding: 12,
    paddingRight: 12,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    width: "100%"
  }
});
