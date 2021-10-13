/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'

interface Props {
    onCategoryClick: React.MouseEventHandler<HTMLSpanElement>
}

const CategorySwitch: React.FC<Props> = (props) => {
    const { onCategoryClick } = props

    return (
        <div className="category-switch">
            <span id="1" className="town-button" onClick={onCategoryClick}>Cocktail</span>
            <span id="2" className="town-button" onClick={onCategoryClick}>Whisky</span>
            <span id="3" className="town-button" onClick={onCategoryClick}>Brandy</span>
            <span id="4" className="town-button" onClick={onCategoryClick}>Original</span>
            <span id="5" className="town-button" onClick={onCategoryClick}>Beer</span>
            <span id="6" className="town-button" onClick={onCategoryClick}>Spirits</span>
        </div>
    )
}

export default CategorySwitch
