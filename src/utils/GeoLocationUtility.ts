import Geolocation from "../interfaces/Geolocation"

const EARTH_RADIUS_IN_KM = 6371.009

const convertToRadians = (value: number) : number => value * Math.PI / 180

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

export { getDistance }
