/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'

interface Props {
    id: string
    area: string
    url: string
    name: string
}

const RestaurantPageLink: React.FC<Props> = (props) => {
    const basePath = 'https://sakaba.link'
    const { id, area, name, url } = props

    return (url == '') ? 
        <a className="shop-name" href={`${basePath}/${area}/${id}`} target="_blank">{name}</a> :
        <a className="shop-name" href={url} rel="nofollow noopener" target="_blank">{name}</a>
}

export default RestaurantPageLink
