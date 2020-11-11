/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'

interface Props {
    text: string
    latitude: string
    longitude: string
}

const Address: React.FC<Props> = (props) => {
    const { text, latitude, longitude } = props

    return (
        <div className="restaurant-adress">
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`} target="_blank" title={text}>
                <picture>
                    <source type="image/webp" media="(min-width: 150px)" srcSet="https://tokyo-takeout.com/images/map.webp" />
                    <img src="https://tokyo-takeout.com/images/map.png" className="map-image" alt="Google Map" />
                </picture>
            </a>
        </div>
    )
}

export default Address
