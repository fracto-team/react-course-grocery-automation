import React, {lazy, Suspense} from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';

const HomeScreen = lazy(() => import('./screens/home/home.screen'));
const ProductScreen = lazy(() => import('./screens/product/product.screen'));
const CategoryScreen = lazy(() => import('./screens/category/category.screen'));

const App = () => {
    return (
        <div>
            <Suspense fallback={
                <>
                    <h1>Yükleniyor...</h1>
                </>
            }>
                <BrowserRouter>
                    <ul>
                        <li>
                            <Link to="/">Anasayfa</Link>
                        </li>
                        <li>
                            <Link to="/product">Ürünler</Link>
                        </li>
                        <li>
                            <Link to="/category">Kategoriler</Link>
                        </li>
                    </ul>
                    <Switch>
                        <Route exact={true} path="/" component={HomeScreen}/>
                        <Route path="/product" component={ProductScreen}/>
                        <Route path="/category" component={CategoryScreen}/>
                    </Switch>
                </BrowserRouter>
            </Suspense>
        </div>
    );
};

export default App;
