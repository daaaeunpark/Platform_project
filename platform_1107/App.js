import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { Card, Title, Paragraph } from 'react-native-paper';
import { WebView } from 'react-native-webview';


function HomeScreen() {
  const missionTexts = [
    "일일 걸음수 10,000보 달성하기!",
    "오늘 하루 2리터 물 마시기!",
    "30분 이상 운동하기!"
  ];

  const quoteTexts = [
    "고통 없인 얻는 것도 없다",
    "시작이 반이다",
    "꾸준함이 성공의 열쇠다"
  ];

  const [selectedMission, setSelectedMission] = useState(missionTexts[0]);
  const [selectedQuote, setSelectedQuote] = useState(quoteTexts[0]);

  useEffect(() => {
    const randomMissionIndex = Math.floor(Math.random() * missionTexts.length);
    const randomQuoteIndex = Math.floor(Math.random() * quoteTexts.length);
    setSelectedMission(missionTexts[randomMissionIndex]);
    setSelectedQuote(quoteTexts[randomQuoteIndex]);
  }, []);

   return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>다은님, 반갑습니다!</Text>
      <Image source={require('./assets/manggom.png')} />
      <Card style={styles.card}>
        <Card.Content>
          <Title style={{ color: 'green', fontWeight: 'bold', fontSize: 22, textAlign: 'center' }}>
            오늘의 미션! (ว˙o˙)ว
          </Title>
          <Paragraph style={{ color: 'black', fontSize: 17, textAlign: 'center' }}>
            {selectedMission}
          </Paragraph>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={{ color: 'green', fontWeight: 'bold', fontSize: 22, textAlign: 'center' }}>
            오늘의 명언! ( •︠‿•︡🫶🏻)
          </Title>
          <Paragraph style={{ color: 'black', fontSize: 17, textAlign: 'center' }}>
            {selectedQuote}
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
}

function SearchScreen() {
  return (
    <View style={styles.web_container}>
      <Text style={{ color: 'green', fontSize: 30, fontWeight: 'bold', margin: 10 }}>Health Tips</Text>
      <WebView source={{ uri: 'https://health.severance.healthcare/health/index.do' }}/>
    </View>
  );
}

function NotificationScreen() {
  const [count, setCount] = useState(0);
  const cupSize = 0.25;
  const goal = 2;

  const increaseCount = () => {
    const newCount = count + 1;

    if (newCount * cupSize >= goal) {
      Alert.alert('축하합니다!', '오늘의 수분 섭취 목표를 달성했습니다!');
    }
    setCount(newCount);
  }; 
  return (
  <View style={styles.container}>
    <View style={styles.iconContainer}>
      <Ionicons name="water" size={280} color="skyblue"/>
      <Text style={styles.countText}>{(count * cupSize).toFixed(2)} L</Text>
    </View>

    <View>
      <Text style={styles.basicText}>수분 섭취량을 기록하세요!</Text>

      <TouchableOpacity style={styles.eventButton} onPress={increaseCount}>
        <Text style={styles.buttonText}>0.25L 추가 버튼</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={() => setCount(0)}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  </View>
);
}

function MessageScreen() {
  const videoUrls = [
    'https://youtu.be/Iaa8YNDRbhg?si=LwvPdpOW0A20XgBm',
    'https://youtu.be/A5MzlPgNcJM?si=ctjCZVPc0o-lS7zS', 
    'https://youtu.be/Y8K_S8_-Dl0?si=uWSE0HyXnaiiv1k8',
  ];

  const [selectedVideo, setSelectedVideo] = useState(videoUrls[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videoUrls.length);
    setSelectedVideo(videoUrls[randomIndex]);
  }, []);

  return (
    <WebView source={{ uri: selectedVideo }}/>
  );
}

const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '홈',
            tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            title: '건강 정보',
            tabBarIcon: ({ color, size }) => <Icon name="search" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            title: '기록',
            tabBarIcon: ({ color, size }) => <Icon name="note" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Message"
          component={MessageScreen}
          options={{
            title: '오늘의 운동',
            tabBarIcon: ({ color, size }) => <Icon name="fitness-center" color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor:'lightyellow'
  },
  paragraph: {
    margin: 20,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
  },
  card: {
    width: '90%',
    marginVertical: 10,
    padding: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  countText: {
    position: 'absolute',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    top: '32%',
  },
  eventButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'green',
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  resetButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'lightgreen',
    borderRadius: 50,
  },
  basicText: {
    fontSize: 20,
    color: 'gray',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  web_container: {
    flex: 1,
  },
});
