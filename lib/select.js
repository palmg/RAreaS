'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

var _select = require('./select.scss');

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by chkui on 2017/7/7.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var cn = _bind2.default.bind(_select2.default);

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

var Select = function (_React$Component) {
    _inherits(Select, _React$Component);

    function Select() {
        var _ref;

        _classCallCheck(this, Select);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        //this.dom  //当前容器的真实Dom对象，通过ref获取
        //this.timer //时间计时器
        //this.startY //开始touch事件时，拉动框的触屏事件位置
        //this.startTop //开始touch事件时，拉动框的最大高度
        //this.moveY //touchMove的上下移动偏移量
        //this.moveTop //touchMove操作之后的top位置
        var _this2 = _possibleConstructorReturn(this, (_ref = Select.__proto__ || Object.getPrototypeOf(Select)).call.apply(_ref, [this].concat(props)));

        _this2.length = -_this2.props.list.length || 0; //传入下拉菜单长度
        _this2.touchStartHandle = _this2.touchStartHandle.bind(_this2);
        _this2.touchMoveHandle = _this2.touchMoveHandle.bind(_this2);
        _this2.touchEndHandle = _this2.touchEndHandle.bind(_this2);
        return _this2;
    }

    _createClass(Select, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            var _this3 = this;

            var modify = nextProps.list !== this.props.list;
            modify && function () {
                _this3.dom.style["top"] = '0rem';
                _this3.length = -nextProps.list.length || 0; //传入下拉菜单长度
            }();
            return nextProps.list !== this.props.list;
        }
    }, {
        key: 'touchStartHandle',
        value: function touchStartHandle(e) {
            clearTimeout(this.timer);
            var dom = this.dom,
                top = dom.style['top'];
            this.startY = e.targetTouches[0].screenY;
            if (top) {
                this.startTop = parseFloat(top.replace(/rem/g, ''));
            } else {
                this.startTop = 0;
            }
            dom.style.transitionDuration = '0ms';
        }
    }, {
        key: 'touchMoveHandle',
        value: function touchMoveHandle(e) {
            this.moveY = e.targetTouches[0].screenY;
            this.moveTop = this.startTop + (this.moveY - this.startY) * 30 / window.innerHeight;
            this.dom.style['top'] = this.moveTop + 'rem';
        }
    }, {
        key: 'touchEndHandle',
        value: function touchEndHandle(e) {
            var dom = this.dom,
                length = this.length,
                onSelect = this.onSelect,
                props = this.props,
                _this = this;

            var moveTop = this.moveTop;
            if (!moveTop) return;
            0 < moveTop ? moveTop = 0 : length * 2 + 1 > moveTop && (moveTop = (length + 1) * 2);
            var item = Math.round(moveTop / 2);
            dom.style["top"] = item * 2 + 'rem';
            props.onSelect && (this.timer = setTimeout(function () {
                props.onSelect(props.list[Math.abs(item)]);
            }), 200);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var list = this.props.list || [];
            return _react2.default.createElement(
                'div',
                { className: cn("gear-box") },
                _react2.default.createElement(
                    'div',
                    { className: cn("gear"),
                        onTouchStart: this.touchStartHandle,
                        onTouchMove: this.touchMoveHandle,
                        onTouchEnd: this.touchEndHandle,
                        ref: function ref(dom) {
                            return _this4.dom = dom;
                        } },
                    list.map(function (i) {
                        return _react2.default.createElement(
                            'div',
                            { key: i.id, className: cn('tooth') },
                            i.name
                        );
                    })
                ),
                _react2.default.createElement('div', { className: cn('area_grid') })
            );
        }
    }]);

    return Select;
}(_react2.default.Component);

exports.default = Select;