/**
 * Sample React Native App
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import { createMemoryHistory, Router, Route } from 'react-router';
import { createNavigatorRouter } from 'react-native-navigator-router';


class Home extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  static defaultProps() {
    return {
      key: 'home',
    };
  }

  componentDidMount() {
    console.log('Main mount');
  }

  componentWillUnmount() {
    console.log('Main unmount');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{height: 30, backgroundColor: '#00ff00'}}>
          <TouchableHighlight onPress={() => this.context.router.push('/about')}>
            <Text style={styles.instructions}>
              This is Home, Press here to About.
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}


class About extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  static defaultProps() {
    return {
      key: 'about',
    };
  }

  componentDidMount() {
    console.log('About mount');
  }

  componentWillUnmount() {
    console.log('About unmount');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => this.context.router.goBack()}>
          <Text style={styles.welcome}>
            About, Press here to go back.
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}


class App extends Component {
  render() {
    return (
      <Router history={createMemoryHistory('/')}>
        <Route path='/' component={createNavigatorRouter(Home)}>
          <Route path="/about" component={About} />
        </Route>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;
