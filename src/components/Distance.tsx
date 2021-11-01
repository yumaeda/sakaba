/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Geolocation from '../interfaces/Geolocation'
import { getDistance } from '../utils/GeoLocationUtility'

interface Props {
    from: Geolocation
    to: Geolocation
}

const Distance: React.FC<Props> = (props) => {
    const { from, to } = props
    const distance = getDistance(from, to)

    return (
        <p className="distance">{ `${distance.toFixed(1)} km` }</p>
    )
}

export default Distance
