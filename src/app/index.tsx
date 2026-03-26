import api from '@/api/api';
import ProductCard from '@/components/products/product-card';
import LoadingScreen from '@/components/ui/loading-screen';
import { defaultStyle } from '@/constants/fonts';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ProductDto = {
  id: string;
  name: string;
  price: number;
  image?: string;
  brand: string;
};

export type UserDto = {
  id: string;
  username?: string;
  score?: number;
  fio?: string;
  address?: string;
  email?: string;
  phone: string;
} | undefined;

export default function HomeScreen() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [user, setUser] = useState<UserDto>(undefined);
  const { isAuthenticated, logout, authReady, startSmsLogin, verifySmsLogin } = useAuth();
  const [authStatus, setAuthStatus] = useState<number>(0);
  const authStatusRef = useRef<number>(0);
  const [phone, setPhone] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const press = () => {
    setIsOpen(!isOpen);
  }

  const loadUser = async () => {
    const response = await api.get<UserDto>("/user/me");

    setUser(response.data);
  }

  const loadProducts = async () => {
    const response = await api.get<ProductDto[]>("/product/all");

    const filtered = response.data.filter((x) =>
      x.name.toLowerCase().includes(search.toLowerCase())
    );

    setProducts(filtered);
  }

  const onPressAuth = async () => {
    if (authStatusRef.current == 0) {
      startSmsLogin(phone);
      authStatusRef.current = 1;
      setAuthStatus(1);
      setCode("");
    }
    else if (authStatusRef.current == 1) {
      verifySmsLogin(phone, code);
      authStatusRef.current = 2;
      setAuthStatus(2);
    }
  }

  const onPressLogout = async () => {
    logout();
  }


  useEffect(() => {
    if (isAuthenticated) loadProducts();
  }, [search, isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) loadUser();
    else {
      setUser(undefined);
      setAuthStatus(0);
      authStatusRef.current = 0;
    }

  }, [isAuthenticated])

  if (!authReady) return (<LoadingScreen></LoadingScreen>);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
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
        {isAuthenticated ? (
          <View style={{width: "100%", backgroundColor: "#FFFFFF", flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, gap: 16, justifyContent: "space-between"}}>
            <Text>Username: {user?.username}</Text>
            <TouchableOpacity onPress={onPressLogout}>
            <View style={{width: "auto", backgroundColor: "#000000", flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12}}>
              <Text style={{color: "#FFFFFF"}}>Выйти</Text>
            </View>
          </TouchableOpacity>
          </View>
        ) : (
            <View style={{}}>
          <Text style={{fontSize: 24, fontWeight: "bold", marginBottom: 8}}>Авторизация</Text>
          <View style={{marginBottom: 8, width: "100%", backgroundColor: "#FFFFFF", flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12}}>
            <TextInput
              value={phone}
              placeholder='Телефон'
              onChangeText={(e) => {setPhone(e)}}
              autoCapitalize="none"
              autoCorrect={false}
              style={{width: "100%", color: "#000000", fontSize: 14}}
            />
          </View>
          {authStatus == 0 ? (<></>) : (
            <View style={{width: "100%", backgroundColor: "#FFFFFF", flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12}}>
              <TextInput
                value={code}
                placeholder='Код'
                onChangeText={(e) => {setCode(e)}}
                autoCapitalize="none"
                autoCorrect={false}
                style={{width: "100%", color: "#000000", fontSize: 14}}
              />
            </View>
          )}
          {authStatus == 2 ? (<></>) : (
          <TouchableOpacity onPress={onPressAuth}>
            <View style={{width: "100%", backgroundColor: "#FFFFFF", flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12}}>
              <Text>Авторизация</Text>
            </View>
          </TouchableOpacity>
          )}
        </View>
        )}
        
        
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
        <View>
          <Text style={{fontSize: 24, fontWeight: "bold", marginBottom: 8}}>Товары</Text>
          <FlatList
            data={products}
            horizontal={true}
            renderItem={({item}) => 
            <ProductCard 
              {...item} 
              onAddToCart={() => {}}  
              key={item.id} 
            />}
            keyExtractor={item => item.id.toString()}
          />
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
