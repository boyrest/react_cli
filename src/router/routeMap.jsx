import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import App from '../containers';
import Login from '../containers/login';
import Register from '../containers/login/register';
import SuccessRegister from '../containers/login/successRegister';

// 如果是大型项目，router部分就需要做更加复杂的配置 参见
// https://github.com/reactjs/react-router/tree/master/examples/huge-apps

class RouterMap extends React.Component {
    render() {
        return (
            <Router history={this.props.history}>
                <Route path='/' component={App}>
                    <IndexRoute component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/successRegister' component={SuccessRegister}/>
                </Route>
            </Router>
        )
    }
}

export default RouterMap
