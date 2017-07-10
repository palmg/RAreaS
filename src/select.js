/**
 * Created by chkui on 2017/7/7.
 */

import React from 'react'
import cnTool from 'classnames/bind'
import styles from './select.scss'
const cn = cnTool.bind(styles)

/**
 * 独立的下拉选择框。只有在this.props.list发生数据变更时，才会变更（非突变数据）
 * @param {string} id 标记当前组件的id，执行onSelect时会传回
 * @param {array} list 数据列表。组件只显示第一层，选定之后会返回对应的对象，结构如下：
 * [{
 *    name:'',
 *    *id:'',
 *    *child:[{
 *      id:'',
 *      name:'',
 *      child:[{
 *    }]*id和*child属于扩展属性，如果需要还可以传入更多的熟悉，组件只负责显示name的内容
 *    }]
 * }]
 * @param {function} onSelect (object)=>{} 选定值之后的回调函数，object为传入的列表对象
 */
class Select extends React.Component {
    constructor(...props) {
        super(...props)
        //this.dom  //当前容器的真实Dom对象，通过ref获取
        //this.timer //时间计时器
        //this.startY //开始touch事件时，拉动框的触屏事件位置
        //this.startTop //开始touch事件时，拉动框的最大高度
        //this.moveY //touchMove的上下移动偏移量
        //this.moveTop //touchMove操作之后的top位置
        this.length = -this.props.list.length || 0//传入下拉菜单长度
        this.touchStartHandle = this.touchStartHandle.bind(this)
        this.touchMoveHandle = this.touchMoveHandle.bind(this)
        this.touchEndHandle = this.touchEndHandle.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState){
        const modify = nextProps.list !== this.props.list
        modify && (()=>{
            this.dom.style["top"] = '0rem'
            this.length = -nextProps.list.length || 0//传入下拉菜单长度
        })()
        return nextProps.list !== this.props.list
    }

    touchStartHandle(e) {
        clearTimeout(this.timer)
        const dom = this.dom, top = dom.style['top'];
        this.startY = e.targetTouches[0].screenY;
        if (top) {
            this.startTop = parseFloat(top.replace(/rem/g, ''));
        } else {
            this.startTop = 0;
        }
        dom.style.transitionDuration = '0ms';
    }

    touchMoveHandle(e) {
        this.moveY = e.targetTouches[0].screenY
        this.moveTop = this.startTop + (this.moveY - this.startY) * 30 / window.innerHeight
        this.dom.style['top'] = `${this.moveTop}rem`
    }

    touchEndHandle(e) {
        const {dom, length, onSelect, props} = this, _this = this
        let moveTop = this.moveTop;
        0 < moveTop ? (moveTop = 0) : length * 2 + 1 > moveTop && (moveTop = (length + 1) * 2)
        const item = Math.round(moveTop / 2)
        dom.style["top"] = `${item * 2}rem`
        props.onSelect && (
            this.timer = setTimeout(() => {
                props.onSelect(props.list[Math.abs(item)])
            }),200)
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
                    {list.map(i => <div key={i.id} className={cn('tooth')}>{i.name}</div>)}
                </div>
                <div className={cn('area_grid')}/>
            </div>
        )
    }
}

export default Select