/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { Link } from 'react-router-dom'
import { getCookie } from '../../../utils/CookieUtility'
 
const RestaurantAdminPage: React.FC = () => {
    const [token, setToken] = React.useState<string>('')
    const [url, setUrl] = React.useState<string>('')
    const [name, setName] = React.useState<string>('')
    const [genre, setGenre] = React.useState<string>('')
    const [tel, setTel] = React.useState<string>('')
    const [address, setAddress] = React.useState<string>('')
    const [building, setBuilding] = React.useState<string>('')
    const [area, setArea] = React.useState<string>('')

    const businessDayString = '"Start":"1700","End":"2300"'
    const [sundayInfo, setSundayInfo] = React.useState<string>(businessDayString)
    const [mondayInfo, setMondayInfo] = React.useState<string>(businessDayString)
    const [tuesdayInfo, setTuesdayInfo] = React.useState<string>(businessDayString)
    const [wednesdayInfo, setWednesdayInfo] = React.useState<string>(businessDayString)
    const [thursdayInfo, setThursdayInfo] = React.useState<string>(businessDayString)
    const [fridayInfo, setFridayInfo] = React.useState<string>(businessDayString)
    const [saturdayInfo, setSaturdayInfo] = React.useState<string>(businessDayString)
 
    const generateBusinessDayInfo = () : string => {
        const businessDayInfos = []
        if (sundayInfo && sundayInfo.length > 0) {
            businessDayInfos.push(`"1": {${sundayInfo}}`)
        }
        if (mondayInfo && mondayInfo.length > 0) {
            businessDayInfos.push(`"2": {${mondayInfo}}`)
        }
        if (tuesdayInfo && tuesdayInfo.length > 0) {
            businessDayInfos.push(`"3": {${tuesdayInfo}}`)
        }
        if (wednesdayInfo && wednesdayInfo.length > 0) {
            businessDayInfos.push(`"4": {${wednesdayInfo}}`)
        }
        if (thursdayInfo && thursdayInfo.length > 0) {
            businessDayInfos.push(`"5": {${thursdayInfo}}`)
        }
        if (fridayInfo && fridayInfo.length > 0) {
            businessDayInfos.push(`"6": {${fridayInfo}}`)
        }
        if (saturdayInfo && saturdayInfo.length > 0) {
            businessDayInfos.push(`"7": {${saturdayInfo}}`)
        }

        return `{${businessDayInfos.join(',')}}`
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()

        setToken(getCookie('jwt'))
        if (token == '') {
            alert('Token is expired or invalid!')
            return
        }

        if (url === '' || name === '' || genre === '' && tel === '' || address === '' || area === '') {
            alert('Please fillout the required fields!')
            return
        }

        fetch(`https://msearch.gsi.go.jp/address-search/AddressSearch?q=${address}`, { headers: {} })
            .then(res => res.json())
            .then((data) => {
                const result = JSON.parse(JSON.stringify(data))
                const coordinates = result[0]['geometry']['coordinates']
                const latitude = coordinates[1]
                const longitude = coordinates[0]
                const restaurant = {
                    url,
                    name,
                    genre,
                    tel: tel.replace(/-/g, ''),
                    address: `${address} ${building}`,
                    area,
                    business_day_info: generateBusinessDayInfo(),
                    latitude: `${latitude}`,
                    longitude: `${longitude}`
                }
                const postOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(restaurant)
                }

                fetch('https://api.tokyo-dinner.com/auth/restaurant/', postOptions)
                    .then((res) => res.json())
                    .then((data) => {
                        alert(JSON.stringify(data))
                    })
            },
            (error: Error) => {
                console.dir(error)
            })
        }
 
        return (
            <>
                <header className="admin-header">
                    <h1 className="admin-header-title">{`管理者ページ`}</h1>
                    <Link to="/admin/index">Home</Link>
                </header>
                <div className="admin-contents">
                    <input className="admin-input" placeholder="URL" type="text" onChange={ (event: React.FormEvent<HTMLInputElement>) => setUrl(event.currentTarget.value) } /><br />
                    <input className="admin-input" placeholder="Name" type="text" onChange={ (event: React.FormEvent<HTMLInputElement>) => setName(event.currentTarget.value) } /><br />
                    <input className="admin-input" placeholder="Genre" type="text" onChange={ (event: React.FormEvent<HTMLInputElement>) => setGenre(event.currentTarget.value) } /><br />
                    <input className="admin-input" placeholder="Tel" type="text" onChange={ (event: React.FormEvent<HTMLInputElement>) => setTel(event.currentTarget.value) } /><br />
                    <input className="admin-input" placeholder="Address" type="text" onChange={ (event: React.FormEvent<HTMLInputElement>) => setAddress(event.currentTarget.value) } />
                    <input className="admin-input" placeholder="Building" type="text" onChange={ (event: React.FormEvent<HTMLInputElement>) => setBuilding(event.currentTarget.value) } /><br />
                    <input className="admin-input" placeholder="Area" type="text" onChange={ (event: React.FormEvent<HTMLInputElement>) => setArea(event.currentTarget.value) } /><br />
                    <h2>Business Day Info</h2>
                    <span>Sun:&nbsp;</span><input type="text" onChange={ (event: React.FormEvent<HTMLInputElement>) => setSundayInfo(event.currentTarget.value) } defaultValue={sundayInfo} /><br />
                    <span>Mon:&nbsp;</span><input type="text" onChange={ (event: React.FormEvent<HTMLInputElement>) => setMondayInfo(event.currentTarget.value) } defaultValue={mondayInfo} /><br />
                    <span>Tue:&nbsp;</span><input type="text" onChange={ (event: React.FormEvent<HTMLInputElement>) => setTuesdayInfo(event.currentTarget.value) } defaultValue={tuesdayInfo} /><br />
                    <span>Wed:&nbsp;</span><input type="text" onChange={ (event: React.FormEvent<HTMLInputElement>) => setWednesdayInfo(event.currentTarget.value) } defaultValue={wednesdayInfo} /><br />
                    <span>Thu:&nbsp;</span><input type="text" onChange={ (event: React.FormEvent<HTMLInputElement>) => setThursdayInfo(event.currentTarget.value) } defaultValue={thursdayInfo} /><br />
                    <span>Fri:&nbsp;</span><input type="text" onChange={ (event: React.FormEvent<HTMLInputElement>) => setFridayInfo(event.currentTarget.value) } defaultValue={fridayInfo} /><br />
                    <span>Sat:&nbsp;</span><input type="text" onChange={ (event: React.FormEvent<HTMLInputElement>) => setSaturdayInfo(event.currentTarget.value) } defaultValue={saturdayInfo} /><br />
                    <div>
                        <button className="admin-button" onClick={handleSubmit}>Create</button>
                    </div>
                </div>
            </>
     )
 }
 
 export default RestaurantAdminPage
