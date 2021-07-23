import React, {lazy, Suspense} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const HomeScreen = lazy(() => import('./screens/home/home.screen'));
const ProductScreen = lazy(() => import('./screens/product/product.screen'));
const CategoryScreen = lazy(() => import('./screens/category/category.screen'));

const App = () => {
    return (
        <Suspense fallback={
            <>
                <h1>Yükleniyor...</h1>
            </>
        }>
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={HomeScreen}/>
                    <Route path="/product" component={ProductScreen}/>
                    <Route path="/category" component={CategoryScreen}/>
                </Switch>
            </BrowserRouter>
        </Suspense>
    );
};

export default App;
