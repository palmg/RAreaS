/**
 * Created by chkui on 2017/7/7.
 */

import React from 'react'
import cnTool from 'classnames/bind'
import Gear from './select'
import styles from './areas.scss'
import areaData from './areaData'
import AreaGear from './areaGear'
const cn = cnTool.bind(styles)

/**
 * 移动端——三级区域选择。
 * @param {array} list 传入的区域列表.结构为：
 * [{
 *    name:'',省
 *    id:'',
 *    child:[{
 *      id:'',
 *      name:'',市
 *      child:[{
 *          区
 *      }]
 *    }]
 * }]
 * @param {function} onCancel (e)=>{} 取消按钮事件
 * @param {function} onCommit (data,e)=>{}确定按钮事件，data的结构为:
 * {
 *    province: {id: name:}
 *    city: {id: name:}
 *    area: {id: name:}
 * }
 */
class Areas extends React.Component {
    constructor(...props) {
        super(...props)
        this.submitHandle = this.submitHandle.bind(this)
    }

    submitHandle(e) {
        const { onCommit } = this.props
        let { data, data: { province, city, area } } = this.gear
        if (onCommit) {
            delete data.province.child
            delete data.city.child
            onCommit(data, province.name + city.name + area.name)
        }
    }

    render() {
        return (
            <div className={cn("area_ctrl", "slideInUp")}>
                <div className={cn("area_btn_box")}>
                    <div className={cn("area_btn", "larea_cancel")} onClick={this.props.onCancel}>取消</div>
                    <div className={cn("area_btn", "larea_finish")} onClick={this.submitHandle}>确定</div>
                </div>
                <AreaGear ref={ref => this.gear = ref} list={areaData} />
            </div>
        )
    }
}

export default Areas
