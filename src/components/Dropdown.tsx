/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Item from '../interfaces/Item'

interface Props {
    items: Item[]
    itemId: number
    onSelect: React.ChangeEventHandler<HTMLSelectElement>
}

const Dropdown: React.FC<Props> = (props: Props) => {
    const { itemId, items, onSelect} = props
    if (items.length === 0) {
        return <></>
    }

    return (
        <select onChange={onSelect} value={itemId}>
        {
            items ? items.map((item: Item, index: number) => (
                <option value={item.id} key={index}>{item.name}</option>
            )) : ''
        }
        </select>
    )
}
 
export default Dropdown
 