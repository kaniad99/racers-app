'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import {client} from './client'
import App from './components/App'


window.client = client

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
