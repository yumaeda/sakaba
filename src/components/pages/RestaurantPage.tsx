/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Category from '../../interfaces/Category'
import Menu from '../../interfaces/Menu'
import MenuList from '../MenuList'
import CategorySwitch from '../CategorySwitch'

const RestaurantPage: React.FC<{ match: any }> = (props) => {
    const { match } = props
    const defaultCategory = { id: 0, name: ''}
    const [error, setError] = React.useState<Error>()
    const [category, setCategory] = React.useState<Category>(defaultCategory)
    const [categories, setCategories] = React.useState<Category[]>([])
    const [menus, setMenus] = React.useState<Menu[]>([])
    const apiUrl = 'https://api.sakaba.link'

    const handleCategoryClick = (event: React.MouseEvent<HTMLSpanElement>) => {
        const selectedCategoryId = Number(event.currentTarget.id)
        setCategory(categories.find((currentCategory: Category) => currentCategory.id == selectedCategoryId) ?? defaultCategory)
    }

    React.useEffect(() => {
        fetch(`${apiUrl}/categories?restaurant_id=${match.params.restaurant}`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                const tmpCategories = JSON.parse(data.body)
                setCategory(tmpCategories[0])
                setCategories(tmpCategories)
            },
            (error: Error) => {
                setError(error)
            }
        )

        fetch(`${apiUrl}/menus?restaurant_id=${match.params.restaurant}`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                setMenus(JSON.parse(data.body))
            },
            (error: Error) => {
                setError(error)
            }
        )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        const baseImagePath = 'https://tokyo-takeout.com'
        const imageDir = `${baseImagePath}/images`

        return (
            <>
                <header className="menu-header"
                        style={{ backgroundImage: `url(${imageDir}/menu-headers/${match.params.restaurant}.png)`}}>
                    <CategorySwitch categoryId={ category.id } onCategoryClick={ handleCategoryClick } restaurantId={match.params.restaurant} />
                </header>
                <div className="contents">
                {
                    <>
                        <h2 className="menu-category">{category.name}</h2>
                        <div>
                        {
                            (categories.filter((currentCategory: Category) => currentCategory.parent_id == category.id).length == 0) ? (
                                <MenuList menus={menus.filter((menu: Menu) => menu.category == category.id && menu.sub_category == 0 && menu.region == 0)} />
                            ) : (
                                <>
                                {
                                    categories.filter((currentCategory: Category) => currentCategory.parent_id == category.id).map((subCategory: Category) => {
                                        const regions = categories.filter((currentCategory: Category) => currentCategory.parent_id == subCategory.id)
                                        return (menus.filter((menu: Menu) => menu.category == category.id && menu.sub_category == subCategory.id).length > 0) ? (
                                            <>
                                                <h4 className="menu-sub-category">{subCategory.name}</h4>
                                                <div>
                                                {
                                                    (regions.length == 0) ? (
                                                        <MenuList menus={menus.filter((menu: Menu) => menu.category == category.id && menu.sub_category == subCategory.id && menu.region == 0)} />
                                                    ) : (
                                                        <div>
                                                        {
                                                            regions.map((region: Category) => {
                                                                return (menus.filter((menu: Menu) => menu.category == category.id && menu.sub_category == subCategory.id && menu.region == region.id).length > 0) ? (
                                                                <>
                                                                    <h6 className="menu-region">{region.name}</h6>
                                                                    <div>
                                                                        <MenuList menus={menus.filter((menu: Menu) => menu.category == category.id && menu.sub_category == subCategory.id && menu.region == region.id)} />
                                                                    </div>
                                                                </>
                                                                ) : ''
                                                            })
                                                        }
                                                        </div>
                                                    )
                                                }
                                                </div>
                                            </>
                                        ) : ''
                                    })
                                }
                                </>
                            )
                        }
                        </div>
                    </>
                }
                </div>
            </>
        )
    }
}

export default RestaurantPage
