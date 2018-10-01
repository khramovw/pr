'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* js */
function arrToObj(arr) {
    return [].slice.call(arr);
}

var OpenContactForm = function () {
    function OpenContactForm(element, btn) {
        _classCallCheck(this, OpenContactForm);

        this.contactform = element;
        this.arropenform = arrToObj(btn);
    }

    // open first in form contact in home


    _createClass(OpenContactForm, [{
        key: 'formopen',
        value: function formopen() {
            var _this = this;

            this.arropenform.find(function (el) {
                return el.addEventListener('click', function () {
                    return _this.contactform.classList.toggle('opened-form');
                });
            });
        }

        // open sidebar

    }, {
        key: 'openSidebar',
        value: function openSidebar() {
            var _this2 = this;

            this.arropenform.find(function (el) {
                return el.addEventListener('click', function () {
                    _this2.contactform.classList.toggle('opened-form');
                    el.classList.toggle('opened-form');
                });
            });
        }
    }]);

    return OpenContactForm;
}();

// Numbers things counter


var CounterProduct = function () {
    function CounterProduct(btn) {
        _classCallCheck(this, CounterProduct);

        this.btn = btn;
        this.bntGroup = arrToObj(btn);
    }

    _createClass(CounterProduct, [{
        key: 'start',
        value: function start() {
            var _this3 = this;

            this.bntGroup.some(function (el) {
                return el.addEventListener('click', function (e) {
                    return _this3.foo(e);
                });
            });
        }
    }, {
        key: 'foo',
        value: function foo(e) {
            var count = Number(e.target.closest('.wrap-count').querySelector('.count-number').value);

            e.target.matches('.count-minus') ? count-- : false;
            e.target.matches('.count-plus') ? count++ : false;

            if (count <= 0 || isNaN(count)) count = 1;

            e.target.closest('.wrap-count').querySelector('.count-number').value = count;
        }
    }]);

    return CounterProduct;
}();
// Card items


var Getactiveitemcard = function () {
    function Getactiveitemcard(element) {
        _classCallCheck(this, Getactiveitemcard);

        this.arrItems = arrToObj(element);
        this.activeItemsTitle = '';
        this.activeItemsColor = '';
        this.activeItemsColorTitle = '';
        this.resultTitle = document.querySelector('.img-caption .title');
        this.resultTitleModal = document.querySelector('.title-js');
        this.resultImgSrc = document.querySelector('.colorCardsModalbtn img');
        this.resultImgTitle = document.querySelector('.colorCardsModalbtn-js');
        this.resultImgSrceModal = document.querySelector('.selected-material .img-product img');
        this.resultImgTitleModal = document.querySelector('.selected-material .title-product p');
        this.resultImgTitleMaterialModal = document.querySelector('.selected-material .title-material');
    }

    // Init


    _createClass(Getactiveitemcard, [{
        key: 'title',
        value: function title() {
            var self = this;
            this.setActiveCardMaterial();
            this.switchwindow();
        }

        // Init

    }, {
        key: 'color',
        value: function color() {
            this.setActiveCardColor();
        }
    }, {
        key: 'setResultTitle',
        value: function setResultTitle() {
            this.resultTitle.textContent = this.activeItemsTitle;
            this.resultImgTitleMaterialModal.textContent = this.activeItemsTitle;
            $('#materialCardsModal').modal('hide');
        }
    }, {
        key: 'setResultImg',
        value: function setResultImg() {
            this.resultImgSrc.attributes[0].value = this.activeItemsColor;
            this.resultImgSrceModal.attributes[0].value = this.activeItemsColor;
            this.resultImgTitle.textContent = this.activeItemsColorTitle;
            this.resultImgTitleModal.textContent = this.activeItemsColorTitle;
        }

        // Get title

    }, {
        key: 'getActiveCardTitle',
        value: function getActiveCardTitle() {
            var _this4 = this;

            this.arrItems.filter(function (item) {
                item.matches('.selected') ? _this4.activeItemsTitle = item.children[0].children[0].children[1].innerHTML : false;
            });
            this.setResultTitle();
        }

        // Get color

    }, {
        key: 'getActiveCardColor',
        value: function getActiveCardColor() {
            var _this5 = this;

            this.arrItems.filter(function (item) {
                item.matches('.selected') ? _this5.activeItemsColor = item.children[0].children[0].children[0].attributes[0].value : 'false';
                item.matches('.selected') ? _this5.activeItemsColorTitle = item.children[0].children[1].children[0].innerHTML : 'false';
                console.log(_this5.activeItemsColor, _this5.activeItemsColorTitle);
            });
            this.setResultImg();
        }

        // Set color

    }, {
        key: 'setActiveCardColor',
        value: function setActiveCardColor() {
            var _this6 = this;

            this.setActiveCard(function () {
                return _this6.getActiveCardColor();
            });
        }

        // Set material

    }, {
        key: 'setActiveCardMaterial',
        value: function setActiveCardMaterial() {
            var _this7 = this;

            this.setActiveCard(function () {
                return _this7.getActiveCardTitle();
            });
        }

        //Toggle set active item

    }, {
        key: 'setActiveCard',
        value: function setActiveCard(i) {
            var _this8 = this;

            this.arrItems.find(function (item) {
                return item.addEventListener('click', function () {
                    _this8.resetActiveCard();
                    !item.matches('.selected') ? item.classList.add('selected') : false;
                    i();
                });
            });
        }

        // Reset active item

    }, {
        key: 'resetActiveCard',
        value: function resetActiveCard() {
            this.arrItems.filter(function (item) {
                return item.classList.remove('selected');
            });
        }
    }, {
        key: 'switchwindow',
        value: function switchwindow() {
            this.resultTitleModal.addEventListener('click', function () {
                return $('#colorCardsModal').modal('hide');
            });
        }
    }]);

    return Getactiveitemcard;
}();
// Cart


