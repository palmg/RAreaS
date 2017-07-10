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

var _areaGear = require('./areaGear.scss');

var _areaGear2 = _interopRequireDefault(_areaGear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by chkui on 2017/7/10.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var cn = _bind2.default.bind(_areaGear2.default);

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

var areaGear = function (_React$Component) {
    _inherits(areaGear, _React$Component);

    function areaGear() {
        var _ref;

        _classCallCheck(this, areaGear);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = areaGear.__proto__ || Object.getPrototypeOf(areaGear)).call.apply(_ref, [this].concat(props)));

        var provinceList = _this.props.list,
            province = provinceList[0],
            cityList = province.child || [{ id: 'noneCity', name: '' }],
            city = cityList[0],
            areaList = city.child || [{ id: 'noneArea', name: '' }];
        _this.state = {
            province: provinceList,
            city: cityList,
            area: areaList
        };
        _this.data = {
            province: province,
            city: city,
            area: areaList[0]
        };
        _this.provinceHandle = _this.provinceHandle.bind(_this);
        _this.cityHandle = _this.cityHandle.bind(_this);
        _this.areaHandle = _this.areaHandle.bind(_this);
        return _this;
    }

    //type=['province'|'city'|'area']


    _createClass(areaGear, [{
        key: 'buildData',
        value: function buildData(self, type) {
            var _state = this.state,
                province = _state.province,
                city = _state.city,
                area = _state.area;

            switch (type) {
                case 'province':
                    city = self.child || [{ id: 'noneCity', name: '' }];
                    area = city[0].child || [{ id: 'noneArea', name: '' }];
                    this.data = {
                        province: self,
                        city: city[0],
                        area: area[0]
                    };
                    break;
                case 'city':
                    area = self.child || [{ id: 'noneArea', name: '' }];
                    this.data.city = self;
                    this.data.area = area[0];
                    break;
                case 'area':
                    this.data.area = self;
                    break;

            }
            this.setState({
                province: province,
                city: city,
                area: area
            });
        }
    }, {
        key: 'provinceHandle',
        value: function provinceHandle(self) {
            this.buildData(self, 'province');
        }
    }, {
        key: 'cityHandle',
        value: function cityHandle(self) {
            this.buildData(self, 'city');
        }
    }, {
        key: 'areaHandle',
        value: function areaHandle(self) {
            this.buildData(self, 'area');
        }
    }, {
        key: 'render',
        value: function render() {
            var _state2 = this.state,
                province = _state2.province,
                city = _state2.city,
                area = _state2.area;

            return _react2.default.createElement(
                'div',
                { className: cn("area_roll_mask") },
                _react2.default.createElement(
                    'div',
                    { className: cn("area_roll") },
                    _react2.default.createElement(_select2.default, { onSelect: this.provinceHandle, list: province }),
                    _react2.default.createElement(_select2.default, { onSelect: this.cityHandle, list: city }),
                    _react2.default.createElement(_select2.default, { onSelect: this.areaHandle, list: area })
                )
            );
        }
    }]);

    return areaGear;
}(_react2.default.Component);

exports.default = areaGear;