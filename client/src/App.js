import * as React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { KeToanRouter, TuVanVienRouter, privateRoutes, publicRoutes, staffRouter } from "./routes/routes";
import "~/assets/GlobalStyle.scss"
import { useToken } from "./store";
import HomePage from "./pages/user/HomePage";
import LayoutUser from "./layouts/UserLayout/UserLayout";

function App() {
  const {token, setToken} = useToken()
  return (
    <>
    <div className="wrapper">
      <Router>
      <Routes>
        {
          !token ? 
          publicRoutes.map((route, index) => {
            let Layout = route.layout
            return (
              <Route key={index} path={route.path} element={
                <Layout>
                  <route.component />
                </Layout>
              } />
            )
          })
          : token && token.account.quyen == 1 ?
            privateRoutes.map((route, index) => {
            let Layout = route.layout
            return (
              <Route key={index} path={'/admin' + route.path} element={
                <Layout>
                  <route.component />
                </Layout>
  
              } />
            )
          })
          : token && token.account.quyen == 2 && token.chuc_vu._id == 'LS02' ?
            staffRouter.map((route, index) => {
            let Layout = route.layout
            return (
              <Route key={index} path={'/staff' + route.path} element={
                <Layout>
                  <route.component />
                </Layout>

              } />
            )
          })
          : token && token.account.quyen == 2 && token.chuc_vu._id == 'TVV02' ?
          TuVanVienRouter.map((route, index) => {
            let Layout = route.layout
            return (
              <Route key={index} path={'/tu-van-vien' + route.path} element={
                <Layout>
                  <route.component />
                </Layout>

              } />
            )
          })
          : token && token.account.quyen == 2 && token.chuc_vu._id == 'KT02' ?
          KeToanRouter.map((route, index) => {
            let Layout = route.layout
            return (
              <Route key={index} path={'/ke-toan' + route.path} element={
                <Layout>
                  <route.component />
                </Layout>

              } />
            )
          })
          :
          <Route  path='/' element={
            <LayoutUser>
              <HomePage/>
            </LayoutUser>

        } />
        }
      </Routes>
      
    </Router>

    </div>
    </>
    
    
  );
}
export default App;