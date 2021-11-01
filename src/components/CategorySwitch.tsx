/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Category from '../interfaces/Category'

interface Props {
    categoryId: number
    onCategoryClick: React.MouseEventHandler<HTMLSpanElement>
    restaurantId: string
}

const CategorySwitch: React.FC<Props> = (props) => {
    const { categoryId, onCategoryClick, restaurantId } = props
    const [categories, setCategories] = React.useState<Category[]>([])

    React.useEffect(() => {
        fetch(`https://api.sakaba.link/categories?restaurant_id=${restaurantId}`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                setCategories(JSON.parse(data.body))
            },
            (error: Error) => {
                console.dir(error)
            }
        )
    }, [])

    return (
        <div className="category-switch">
        {
            categories?.filter((category: Category) => category.parent_id == null).map((category: Category) => (
                <div id={category.id.toString()} className={ (category.id == categoryId) ? 'category-button--selected' : 'category-button' } onClick={onCategoryClick}>{category.name}</div>
            ))
        }
        </div>
    )
}

export default CategorySwitch