var DeletItemInCart = function () {
    function DeletItemInCart(btn) {
        _classCallCheck(this, DeletItemInCart);

        this.btncloseitem = btn;
        this.arrbtncloseitem = arrToObj(btn);
        this.valuecounter = '';
    }

    _createClass(DeletItemInCart, [{
        key: 'init',
        value: function init() {
            var _this9 = this;

            this.arrbtncloseitem.filter(function (el) {
                el.addEventListener('click', function (e) {

                    _this9.valuecounter = e.path[2].children[0].children[1].value;

                    // If element deleted set input value = 0
                    e.path[2].children[0].children[1].value = 0;

                    // Deleted card onclick
                    e.path[5].classList.toggle('deleted');
                });
            });
        }
    }]);

    return DeletItemInCart;
}();
// Sidebar


var OpenCloseForm = function () {
    function OpenCloseForm() {
        _classCallCheck(this, OpenCloseForm);

        this.menuForm = document.body.querySelector('.menu-form');
        this.sidebarBtn = document.body.querySelector('.sidebar-btn');
        this.actionsBtns = arrToObj(document.body.querySelectorAll('.form-container .actions-btn-js'));
        this.formInputs = arrToObj(document.body.querySelectorAll('.ordering-form-inputs'));
        this.formBtns = arrToObj(document.body.querySelectorAll('.btn-toggle-js'));
    }

    // Click to btn in header for open sidebar


    _createClass(OpenCloseForm, [{
        key: 'openSidebar',
        value: function openSidebar() {
            var _this10 = this;

            this.sidebarBtn.addEventListener('click', function () {
                _this10.menuForm.classList.toggle('opened-form');
                _this10.sidebarBtn.classList.toggle('opened-form');
                if (_this10.formInputs[0].matches('.d-none')) {
                    _this10.formInputs.filter(function (el) {
                        return el.classList.toggle('d-none');
                    });
                    _this10.formBtns.filter(function (btn) {
                        return btn.classList.toggle('d-none');
                    });
                }
            });
        }

        // Click to узнать больше in sidebar

    }, {
        key: 'toggleForm',
        value: function toggleForm() {
            var _this11 = this;

            this.actionsBtns.find(function (btnjs) {
                return btnjs.addEventListener('click', function () {
                    if (!_this11.formInputs[0].matches('.d-none')) {
                        _this11.formInputs.filter(function (el) {
                            return el.classList.toggle('d-none');
                        });
                        _this11.formBtns.filter(function (btn) {
                            return btn.classList.toggle('d-none');
                        });
                    }
                });
            });
        }
    }, {
        key: 'initial',
        value: function initial() {
            this.openSidebar();
            this.toggleForm();
        }
    }]);

    return OpenCloseForm;
}();

var CloseForm = function () {
    function CloseForm(section, btn) {
        _classCallCheck(this, CloseForm);

        this.section = section;
        this.btn = btn;
    }

    _createClass(CloseForm, [{
        key: 'onCloseForm',
        value: function onCloseForm() {
            var _this12 = this;

            window.addEventListener('scroll', function () {
                if (_this12.section.matches('.opened-form')) _this12.section.classList.remove('opened-form');
                if (_this12.btn.matches('.opened-form')) _this12.btn.classList.remove('opened-form');
            });
        }
    }]);

    return CloseForm;
}();

var openCloseForm = new OpenCloseForm();
var getMaterial = new Getactiveitemcard(document.querySelectorAll('.material-cards-item'));
var getColor = new Getactiveitemcard(document.querySelectorAll('.color-cards-item'));
var getContact = new OpenContactForm(document.body.querySelector('.input-wrapper'), document.body.querySelectorAll('.actions-btn-js'));
var counter = new CounterProduct(document.querySelectorAll('.wrap-count button'), document.querySelector('.count-number'));
var openedSidebar = new OpenContactForm(document.body.querySelector('.menu-form'), document.body.querySelectorAll('.sidebar-btn'));
var closeForm = new CloseForm(document.body.querySelector('.menu-form'), document.body.querySelector('.sidebar-btn'));
var deletcard = new DeletItemInCart(document.querySelectorAll('.ordering-item .wrap-close-icon'));