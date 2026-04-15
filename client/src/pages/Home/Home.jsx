import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {
    return (
        <main className={styles.container}>
            <img
                src="/assets/home/titulo.png"
                alt="Thiago's Dungeon"
                className={styles.title}
            />
            <div className={styles.gifContainer}>
                <img src="/assets/home/dungeonEntrance.gif" alt="Dungeon Entrance" />
            </div>

            <Link to="/register" className={styles.btnEnter}>
                Entrar na Dungeon
            </Link>
        </main>
    );
}
