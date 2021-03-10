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
    const { businessDayJson, openHours } = props

    let openHourText = openHours
    if (businessDayJson !== '{}') {
        const businessDayObj = JSON.parse(businessDayJson)
        console.dir(businessDayObj)
        if (businessDayObj.hasOwnProperty(currentDay)) {
            openHourText = `${businessDayObj[currentDay]}`
        } else {
            openHourText = '本日は定休日です。'
        }
    }

    return <div className="open-hour">{openHourText}</div>
}

export default OpenHours
