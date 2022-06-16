/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Genre from '../interfaces/Genre'

interface Props {
    genres: Genre[]
    genreId: number
    onSelect: React.ChangeEventHandler<HTMLSelectElement>
}

const GenreDropDown: React.VFC<Props> = props => {
    const { genreId, genres, onSelect} = props
    if (genres.length === 0) {
        return <></>
    }

    return (
        <select onChange={onSelect} value={genreId}>
        {
            genres ? genres.map((genre: Genre, index: number) => (
                <option value={genre.id} key={index}>{genre.name}</option>
            )) : ''
        }
        </select>
    )
}
 
export default GenreDropDown
 