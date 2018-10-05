'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PageNavigate = function () {
            function PageNavigate() {
                        _classCallCheck(this, PageNavigate);

                        this.scrollEvent();
                        this.clickEvent();
                        this.canGo = true;
                        this.curentPage = 1;
                        this.maxpage = 3;
            }

            _createClass(PageNavigate, [{
                        key: 'scrollEvent',
                        value: function scrollEvent() {
                                    var _this = this;

                                    window.addEventListener('wheel', function (e) {

                                                if (!_this.canGo) return;
                                                _this.canGo = false;

                                                var direction = e.wheelDeltaY < 0 ? 1 : -1;

                                                var newpage = _this.curentPage + direction;

                                                if (newpage > _this.maxpage) newpage = 1;
                                                if (newpage < 1) newpage = _this.maxpage;

                                                _this.curentPage = newpage;
                                                console.log(typeof direction === 'undefined' ? 'undefined' : _typeof(direction), _this.curentPage);

                                                setTimeout(function () {
                                                            _this.canGo = true;
                                                }, 1300);
                                    }, { passive: true });
                        }
            }, {
                        key: 'clickEvent',
                        value: function clickEvent() {}
            }]);

            return PageNavigate;
}();

var navtopage = new PageNavigate();