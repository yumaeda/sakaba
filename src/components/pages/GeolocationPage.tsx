/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { Navigate } from 'react-router-dom'
import { LATITUDE_KEY, LONGITUDE_KEY } from '../../constants/LocalStorageKeys'
import { getCurrentPosition, handleGeolocationError } from '../../utils/GeoLocationUtility'

const GeolocationPage: React.FC = () => {
  React.useEffect(() => {
      getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
      })
          .then((position: GeolocationPosition) => {
              localStorage.setItem(LATITUDE_KEY, position.coords.latitude.toString())
              localStorage.setItem(LONGITUDE_KEY, position.coords.longitude.toString())
          })
          .catch((error: GeolocationPositionError) => {
              handleGeolocationError(error)
          })
  }, [])

  return <Navigate to={'/'} />
}

export default GeolocationPage
