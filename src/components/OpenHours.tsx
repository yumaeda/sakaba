/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'

interface Props {
    businessDayJson: string
    openHours: string
}

const OpenHours: React.FC<Props> = (props) => {
    const currentDay = ((new Date()).getDay() + 1) + ''
    console.log(currentDay)
    const { businessDayJson, openHours } = props

    let openHourText = openHours
    if (businessDayJson !== '{}') {
        const businessDayObj = JSON.parse(businessDayJson)
        if (businessDayJson.hasOwnProperty(currentDay)) {
            openHourText = `本日の営業時間：${businessDayObj[currentDay]}`
        } else {
            openHourText = '本日は定休日です。'
        }
    }

    return <div>{openHourText}</div>
}

export default OpenHours
