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
    ) : (
        <div>
            <video controlsList="nodownload"
                   className="shop-video"
                   src="blob:https://www.youtube.com/6eab3134-16a9-4cf1-91f3-92a51cbdd189">
            </video>
        </div> 
    )
}

export default RestaurantVideoList
