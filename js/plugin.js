'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* js */

function htmlcolToObj(arr) {
    return [].slice.call(arr);
}

var PageNavigate = function () {
    function PageNavigate() {
        _classCallCheck(this, PageNavigate);

        this.self = this;

        // Button menu
        this.menubtn = document.querySelector('.menu-js');

        // Main menu
        this.menulistitem = document.querySelector('.menu-items-js');
        // Items of main menu
        this.navitems = htmlcolToObj(document.querySelectorAll('.menu-items-js ul li'));

        this.pages = [];
        this.canGo = true;
        this.currentPageNum = 1;
        this.currentPage;
        this.nextPage;
        this.nextPageNum;
        this.navtopage;

        // Plagin of calculator
        this.controlItem = htmlcolToObj(document.querySelectorAll('.control-item'));
        this.controlBtn = htmlcolToObj(document.querySelectorAll('.check-percent'));
        this.controlBtn;
        this.diagramBtn;
        this.navcalc;
        this.controlItem;
        this.openControl = 1;
        this.checkBox = 5;
        this.getPercent();
        this.clickCheck();

        this.calculatorPlugin();
        this.navCalculator();

        this.scrollEvent();
        this.clickEvent();
        this.mainnav();

        this.allpages();
        this.maxpage = this.pages.length;

        this.pagenavigating();
    }

    // Main navigation start


    _createClass(PageNavigate, [{
        key: 'mainnav',
        value: function mainnav() {
            this.setactive();
            this.eventIs();
        }
    }, {
        key: 'eventIs',
        value: function eventIs() {
            var _this = this;

            this.menubtn.addEventListener('click', function (e) {
                e.preventDefault();
                _this.toggleOpenMenu();
            });
        }
    }, {
        key: 'toggleOpenMenu',
        value: function toggleOpenMenu() {
            var tl = new TimelineMax();
            // TweenMax.staggerFrom('.menu-items-js ul li a', .1, { opacity: 0, scale: .5, y: -80, ease:Back.easeOut.config(3) }, .2);
            // PubSub.publish('openmenu', { items: this.navitems });
            this.content = document.querySelector('.open-menu-js');

            this.menubtn.classList.toggle('open-menu');
            this.menulistitem.classList.toggle('open-menu');
            this.content.classList.toggle('open-menu');
            tl.staggerFrom(document.querySelectorAll('.open-menu ul li'), 0.25, {
                y: -20,
                scale: 0,
                autoAlpha: 0,
                ease: Back.easeOut.config(2),
                delay: .4 }, 0.1);
        }
    }, {
        key: 'setactive',
        value: function setactive() {
            var _this2 = this;

            this.navitems.some(function (el) {
                el.addEventListener('click', function (link) {

                    // check active
                    if (!link.target.dataset.target) return false;

                    // Set active menu item
                    _this2.resetactive();
                    link.target.parentElement.classList.add('active-item');

                    _this2.toggleOpenMenu();

                    // Go to preset page
                    PubSub.publish('gotopage', {
                        from: _this2.currentPageNum,
                        to: parseFloat(link.target.dataset.target),
                        pages: _this2.pages,
                        currentPage: _this2.currentPage,
                        nextPage: _this2.nextPage
                    });
                    _this2.currentPageNum = parseFloat(link.target.dataset.target);
                });
            });
        }
    }, {
        key: 'resetactive',
        value: function resetactive() {
            this.navitems.filter(function (el) {
                return el.classList.remove('active-item');
            });
        }
        // Main navigation end

        // get all pages

    }, {
        key: 'allpages',
        value: function allpages() {
            var _this3 = this;

            htmlcolToObj(document.querySelectorAll('.content')).filter(function (el) {
                return el.dataset.page ? _this3.pages.push(el) : true;
            });
        }

        // scrolling page navigation

    }, {
        key: 'scrollEvent',
        value: function scrollEvent() {
            var _this4 = this;

            window.addEventListener('wheel', function (e) {

                // delayed event for touchpad
                if (!_this4.canGo) return;
                _this4.canGo = false;

                // get direction
                var direction = e.wheelDeltaY < 0 ? 1 : -1;

                // get number of next page
                _this4.newpagenum = _this4.currentPageNum + direction;

                // set infinity scroll
                if (_this4.newpagenum > _this4.maxpage) _this4.newpagenum = 1;
                if (_this4.newpagenum < 1) _this4.newpagenum = _this4.maxpage;

                PubSub.publish('gotopage', {
                    from: _this4.currentPageNum,
                    to: _this4.newpagenum,
                    pages: _this4.pages,
                    currentPage: _this4.currentPage,
                    nextPage: _this4.nextPage
                });

                // set number of current page
                _this4.currentPageNum = _this4.newpagenum;

                setTimeout(function () {
                    _this4.canGo = true;
                }, 1300);
            }, { passive: true });
        }
    }, {
        key: 'clickEvent',


        // click
        value: function clickEvent() {}
    }, {
        key: 'pagenavigating',


        // main navigation os pages
        value: function pagenavigating() {

            // Gsap
            var tl = new TimelineMax();

            this.navtopage = PubSub.subscribe('gotopage', function (msg, data) {
                console.log(msg, data);
                var currentPage = void 0,
                    nextPage = void 0;

                //  Changes page
                data.pages.filter(function (page, i) {
                    page.dataset.page == data.to ? page.classList.add('is-active', 'open-menu-js') : page.classList.remove('is-active', 'open-menu-js');
                    page.dataset.page == data.to ? nextPage = page : true;
                    page.dataset.page == data.from ? currentPage = page : true;
                    // console.log('i: ', i, 'currentPage: ', currentPage, 'nextPage: ', nextPage);
                    // this.currentPage = currentPage;
                    // this.nextPage = nextPage;
                    // console.log('***', this.currentPage, this.nextPage);

                });

                if (data.to > data.from) {
                    tl.fromTo(currentPage, 0.5, { x: '-50%', opacity: '1', autoAlpha: 1 }, { x: '-200%' }).to(currentPage, 0.1, { opacity: '0' }).fromTo(nextPage, 0.5, { x: '100%', opacity: '0', autoAlpha: 0 }, { x: '-50%', opacity: '1', autoAlpha: 1 });
                }
                if (data.to < data.from) {
                    tl.fromTo(currentPage, 0.5, { x: '-50%', opacity: '1', autoAlpha: 1 }, { x: '200%' }).to(currentPage, 0.1, { opacity: '0' }).fromTo(nextPage, 0.5, { x: '-200%', opacity: '0', autoAlpha: 0 }, { x: '-50%', opacity: '1', autoAlpha: 1 });
                }

                // Changes Url
                data.pages.find(function (page) {
                    return page.dataset.page == data.to ? window.location.hash = page.dataset.pagename : false;
                });
                // data.pages.find( page => page.dataset.page == data.to ? history.pushState({}, page.dataset.pagename, page.dataset.pagename) : false );
            });
        }
    }, {
        key: 'calculatorPlugin',
        value: function calculatorPlugin() {
            var _this5 = this;

            this.controlItem = htmlcolToObj(document.querySelectorAll('.control-item'));
            this.controlBtn = htmlcolToObj(document.querySelectorAll('.control-btn'));
            this.diagramBtn = htmlcolToObj(document.querySelectorAll('.diagram-btn'));

            this.controlBtn.filter(function (btn) {

                console.log('BTN', btn.dataset.btn);

                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    _this5.closeCalcItem();

                    PubSub.publish('calcClick', {
                        button: btn,
                        items: _this5.controlItem,
                        diagram: _this5.diagramBtn,
                        to: btn.dataset.btn,
                        from: _this5.openControl
                    });

                    _this5.openControl = btn.dataset.btn;
                });
            });
        }
    }, {
        key: 'navCalculator',
        value: function navCalculator() {
            // Gsap
            var tl = new TimelineMax();

            this.navcalc = PubSub.subscribe('calcClick', function (msg, data) {

                data.items.filter(function (item, i) {

                    if (item.children[0].children[2].dataset.btn === data.from) {

                        item.classList.remove('is-open');

                        // tl.fromTo( item, 0.3, { height: '10em'},{ height: '2.75em'}, '-=0.1' )
                        //     .staggerFromTo( item.children[1].children, 0.25, { opacity: 1, y: 0, scale: 1, autoAlpha: 1},{ opacity: 0, y: 20, scale: 0, autoAlpha: 0}, 0.1, '-=0.5' )
                    }

                    if (item.children[0].children[2].dataset.btn === data.to) {

                        item.classList.add('is-open');

                        // tl.fromTo( item, .5, { height: '2.75em'},{ height: '10em'} )
                        //     .staggerFromTo( item.children[1].children, 0.25, { opacity: 0, y: 20, scale: 0},{ autoAlpha: 1, opacity: 1, y: 0, scale: 1}, 0.1, '-=0.5' );
                    }
                });

                data.diagram.filter(function (item) {
                    // console.log('D', item)

                    if (item.dataset.btn === data.to) item.classList.add('is-active');

                    if (item.dataset.btn === data.from) item.classList.remove('is-active');
                });

                // console.log('controlItem: ', data.button.parentNode.parentElement.classList[1]);
            });
        }
    }, {
        key: 'getPercent',
        value: function getPercent() {
            var _this6 = this;

            var maxCheckBox = 6;

            this.controlItem.filter(function (item, i, arr) {

                // maxCheckBox = i + 1;

                // if (item.children[0].children[0].checked) {
                //             //     this.checkBox = this.checkBox + 1;
                //             //     console.log('checkBox', this.checkBox, ' maxCheckBox', maxCheckBox);
                //             // }
                //             // if(!item.children[0].children[0].checked){
                //             //     this.checkBox = this.checkBox - 1;
                //             //     console.log('-checkBox', this.checkBox, ' -maxCheckBox', maxCheckBox);
                //             // }

                if (maxCheckBox === _this6.checkBox) {
                    document.querySelector('.result-diagram').innerHTML = '100%';
                    console.log('100%', _this6.checkBox);
                }
                if (_this6.checkBox !== maxCheckBox) {
                    document.querySelector('.result-diagram').innerHTML = parseFloat(100 * _this6.checkBox / maxCheckBox).toFixed(0) + '%';
                    console.log('--%', _this6.checkBox);
                }
            });
        }
    }, {
        key: 'clickCheck',
        value: function clickCheck() {
            var _this7 = this;

            this.controlBtn.filter(function (click) {
                console.log(click.previousSibling.previousSibling.checked);
                click.addEventListener('click', function () {
                    if (!click.previousSibling.previousSibling.checked) {
                        _this7.checkBox = _this7.checkBox + 1;
                        console.log('checkBox', _this7.checkBox);
                    } else {
                        _this7.checkBox = _this7.checkBox - 1;
                    }
                    _this7.getPercent();
                });
            });
        }
    }, {
        key: 'closeCalcItem',
        value: function closeCalcItem() {
            this.controlItem.filter(function (item) {
                return item.classList.remove('is-open');
            });
            this.diagramBtn.filter(function (item) {
                return item.classList.remove('is-active');
            });
        }
    }]);

    return PageNavigate;
}();

var navtopage = new PageNavigate();