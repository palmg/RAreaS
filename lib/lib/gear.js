/**
 * Created by chkui on 2017/7/7.
 */

import React from 'react'
import cnTool from 'classnames/bind'
import styles from './gear.scss'
const cn = cnTool.bind(styles)

/**
 * @param {string} id 标记当前组件的id，执行onSelect时会传回
 * @param {array} list 数据列表。组件只显示第一层，选定之后会返回对应的对象，结构如下：
 * [{
 *    id:'',
 *    name:'',
 *    child:[{
 *      id:'',
 *      name:'',
 *      child:[{
 *    }]
 *    }]
 * }]
 * @param {function} onSelect (id, object)=>{} 选定值之后的回调函数，object为传入的列表对象
 */
class Gear extends React.Component {
    constructor(...props) {
        super(...props)
        //this.dom  //当前容器的真实Dom对象，通过ref获取
        //this.timer //时间计时器
        //this.startTime //开始移动的时间
        //this.startY //开始touch事件时，拉动框的触屏事件位置
        //this.startTop //开始touch事件时，拉动框的最大高度
        //this.moveTime //移动操作的时间
        //this.moveY //touchMove的上下移动偏移量
        //this.moveTop //touchMove操作之后的top位置
        this.length = -this.props.list.length || 0//传入下拉菜单长度
        this.touchStartHandle = this.touchStartHandle.bind(this)
        this.touchMoveHandle = this.touchMoveHandle.bind(this)
        this.touchEndHandle = this.touchEndHandle.bind(this)
    }

    touchStartHandle(e) {
        var target = this.dom;
        this.startY = e.targetTouches[0].screenY;
        this.startTime = (new Date()).getTime();
        var top = target.style["top"];
        if (top) {
            this.startTop = parseFloat(top.replace(/rem/g, ""));
        } else {
            this.startTop = 0;
        }
        target.style.transitionDuration = '0ms';
    }

    touchMoveHandle(e) {
        var target = this.dom;
        this.moveY = e.targetTouches[0].screenY
        this.moveTime = (new Date()).getTime();
        var f = (this.moveY - this.startY) * 30 / window.innerHeight;
        this.moveTop = this.startTop + f;
        target.style["top"] = this.moveTop + 'rem'
    }

    touchEndHandle(e) {
        const {dom, length} = this
        let moveTop = this.moveTop
        0 < moveTop ? (moveTop = 0) : length * 2 > moveTop && (moveTop = (length + 1) * 2)
        dom.style["top"] = `${Math.round(moveTop / 2) * 2}rem`
    }

    render() {
        const list = this.props.list || []
        return (
            <div className={cn("gear-box")}>
                <div className={cn("gear")}
                     onTouchStart={this.touchStartHandle}
                     onTouchMove={this.touchMoveHandle}
                     onTouchEnd={this.touchEndHandle}
                     ref={(dom) => this.dom = dom}>
                    {list.map(i => <div key={i.id} className={cn("tooth")}>{i.name}</div>)}
                </div>
                <div className={cn("area_grid")}/>
            </div>
        )
    }
}

export default Gear