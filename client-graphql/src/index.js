/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();*/

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo' 

const client = new ApolloClient({
  link: new HttpLink({ uri: '/api' }),
  cache: new InMemoryCache()
})

ReactDOM.render(
<ApolloProvider client={client}>
  <App />
</ApolloProvider>, document.getElementById('root'))
registerServiceWorker()
