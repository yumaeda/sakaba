import * as React from 'react'
import { Link } from 'react-router-dom'
 
const HomeAdminPage: React.FC = () => {
    return (
        <>
            <header className="admin-header">
                <h1 className="admin-header-title">{`管理者ページ`}</h1>
            </header>
            <div className="admin-contents">
                <ul>
                    <li><Link to="/admin/photo">写真を登録</Link></li>
                    <li><Link to="/admin/restaurant-genre">レストランのジャンルを登録</Link></li>
                    <li><Link to="/admin/restaurant">レストランを登録</Link></li>
                </ul>
            </div> 
        </>
    )
}

export default HomeAdminPage
