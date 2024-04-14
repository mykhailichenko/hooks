import burger_image from '../../assets/burger-4.png';
import styles from  './burgeri-item.module.css';

export default function BurgerItem({burger, addNewBurger}) {
        return(
            <div className={styles.wrapper}>
                <div className={styles.burger_image}>
                    <img width={170} src={burger_image} alt='Burger'/>
                </div>

                <div className={styles.burger_title}>
                    {burger.name}
                </div>

                <div className={styles.burger_body}>
                    {burger.description}
                </div>

                <div className={styles.burger_add}
                    onClick={() => {
                        addNewBurger(burger);
                    }}
                >
                    Add to Cart
                </div>
            </div>
        )
    }
