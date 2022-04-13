// import PropTypes from 'prop-types';

import styles from './GlobalNavigation.module.scss';

import logo from 'assets/logo.svg';

const GlobalNavigation = () => {
  return (
    <header className={styles.header}>
      <figure className={styles.logo}>
        <img src={logo} alt="" />
      </figure>
    </header>
  );
};

GlobalNavigation.propTypes = {};

export default GlobalNavigation;
