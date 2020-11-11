import React from 'react';

// import { Container } from './styles';
import GlobalStyles from './styles/GlobalStyles';
import Layout from './components/Layout';
import Navbar from './components/Navbar';

const App = () => (
  <>
    <Layout>
      <Navbar />
    </Layout>

    <GlobalStyles />
  </>
);

export default App;
