/**
 * Created by chkui on 2017/7/10.
 */

import React from 'react'
import cnTool from 'classnames/bind'
import Select from './select'
import styles from './areaGear.scss'
const cn = cnTool.bind(styles)

/**
 * 移动端——三级区域选择。
 * @param {array} list 传入的区域列表。结构分为省市区三级：
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
 * 可以通过ref的this.data获取数据，结构为：
 * {
 *    province: {id: name:}
 *    city: {id: name:}
 *    area: {id: name:}
 * }
 */
class areaGear extends React.Component {
    constructor(...props) {
        super(...props)
        const provinceList = this.props.list,
            province = provinceList[0],
            cityList = province.child || [{id: 'noneCity', name: ''}],
            city = cityList[0],
            areaList = city.child || [{id: 'noneArea', name: ''}]
        this.state = {
            province: provinceList,
            city: cityList,
            area: areaList
        }
        this.data = {
            province: province,
            city: city,
            area: areaList[0]
        }
        this.provinceHandle = this.provinceHandle.bind(this)
        this.cityHandle = this.cityHandle.bind(this)
        this.areaHandle = this.areaHandle.bind(this)
    }

    provinceHandle(self) {
        this.data.province = self
        const city = self.child || [{id: 'noneCity', name: ''}]
        city && this.setState({
            city: city,
            area: city[0].child || [{id:'noneArea', name: ''}]
        })
    }

    cityHandle(self) {
        this.data.city = self
        const child = self.child || [{id: 'noneArea', name: ''}]
        this.setState({
            area: child
        })
    }

    areaHandle(self) {
        this.data.area = self
    }

    render() {
        const {province, city, area} = this.state
        return (
            <div className={cn("area_roll_mask")}>
                <div className={cn("area_roll")}>
                    <Select onSelect={this.provinceHandle} list={province}/>
                    <Select onSelect={this.cityHandle} list={city}/>
                    <Select onSelect={this.areaHandle} list={area}/>
                </div>
            </div>
        )
    }
}

export default  areaGear