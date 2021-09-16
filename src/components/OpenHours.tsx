/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'

interface Props {
    businessDayJson: string
}

const OpenHours: React.FC<Props> = (props) => {
    const currentDay = ((new Date()).getDay() + 1) + ''
    const { businessDayJson } = props

    let openHourText = ''
    if (businessDayJson !== '{}') {
        const businessDayObj = JSON.parse(businessDayJson)
        if (businessDayObj.hasOwnProperty(currentDay)) {
            openHourText = `${businessDayObj[currentDay]['End']} まで営業`
        }
    }

    return <div className="open-hour">{openHourText}</div>
}

export default OpenHours
