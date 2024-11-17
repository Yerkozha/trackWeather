import React, { useCallback, useEffect } from "react";
import { Appearance } from "react-native"

import AppNavigators from '@/presentation/container/MainContainer';

import { Provider } from 'react-redux';
import { persistor, store } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';

import ErrorBoundary from '@/services/ErrorBoundary.tsx';

import { Base } from '@/api';
import { RequestEngine, ResponseEngine } from '@/api/interceptors';
import { get, save } from "@/services/AsyncStorage";
import { Loader } from "@/services/Loader";



function App(): React.JSX.Element {

  
  const initialize = useCallback(async () => {

    save('access', '64ef61275fd44a9be3f93faba963c4b4')
    
    const theme = await get('theme')

    if( theme ) Appearance.setColorScheme(theme)

  }, [])
  
  useEffect(() => {

    initialize()
    Base.getInstance().attachInterceptorEngine(new RequestEngine()).attachInterceptorEngine(new ResponseEngine())

    return () => {
      
    }
  }, []);

  return (
      <>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
              <ErrorBoundary>
                <AppNavigators />
                <Loader />
              </ErrorBoundary>
          </PersistGate>
        </Provider>
      </>
  )
}

export default App;

