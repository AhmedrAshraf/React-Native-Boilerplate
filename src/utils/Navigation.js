import React from 'react';
import {
  View,
  StatusBar,
  Dimensions,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import Home from '../screens/Home';
import MenuDrawer from '../screens/Menubar';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
  drawerWidth: WIDTH * 0.72,
  contentComponent: ({navigation}) => <MenuDrawer navigation={navigation} />,
};

const App = createDrawerNavigator({Home}, DrawerConfig);

const Auth = createStackNavigator(
  {Home},
  {initialRouteName: 'Home'},
);

class Load extends React.Component {
  constructor() {
    super();
    this.loadData();
  }
  loadData = async () => {
    const value = await AsyncStorage.getItem('uid');
    this.props.navigation.navigate(value ? 'App' : 'Auth');
  };
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

export default createAppContainer(
  createSwitchNavigator({App, Auth, Load}, {initialRouteName: 'Auth'}),
);
