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
class Gear extends React.Component{
    constructor(...props){
        super(...props)
        //this.dom  //当前容器的真实Dom对象，通过ref获取
        //this.timer //时间计时器
        //this.startTime //开始移动的时间
        //this.startY //开始touch事件时，拉动框的触屏事件位置
        //this.startTop //开始touch事件时，拉动框的最大高度
        //this.moveTime //移动操作的时间
        //this.moveY //touchMove的上下移动偏移量
        //this.moveTop //touchMove操作之后的top位置

        this.touchStartHandle = this.touchStartHandle.bind(this)
        this.touchMoveHandle = this.touchMoveHandle.bind(this)
        this.touchEndHandle = this.touchEndHandle.bind(this)
    }

    touchStartHandle(e) {
        //e.preventDefault();
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
        //e.preventDefault();
        var target = this.dom;
        this.moveY = e.targetTouches[0].screenY
        this.moveTime = (new Date()).getTime();
        //target["new_" + target.id] = e.targetTouches[0].screenY;
        //target["n_t_" + target.id] = (new Date()).getTime();
        var f = (this.moveY - this.startY) * 30 / window.innerHeight;
        this.moveTop = this.startTop + f;
        //target.style["transform"] = 'translate3d(0,' + this.moveTop + 'rem,0)';
        target.style["top"] = this.moveTop + 'rem'
        //target.setAttribute('top', target["pos_" + target.id] + 'em');
        /*if (e.targetTouches[0].screenY < 1) {
            gearTouchEnd(e);
        }*/
        //console.log('move', target["pos_" + target.id])
    }

    touchEndHandle(e) {
        //e.preventDefault();
        var target = this.dom;
        var flag = (this.moveY - this.startY) / (this.moveTime - this.startTime);
        if (Math.abs(flag) <= 0.2) {
            target["spd_" + target.id] = (flag < 0 ? -0.08 : 0.08);
        } else {
            if (Math.abs(flag) <= 0.5) {
                target["spd_" + target.id] = (flag < 0 ? -0.16 : 0.16);
            } else {
                target["spd_" + target.id] = flag / 2;
            }
        }
        if (!this.moveTop) {
            this.moveTop = 0;
        }
        console.log('end', this.moveTop)
        this.rollGear(target);
    }


    rollGear(target) {
        /*var d = 0;
        var stopGear = false;
        var _this = this;*/
        /*function setDuration() {
            target.style.transitionDuration = '200ms';
            stopGear = true;
        }*/
        let pos = this.moveTop;
        if(0 < pos){
            pos = 0
        }else{
            pos = Math.round(pos / 2)*2
        }


        //var pos = Math.ceil(this.moveTop), mod = pos%2
        //var speed = target["spd_" + target.id] * Math.exp(-0.03 * d);
        /*pos += speed;
        if (Math.abs(speed) > 0.1) {
        } else {
            var b = Math.round(pos / 2) * 2;
            pos = b;
            setDuration();
        }
        if (pos > 0) {
            pos = 0;
            setDuration();
        }
        var minTop = -(target.dataset.len - 1) * 2;
        if (pos < minTop) {
            pos = minTop;
            setDuration();
        }
        if (stopGear) {
            var gearVal = Math.abs(pos) / 2;
            //_this.setGear(target, gearVal);

            clearInterval(this.timer);
        }*/
        //target["pos_" + target.id] = pos;
        //target.style.transitionDuration = '200ms'
        //target.style["-webkit-transform"] = 'translate3d(0,' + pos + 'rem,0)';
        //target.style.transitionDuration = '0'
        //target.style["-webkit-transform"] = 'translate3d(0,' + 0 + 'rem,0)';
        target.style["top"] = pos + 'rem'
        //target.setAttribute('top', pos + 'rem');
    }

    render(){
        const list = this.props.list || []
        return(
            <div className={cn("gear-box")}>
                <div className={cn("gear")}
                     onTouchStart={this.touchStartHandle}
                     onTouchMove={this.touchMoveHandle}
                     onTouchEnd={this.touchEndHandle}
                     ref={(dom) => this.dom = dom}>
                    {list.map(i=><div key={i.id} className={cn("tooth")}>{i.name}</div>)}
                </div>
                <div className={cn("area_grid")} />
            </div>
        )
    }
}

export default Gear