/**
 * @fileoverview App component
 * 
 * Root component of the application.
 *
 * @module App
 * 
 * @author xturyt00
 */

import { Route, Routes } from "react-router-dom"

// components
import View from "./components/View/View"
import Menu from "./components/Menu/Menu"
import Header from "./components/Header/Header"
import Container from "./components/Container/Container"
import Main from "./components/Main/Main"

// pages
import Welcome from "./pages/Welcome/Welcome"
import Operators from "./pages/Operators/Operators"
import Accounts from "./pages/Accounts/Accounts"
import Users from "./pages/Users/Users"
import Servers from "./pages/Servers/Servers"
import OperatorsDetail from "./pages/OperatorsDetail/OperatorsDetail"
import AccountsDetail from "./pages/AccountDetail/AccountsDetail";
import DataFlowsDetails from "./pages/DataFlow/DataFlowsDetails"

const App = () => {

  return (
    <View>
      <Header />
      <Container>
        <Menu />
        <Main>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/operators" element={<Operators />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/users" element={<Users />} />
            <Route path="/servers" element={<Servers />} />
            <Route path="/operators/:operator" element={<OperatorsDetail />} />
            <Route path="/operators/:operator/accounts/:account" element={<AccountsDetail />} />
            <Route path="/dataflows" element={<DataFlowsDetails/>} />
          </Routes>
        </Main>
      </Container>
    </View>
  );
}

export default App;
