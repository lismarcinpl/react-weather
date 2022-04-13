import React, { createContext, useState } from 'react';
// import PropTypes from 'prop-types';
import { locations as locationsData } from 'data/locations';
import { getUniqueListBy, sanitizeText } from '../../utils/Utils';

export const LocationsContext = createContext({
  locations: [],
  addLocation: () => {},
  deleteLocation: () => {},
});

const LocationsProvider = ({ children }) => {
  const [locations, setLocations] = useState(
    locationsData.map((item) => {
      return {
        name: item.name,
        slug: (item.slug = sanitizeText(item.slug)),
      };
    })
  );

  const addLocation = (formValues) => {
    const newLocations = [
      {
        name: formValues.name,
        slug: sanitizeText(formValues.name),
      },
      ...locations,
    ];

    const filteredLocations = getUniqueListBy(newLocations, 'slug');
    setLocations(filteredLocations);
  };

  const deleteLocation = (slug) => {
    const filteredLocations = locations.filter((location) => location.slug !== slug);
    setLocations(filteredLocations);
  };

  return (
    <LocationsContext.Provider
      value={{
        locations,
        addLocation,
        deleteLocation,
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
};

LocationsProvider.propTypes = {};

export default LocationsProvider;
