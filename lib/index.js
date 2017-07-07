/**
 * Created by chkui on 2017/7/7.
 */

import React from 'react'
import cnTool from 'classnames/bind'
import Gear from './lib/gear'
import styles from './RAreas.scss'
import areaData from './areaData'
const cn = cnTool.bind(styles)

class RAreas extends React.Component {
    constructor(...props) {
        super(...props)
    }

    render() {
        return (
            <div className={cn("area_ctrl", "slideInUp")}>
                <div className={cn("area_btn_box")}>
                    <div className={cn("area_btn", "larea_cancel")}>取消</div>
                    <div className={cn("area_btn", "larea_finish")}>确定</div>
                </div>
                <div className={cn("area_roll_mask")}>
                    <div className={cn("area_roll")}>
                        <Gear list={areaData} />
                    </div>
                </div>
            </div>
        )
    }
}

export default RAreas
