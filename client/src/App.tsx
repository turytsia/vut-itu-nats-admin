import { Route, Routes } from "react-router-dom"

import View from "./components/View/View"
import Menu from "./components/Menu/Menu"
import Header from "./components/Header/Header"
import Container from "./components/Container/Container"
import Main from "./components/Main/Main"

//pages
import Welcome from "./pages/Welcome/Welcome"
import Operators from "./pages/Operators/Operators"
import Accounts from "./pages/Accounts/Accounts"
import Users from "./pages/Users/Users"
import Servers from "./pages/Servers/Servers"

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
          </Routes>
        </Main>
      </Container>
    </View>
  );
}

export default App;
