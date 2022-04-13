// import PropTypes from 'prop-types';

import LocationsListItem from '../../molecules/LocationsListItem/LocationsListItem';
import { useContext, useState } from 'react';
import { LocationsContext } from '../../providers/LocationsProvider';

import styles from './LocationsList.module.scss';
import itemStyles from '../../molecules/LocationsListItem/LocationsListItem.module.scss';

const initialFormState = {
  name: '',
};

const LocationsList = () => {
  const { locations } = useContext(LocationsContext);
  const [formValues, setFormValues] = useState(initialFormState);
  const { addLocation } = useContext(LocationsContext);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitCity = (e) => {
    e.preventDefault();
    addLocation(formValues);
    setFormValues(initialFormState);
  };

  console.log(locations);

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmitCity}>
          <div className={styles.formWrapper}>
            <input
              className={styles.formInput}
              name={'name'}
              value={formValues.name}
              onChange={handleInputChange}
              placeholder={'Enter a city name, eg. San Francisco'}
              type="text"
            />
            <button className={styles.formBtn} type="submit" disabled={!formValues.name}>
              Add city
            </button>
          </div>
        </form>
        <h2 className={styles.heading}>My cities</h2>
        <ul className={styles.list}>
          {locations?.length ? (
            locations.map((locationData) => <LocationsListItem key={locationData.slug} location={locationData} />)
          ) : (
            <li className={`${itemStyles.container} ${itemStyles['status-error']}`}>The list is empty, add a city.</li>
          )}
        </ul>
      </div>
    </>
  );
};

LocationsList.propTypes = {};

export default LocationsList;
