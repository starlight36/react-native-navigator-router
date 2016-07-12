# React Native Navigator Router

Integration React Native Navigator with React Router.

# Introduction

[React Native](http://facebook.github.io/react-native/) is a powerful tool to build iOS and Android Apps by writing JavaScript code only once. As React works on web pages, React Native also has the same problem to navigating from different pages. [React Router](https://github.com/reactjs/react-router) is a good solution to manage page and navigate by URL addresses. React Native has a component named Navigator to manage pages. But it only provided original interfaces so managing pages is a headache problem in developing apps. If we only use React Router without Navigator, we should invent some "wheels" to solve animations, page stacks problems. So integration React Native Navigator with React Router is a reasonable way to go.

# Installation

```shell
npm install react-native-navigator-router --save
```

# Usage

```js
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { createMemoryHistory, Router, IndexRoute, Route } from 'react-router';
import { createNavigatorRouter } from 'react-native-navigator-router';

class App extends Component {
  render() {
    return (
      <Router history={createMemoryHistory('/')}>
        <Route path='/' component={createNavigatorRouter()}>
          <IndexRoute component={Home} />
          <Route path="/about" component={About} />
          <Route path="/detail" component={Detail} />
        </Route>
      </Router>
    );
  }
}

AppRegistry.registerComponent('Example', () => App);
```

For complete code, see [Example](https://github.com/starlight36/react-native-navigator-router/tree/master/Example).

# Example

To run example project, you should run command as following lines:

```shell
cd Example
npm install
react-native run-ios
```

# API

This component only has one function. It's quite simple.

## createNavigatorRouter

```
createNavigatorRouter(onBack: (index) => boolean[, style: StyleSheet])
```

Use this function to create React Router root component, pass `onBack` argument to it if you are planing to handle back by your self. `style` argument will apply to Navigator component's style prop. Use it if you want to define your Navigator styles.

**Once you configured it, you can use URL to define your pages and navgating between them by simply push or back url. Enjoy it!**

# Limition

* Only `push`, `goBack` and `go` with negative index are fully support, `jump` havn't been tested yet, any other operations are not support.
* Need more testing and feedback.
* Not support persist/restore the page stack.

# Use with Redux

This component is compatible with Redux, you can use [React Router Redux](https://github.com/reactjs/react-router-redux) to integration them. No special configurations is needed, just following the documents.

# Showcase

The following Apps are using:

* Uxiaor - [iOS](https://itunes.apple.com/cn/app/you-xiao-er-zhao-you-zhao/id1116038326?mt=8) [Android](http://static.uxiaor.com/app/app.html)

# Feedback

If you any questions, use [Issues](https://github.com/starlight36/react-native-navigator-router/issues).

Sina Weibo: [@starlight36](http://weibo.com/starlight36)

# License

MIT Licence.




