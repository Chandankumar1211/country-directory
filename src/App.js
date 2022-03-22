import React, { lazy, Suspense } from 'react';
import './App.css';
import { createTheme, MuiThemeProvider } from '@material-ui/core';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const SuspenseLoading = () => <>Loading...</>
function retry(fn, retriesLeft = 5, interval = 1000) {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            reject(error);
            return;
          }
          // Passing on "reject" is the important part
          retry(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
}

// Added lazy loading for loading the component
const Header = lazy(() => retry(() => import('./Component/Header')));
const GridBase = lazy(() => retry(() => import('./Component/GridBase')));
const CountryDetail = lazy(() => retry(() => import('./Component/CountryDetail')));
const DcodeNumber = lazy(() => retry(() => import('./Component/DcodeNumber')));

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#ff9100',
    },
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Suspense fallback={<SuspenseLoading />}>
        <Header />
        <div className='p-4'>
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/" exact element={<GridBase />} />
              <Route path="country/:countryName" exact element={<CountryDetail />} />
              <Route path="/dcodeNumber" exact element={<DcodeNumber />} />
            </Routes>
          </BrowserRouter>
        </div>
      </Suspense>
    </MuiThemeProvider>
  );
}

export default App;
