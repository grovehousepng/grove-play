import styles from './WireframeCube.module.css';

export default function WireframeCube() {
    return (
        <div className={styles.cubeContainer}>
            <div className={styles.cube}>
                <div className={`${styles.face} ${styles.front}`}></div>
                <div className={`${styles.face} ${styles.back}`}></div>
                <div className={`${styles.face} ${styles.right}`}></div>
                <div className={`${styles.face} ${styles.left}`}></div>
                <div className={`${styles.face} ${styles.top}`}></div>
                <div className={`${styles.face} ${styles.bottom}`}></div>
            </div>
        </div>
    );
}
