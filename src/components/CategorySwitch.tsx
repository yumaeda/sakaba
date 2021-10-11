/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'

const CategorySwitch: React.FC = () => {
    return (
        <div className="category-switch">
            <span className="town-button">
                <a href="#cocktail" className="list-item">Cocktail</a>
            </span>
            <span className="town-button">
                <a href="#whisky" className="list-item">Whisky</a>
            </span>
            <span className="town-button">
                <a href="#original" className="list-item">Original</a>
            </span>
            <span className="town-button">
                <a href="#beer" className="list-item">Beer</a>
            </span>
            <span className="town-button">
                <a href="#spirits" className="list-item">Spirits</a>
            </span>
        </div>
    )
}

export default CategorySwitch
