 import React, {Component} from 'react';
 import { Provider } from 'react-redux';
 import Logged from "../layouts/logged_layout.jsx";
 import store from "../store/index"


 class App extends Component{
     render (){
         return(
             <Provider store={store}>
                 <Logged />
             </Provider>
         );
     }
 }

 export default App;