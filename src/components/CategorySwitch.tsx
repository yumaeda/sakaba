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
            <div id="1" className="category-button" onClick={onCategoryClick}>Cocktail</div>
            <div id="2" className="category-button" onClick={onCategoryClick}>Whisky</div>
            <div id="3" className="category-button" onClick={onCategoryClick}>Brandy</div>
            <div id="4" className="category-button" onClick={onCategoryClick}>Original</div>
            <div id="5" className="category-button" onClick={onCategoryClick}>Beer</div>
            <div id="6" className="category-button" onClick={onCategoryClick}>Spirits</div>
            <div id="7" className="category-button" onClick={onCategoryClick}>Wine</div>
            <div id="8" className="category-button" onClick={onCategoryClick}>Food</div>
            <div id="9" className="category-button" onClick={onCategoryClick}>Others</div>
        </div>
    )
}

export default CategorySwitch
