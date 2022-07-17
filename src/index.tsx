import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { BaseOptionChartStyle } from 'components/chart/BaseOptionChart';
import { ScrollToTop } from 'components/Common';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import ThemeProvider from 'theme';
import App from './App';
import { store } from './app/store';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { history } from './utils';

// scroll bar
import 'simplebar/src/simplebar.css';

// nprogress
import 'nprogress/nprogress.css';

// React light box
import 'react-awesome-lightbox/build/style.css';

// React toast
import registerServiceWorker from 'components/registerServiceWorker';
import 'config/firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Swiper styles
import 'swiper/css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <App />
              <ScrollToTop />
              <BaseOptionChartStyle />

              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                style={{ width: '400px' }}
              />
            </LocalizationProvider>
          </ThemeProvider>
        </HistoryRouter>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

registerServiceWorker(toast);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
