import {useState, useEffect} from 'react';
import CartPage from './pages/CartPage';

import Header from './components/Header';
import BurgerItem from './components/BurgerItem';

import './App.css';

//componentDidMount componentDidUpdate componentWillUnmount
function App() {
    const [burgers, setBurgers] = useState([]);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch('https://my-burger-api.herokuapp.com/burgers').then(res => {
            return res.json();
        }).then(data => {
            setBurgers(data);
            setLoading(false);
        })
    }, []);

    const addBurger = (burger) => {
        const tempCart = [...cart];
        const tempIndex = cart.findIndex(item => item.id === burger.id);

        if( tempIndex !== -1) {
            tempCart[tempIndex].count += 1;

            setCart(tempCart);
        } else {
            setCart([...cart, {...burger, count: 1}]);
        }
    }

    const deleteBurger = (id) => {
        setCart(cart.filter(item => item.id !== id));
    }

    const decreaseBurgerCount = (burger_id) => {
        const tempCart = [...cart];
        const tempIndex = tempCart.findIndex(item => item.id === burger_id);

        if(tempCart[tempIndex].count !== 1) {
            tempCart[tempIndex].count -= 1;

            setCart(tempCart);
        }
    }

    const increaseBurgerCount = (burger_id) => {
        const tempCart = [...cart];
        const tempIndex = tempCart.findIndex(item => item.id === burger_id);

        if(tempCart[tempIndex].count !== 50) {
            tempCart[tempIndex].count += 1;

            setCart(tempCart);
        }
    }

    const showCartPage = (show) => {
        setShowCart(show);
    }

    return(
        <div>
            <Header
                count={cart.length}
                showCartPage={showCartPage}
            />
            {
                showCart
                    ?
                    <CartPage
                        burgers={cart}
                        deleteBurger={deleteBurger}
                        decreaseBurgerCount={decreaseBurgerCount}
                        increaseBurgerCount={increaseBurgerCount}
                    />
                    :
                    loading ?
                        <div>Loading burgers...</div>
                        :
                        burgers.map(burger => {
                            return(
                                <BurgerItem
                                    key={burger.id}
                                    burger={burger}
                                    addNewBurger={addBurger}
                                />
                            )
                        })
            }
        </div>
    )
}

export default App;
