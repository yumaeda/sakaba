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
    console.dir(videos)

    return (
        <div className="video-container">
            <iframe width="560"
                    height="315"
                    src="https://www.youtube.com/embed/9i8agfKPFHo"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
        </div> 
    )
}

export default RestaurantVideoList
