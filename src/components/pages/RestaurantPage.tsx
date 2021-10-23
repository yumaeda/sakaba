/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Category from '../../interfaces/Category'
import Menu from '../../interfaces/Menu'
import CategoryList from '../CategoryList'
import CategorySwitch from '../CategorySwitch'

const RestaurantPage: React.FC<{ match: any }> = (props) => {
    const { match } = props
    const [error, setError] = React.useState<Error>()
    const [category, setCategory] = React.useState<number>(1)
    const [categories, setCategories] = React.useState<Category[]>([])
    const [menus, setMenus] = React.useState<Menu[]>([])
    const [selectedMenus, setSelectedMenus] = React.useState<Menu[]>([])
    const apiUrl = 'https://api.sakaba.link'

    const handleCategoryClick = (event: React.MouseEvent<HTMLSpanElement>) => {
        const selectedCategory = Number(event.currentTarget.id)
        setCategory(selectedCategory)
        setSelectedMenus(menus.filter((menu: Menu) => menu.category == selectedCategory))
    }

    React.useEffect(() => {
        fetch(`${apiUrl}/categories?restaurant_id=${match.params.restaurant}`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                setCategories(JSON.parse(data.body))
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
                const parsedMenu = JSON.parse(data.body)
                setSelectedMenus(parsedMenu.filter((menu: Menu) => menu.category == category))
                setMenus(parsedMenu)
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
                    <CategorySwitch onCategoryClick={ handleCategoryClick } />
                </header>
                <div className="contents">
                {
                    categories.filter((currentCategory: Category) => currentCategory.id == category).map((selectedCategory: Category) => {
                        const subCategories = categories.filter((currentCategory: Category) => currentCategory.parent_id == category)
                        return (
                            <div>
                                <h2 className="menu-category">{selectedCategory.name}</h2>
                                <div>
                                {
                                    (subCategories.length == 0) ? (
                                        <CategoryList menus={selectedMenus} subCategory={0} region={0} />
                                    ) : (
                                        <>
                                        {
                                            subCategories.map((subCategory: Category) => {
                                                const regions = categories.filter((currentCategory: Category) => currentCategory.parent_id == subCategory.id)
                                                return (
                                                    <>
                                                        <h4 className="menu-sub-category">{subCategory.name}</h4>
                                                        <div>
                                                        {
                                                            (regions.length == 0) ? (
                                                                <CategoryList menus={selectedMenus} subCategory={subCategory.id} region={0} />
                                                            ) : (
                                                                <div>
                                                                {
                                                                    regions.map((region: Category) => (
                                                                        <>
                                                                            <h6 className="menu-region">{region.name}</h6>
                                                                            <div>
                                                                                <CategoryList menus={selectedMenus} subCategory={subCategory.id} region={region.id} />
                                                                            </div>
                                                                        </>
                                                                    ))
                                                                }
                                                                </div>
                                                            )
                                                        }
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }
                                        </>
                                    )
                                }
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </>
        )
    }
}

export default RestaurantPage
