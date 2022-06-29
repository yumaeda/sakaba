import Geolocation from "../interfaces/Geolocation"

const EARTH_RADIUS_IN_KM = 6371.009

const convertToRadians = (value: number) : number => value * Math.PI / 180

const getCurrentPositionAsync = (): Promise<GeolocationPosition> => {
    return new Promise<GeolocationPosition>(
        (
            resolve: (position: GeolocationPosition) => void,
            reject: (positionError: GeolocationPositionError) => void
        ) => {
            if (!navigator.geolocation) {
                const error: GeolocationPositionError = {
                    code: 2,
                    message: 'geolocation not supported',
                    PERMISSION_DENIED: 1,
                    POSITION_UNAVAILABLE: 2,
                    TIMEOUT: 3
                }
                reject(error)
            }

            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => { resolve(position) },
                (positionError: GeolocationPositionError) => { reject(positionError) },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            )
      })
}

const getDistance = (lhs: Geolocation, rhs: Geolocation) : number => {
    const latitudeDiff = convertToRadians(rhs.latitude - lhs.latitude)
    const longitudeDeiff = convertToRadians(rhs.longitude - lhs.longitude)
    const lhsLatitude = convertToRadians(lhs.latitude)
    const rhsLatitude = convertToRadians(rhs.latitude)

    const squareHalfChordLength =
        Math.sin(latitudeDiff / 2) * Math.sin(latitudeDiff/2) +
        Math.sin(longitudeDeiff / 2) * Math.sin(longitudeDeiff / 2) * Math.cos(lhsLatitude) * Math.cos(rhsLatitude)
    const angularDistance = 2 * Math.atan2(Math.sqrt(squareHalfChordLength), Math.sqrt(1 - squareHalfChordLength))

    return EARTH_RADIUS_IN_KM * angularDistance
}

export { getCurrentPositionAsync, getDistance }
