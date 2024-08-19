import * as React from 'react'
import { Link } from 'react-router-dom'
import { USER_NAME_KEY } from '../../../constants/LocalStorageKeys'
import RootAdminContents from './RootAdminContents'
 
const HomeAdminPage: React.FC = () => {
    const userId = localStorage.getItem(USER_NAME_KEY) || ''
    return (userId !== 'yumaeda') ? (
        <>
            <header className="admin-header">
                <h1 className="admin-header-title">{`管理者ページ`}</h1>
            </header>
            <div className="admin-contents">
                <ul>
                    <li><Link to="/admin/menu">メニューを管理</Link></li>
                </ul>
            </div>
        </>
    ) : (
        <>
            <header className="admin-header">
                <h1 className="admin-header-title">{`管理者ページ`}</h1>
            </header>
            <RootAdminContents />
        </>
    )
}

export default HomeAdminPage
