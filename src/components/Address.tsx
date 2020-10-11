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
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}>
                {text}
            </a>
        </div>
    )
}

export default Address
