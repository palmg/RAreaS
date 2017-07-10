/**
 * Created by chkui on 2017/7/7.
 */

import React from 'react'
import {render} from 'react-dom'

import RAreas from '../index'
import './demo.scss'

class Demo extends React.Component{
    constructor(...props){
        super(...props)
        this.state = {
            show:false,
            area:''
        }
        this.popHandle = this.popHandle.bind(this)
        this.cancelHandle = this.cancelHandle.bind(this)
        this.commitHandle = this.commitHandle.bind(this)
    }

    popHandle(){
        this.setState({
            show:true
        })
    }

    cancelHandle(){
        this.setState({
            show:false
        })
    }

    commitHandle(data){
        this.setState({
            show:false,
            area:`${data.province.name}${data.city.name}${data.area.name}`
        })
    }

    render(){
        return(
            <div>
                <button onClick={this.popHandle}>地区选择</button>
                <p>选择结果：</p>
                <p>{this.state.area}</p>
                {this.state.show && (<RAreas onCancel={this.cancelHandle} onCommit={this.commitHandle}/>)}
            </div>
        )
    }
}

render(<Demo />, document.getElementById('root'))

