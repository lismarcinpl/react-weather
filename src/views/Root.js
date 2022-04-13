import LocationsList from '../components/ogranisms/LocationsList/LocationsList';
import GlobalNavigation from 'components/ogranisms/GlobalNavigation/GlobalNavigation';
import LocationsProvider from 'components/providers/LocationsProvider';
import styles from './root.module.scss';

const Root = () => {
  return (
    <div className={styles.outer}>
      <LocationsProvider>
        <GlobalNavigation />
        <div className={styles.container}>
          <LocationsList />
        </div>
      </LocationsProvider>
    </div>
  );
};

export default Root;
