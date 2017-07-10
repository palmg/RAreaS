'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

var _select = require('./select');

var _select2 = _interopRequireDefault(_select);

var _areas = require('./areas.scss');

var _areas2 = _interopRequireDefault(_areas);

var _areaData = require('./areaData');

var _areaData2 = _interopRequireDefault(_areaData);

var _areaGear = require('./areaGear');

var _areaGear2 = _interopRequireDefault(_areaGear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by chkui on 2017/7/7.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var cn = _bind2.default.bind(_areas2.default);

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

var Areas = function (_React$Component) {
    _inherits(Areas, _React$Component);

    function Areas() {
        var _ref;

        _classCallCheck(this, Areas);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Areas.__proto__ || Object.getPrototypeOf(Areas)).call.apply(_ref, [this].concat(props)));

        _this.submitHandle = _this.submitHandle.bind(_this);
        return _this;
    }

    _createClass(Areas, [{
        key: 'submitHandle',
        value: function submitHandle(e) {
            var onCommit = this.props.onCommit;
            onCommit && onCommit(this.gear.data);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: cn("area_ctrl", "slideInUp") },
                _react2.default.createElement(
                    'div',
                    { className: cn("area_btn_box") },
                    _react2.default.createElement(
                        'div',
                        { className: cn("area_btn", "larea_cancel"), onClick: this.props.onCancel },
                        '\u53D6\u6D88'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: cn("area_btn", "larea_finish"), onClick: this.submitHandle },
                        '\u786E\u5B9A'
                    )
                ),
                _react2.default.createElement(_areaGear2.default, { ref: function ref(_ref2) {
                        return _this2.gear = _ref2;
                    }, list: _areaData2.default })
            );
        }
    }]);

    return Areas;
}(_react2.default.Component);

exports.default = Areas;