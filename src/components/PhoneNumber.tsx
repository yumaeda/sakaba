/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'

interface Props {
    tel: string
}

const PhoneNumber: React.FC<Props> = (props) => {
    const { tel } = props

    return (
        <>
            <a href={`tel:${tel}`}>
                <picture>
                    <source type="image/webp" media="(min-width: 150px)" srcSet="https://tokyo-takeout.com/images/tel.webp" />
                    <img src="https://tokyo-takeout.com/images/tel.png" className="tel-image" alt="Phone Number" />
                </picture>
            </a>
        </>
    )
}

export default PhoneNumber
