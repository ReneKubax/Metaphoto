import React from 'react';
import styles from '../page.module.css';

/**
 * Renders a spinner component.
 *
 * @return {ReactElement} The spinner component.
 */
const Spinner: React.FC = () => (
  <div className={styles.spinnerContainer}>
    <div className={styles.spinner}></div>
  </div>
);

export default Spinner;

