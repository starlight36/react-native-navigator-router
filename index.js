import React, { Component, Platform, BackAndroid, Navigator, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export function createNavigatorRouter(RootComponent, onBack = null, style = {}) {
  if (!onBack) {
    onBack = function (index) {
      if (index > 1) {
        this.context.router.goBack();
        return true;
      }

      return false;
    };
  }

  return class NavigatorRouter extends Component {

    static contextTypes = {
      router: React.PropTypes.object.isRequired,
    };

    static childContextTypes = {
      addBackButtonListener: React.PropTypes.func,
      removeBackButtonListener: React.PropTypes.func,
    };

    constructor() {
      super();
      this.isSynchronizingRoute = false;
      this.backHandlers = [];
      this.handleBackButton = this.handleBackButton.bind(this);
      this.handleRouteChange = this.handleRouteChange.bind(this);
      this.handleNavigatorDidFocus = this.handleNavigatorDidFocus.bind(this);
    }

    componentDidMount() {
      BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
      this.context.router.listen(this.handleRouteChange);
    }

    componentWillUnmount() {
      BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    shouldComponentUpdate() {
      return false;
    }

    getChildContext() {
      return {
        addBackButtonListener: this.addBackButtonListener.bind(this),
        removeBackButtonListener: this.removeBackButtonListener.bind(this),
      };
    }

    addBackButtonListener(listener) {
      this.backHandlers.push(listener);
    }

    removeBackButtonListener(listener) {
      this.backHandlers = this.backHandlers.filter((handler) => handler !== listener);
    }

    handleBackButton() {
      for (let i = this.backHandlers.length - 1; i >= 0; i--) {
        if (this.backHandlers[i]()) {
          return true;
        }
      }

      const { navigator } = this.refs;
      if (navigator) {
        return this.props.onBack.apply(this, [navigator.getCurrentRoutes().length]);
      }

      return false;
    }

    handleRouteChange(location) {
      // Skip change route when synchronize route from navigator.
      if (this.isSynchronizingRoute) return;

      const route = {
        location,
        query: location.query,
        component: this.props.children,
      };

      if (location.action === 'PUSH') {
        this.refs.navigator.push(route);
      } else if (location.action === 'POP') {
        const routes = this.refs.navigator.getCurrentRoutes().filter(
          route => (location.pathname === '/' && route.root)
          || (route.location && route.location.key === location.key)
        );
        this.refs.navigator.popToRoute(routes[0]);
      } else if (location.action === 'REPLACE') {
        this.refs.navigator.replace(route);
      }
    }

    handleNavigatorDidFocus(route) {
      const current = this.props.location;
      if ((route.root && current.pathname === '/')
        || (route.location && route.location.key === current.key)) return;
      this.isSynchronizingRoute = true;
      this.context.router.goBack();
      this.isSynchronizingRoute = false;
    }

    render() {
      return (
        <Navigator
          ref="navigator"
          style={[styles.container, style]}
          initialRoute={{ root: true }}
          configureScene={this.configureScene}
          renderScene={this.renderScene}
          onDidFocus={this.handleNavigatorDidFocus}
        />
      );
    }

    configureScene(route) {
      if (route.query) {
        if (route.query.anim === 'floatFromBottom') {
          return Platform.OS === 'android' ?
            Navigator.SceneConfigs.FloatFromBottomAndroid : Navigator.SceneConfigs.FloatFromBottom;
        }

        if (Platform.OS === 'ios' && route.query.anim === 'floatFromLeft') {
          return Navigator.SceneConfigs.FloatFromLeft;
        }

        if (Platform.OS === 'ios' && route.query.anim === 'floatFromRight') {
          return Navigator.SceneConfigs.FloatFromRight;
        }

        if (Platform.OS === 'ios' && route.query.anim === 'pushFromRight') {
          return Navigator.SceneConfigs.PushFromRight;
        }
      }

      return Platform.OS === 'android' ?
        Navigator.SceneConfigs.FloatFromBottomAndroid : Navigator.SceneConfigs.FloatFromRight;
    }

    renderScene(route) {
      if (route.component) {
        return React.cloneElement(route.component, {
          location: route.location,
          routeParams: route.routeParams,
        });
      }
      return <RootComponent />;
    }
  }
};
