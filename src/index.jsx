import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { hashHistory } from 'react-router'

// 创建 Redux 的 store 对象
// const store = configureStore()

import RouteMap from './router/routeMap'

// render(
//     <Provider store={store}>
//         <RouteMap history={hashHistory}/>
//     </Provider>,
//     document.getElementById('root')
// )


render(<RouteMap history={hashHistory}/>,
    document.getElementById('root'))