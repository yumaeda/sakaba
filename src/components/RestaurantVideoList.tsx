/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Video from '../interfaces/Video'

interface Props {
    videos: Video[] | null
}

const RestaurantVideoList: React.FC<Props> = (props) => {
    const { videos } = props

    return videos ? (
        <div className="video-container">
        {
            videos?.map((video: Video) => <video src={video.url} controls={true} />)
        }
        </div>
    ) : <div></div> 
}

export default RestaurantVideoList
