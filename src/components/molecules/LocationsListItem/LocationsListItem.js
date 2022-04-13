// import PropTypes from 'prop-types';
import { useEffect, useState, useContext } from 'react';
import { LocationsContext } from 'components/providers/LocationsProvider';
import DeleteButton from 'components/atoms/DeleteButton/DeleteButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './LocationsListItem.module.scss';
import 'swiper/css';

const LocationsListItem = ({ location }) => {
  const [weather, setWeather] = useState({});
  const [status, setStatus] = useState('loading');

  const { deleteLocation } = useContext(LocationsContext);

  useEffect(() => {
    fetch('https://weatherdbi.herokuapp.com/data/weather/' + location.slug)
      .then((response) => {
        if (!response.ok) {
          setStatus('error');
        }
        return response.json();
      })
      .then((data) => {
        setWeather({
          region: data.region,
          currentIcon: data.currentConditions['iconURL'],
          currentInfo: [
            ['Current weather', data.currentConditions.comment],
            ['Time', data.currentConditions.dayhour],
            ['Humidity', data.currentConditions.humidity],
            ['Precip', data.currentConditions.precip],
            ['Temperature', data.currentConditions.temp.c + '°C'],
            ['Wind', data.currentConditions.wind.km + 'km/h'],
          ],
          next_days: data.next_days,
        });
        setStatus('success');
      })
      .catch((error) => {
        setStatus('error');
      });
  }, []); //eslint-disable-line

  return (
    <li className={`${styles.container} ${styles['status-' + status]}`}>
      {status === 'loading' ? (
        <>
          <div>
            <svg className={styles.loadingIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M24 12C24 14.3734 23.2962 16.6935 21.9776 18.6668C20.6591 20.6402 18.7849 22.1783 16.5922 23.0866C14.3995 23.9948 11.9867 24.2324 9.65892 23.7694C7.33114 23.3064 5.19295 22.1635 3.51472 20.4853C1.83649 18.8071 0.693599 16.6689 0.230577 14.3411C-0.232446 12.0133 0.00519403 9.60051 0.913446 7.4078C1.8217 5.21509 3.35977 3.34094 5.33316 2.02236C7.30655 0.703788 9.62662 -2.83022e-08 12 0L12 3C10.22 3 8.47991 3.52784 6.99987 4.51677C5.51983 5.50571 4.36627 6.91131 3.68508 8.55585C3.0039 10.2004 2.82567 12.01 3.17293 13.7558C3.5202 15.5016 4.37737 17.1053 5.63604 18.364C6.89471 19.6226 8.49836 20.4798 10.2442 20.8271C11.99 21.1743 13.7996 20.9961 15.4442 20.3149C17.0887 19.6337 18.4943 18.4802 19.4832 17.0001C20.4722 15.5201 21 13.78 21 12H24Z"
                fill="currentColor"
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="0 12 12"
                  to="360 12 12"
                  dur="1.25s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
        </>
      ) : status === 'success' ? (
        <>
          <header className={styles.header}>
            <img className={styles.weatherIcon} src={weather.currentIcon} alt="" />
            <h3 className={styles.heading}>{weather.region}</h3>
            <DeleteButton onClick={() => deleteLocation(location.slug)} />
          </header>
          <ul className={styles.listCurrent}>
            {weather.currentInfo.map((item) => (
              <li className={styles.listCurrentItem}>
                <div className={styles.listCurrentItemLabel}>{item[0]}</div>
                <div className={styles.listCurrentItemValue}>{item[1]}</div>
              </li>
            ))}
          </ul>
          {weather.next_days?.length ? (
            <div className={styles.nextDays}>
              <Swiper
                spaceBetween={0}
                slidesPerView={3.5}
                breakpoints={{
                  450: {
                    slidesPerView: 4.5,
                  },
                  550: {
                    slidesPerView: 5.5,
                  },
                  650: {
                    slidesPerView: 6.5,
                  },
                }}
              >
                {weather.next_days.map((day) => (
                  <SwiperSlide>
                    <div className={styles.nextDayWrapper}>
                      <div className={styles.nextDayName}>{day.day}</div>
                      <div className={styles.nextDayCurrentWeather}>{day.comment}</div>
                      <img className={styles.nextDayWeatherIcon} src={day.iconURL} alt="" />
                      <div className={styles.nextDayTemp}>
                        <span>{day.max_temp.c + '°'}</span>
                        <span>{day.min_temp.c + '°'}</span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : null}
        </>
      ) : (
        <>
          <header className={styles.header}>
            <div className={styles.messageError}>Something didn't show... Error with query "{location.name}"</div>
            <DeleteButton onClick={() => deleteLocation(location.slug)} />
          </header>
        </>
      )}
    </li>
  );
};

export default LocationsListItem;
