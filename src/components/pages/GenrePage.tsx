/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
 import * as React from 'react'
 import Genre from '../../interfaces/Genre'
 import { Link } from 'react-router-dom'
 import Footer from '../Footer'
 
 const GenrePage: React.FC<{}> = () => {
     const [genres, setGenres] = React.useState<Genre[]>([])
     const [error, setError] = React.useState<Error>()
     const apiBasePath = 'https://api.tokyo-dinner.com'
 
     React.useEffect(() => {
         fetch(`${apiBasePath}/genres/`, {
             headers: {}
         })
         .then(res => res.json())
         .then(
             (data) => {
                 setGenres(JSON.parse(JSON.stringify(data.body)))
             },
             (error: Error) => {
                 setError(error)
             }
         )
     }, [])
 
     if (error) {
         return <div>Error: {error.message}</div>
     } else {
         return (
             <>
                 <header className="header">
                     <h1 className="header-label">酒場リンク：ジャンル一覧</h1>
                 </header>
                 <div className="contents">
                     <ul className="town-list">
                     { genres ? genres.map((genre: Genre) => (
                         <li className="town-item">
                             <span className="town-button">
                                 <Link className="list-item" to={`/${genre.id}/`}>{genre.name}</Link>
                             </span>
                         </li>)) :
                         <li>Loading...</li>
                     }
                     </ul>
                 </div>
                 <Footer />
             </>
         )
     }
 }
 
 export default GenrePage
 