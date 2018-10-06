'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* js */

function htmlcolToObj(arr) {
    return [].slice.call(arr);
}

var MainNav = function () {
    function MainNav() {
        _classCallCheck(this, MainNav);

        this.menubtn = document.querySelector('.menu-js');
        this.menulistitem = document.querySelector('.menu-items-js');
        this.navitems = htmlcolToObj(document.querySelectorAll('.menu-items-js ul li'));
        // this.content = document.querySelector('.open-menu-js');
        this.pubsub = PubSub.subscribe('one', function (msg, data) {
            console.log(msg, data);
        });
    }

    _createClass(MainNav, [{
        key: 'init',
        value: function init() {
            this.toggleOpenMenu();
            this.setactive();
        }
    }, {
        key: 'toggleOpenMenu',
        value: function toggleOpenMenu() {
            var _this = this;

            this.menubtn.addEventListener('click', function (e) {
                e.preventDefault();
                _this.content = document.querySelector('.open-menu-js');
                _this.menubtn.classList.toggle('open-menu');
                _this.menulistitem.classList.toggle('open-menu');
                _this.content.classList.toggle('open-menu');
            });
        }
    }, {
        key: 'setactive',
        value: function setactive() {
            var _this2 = this;

            this.navitems.some(function (el) {
                el.addEventListener('click', function (link) {
                    _this2.resetactive();
                    link.target.parentElement.classList.add('active-item');
                    PubSub.publish('one', '--');
                    console.log('msg-publish');
                });
            });
        }
    }, {
        key: 'resetactive',
        value: function resetactive() {
            this.navitems.filter(function (el) {
                return el.classList.remove('active-item');
            });
            this.pubsub;

            console.log('msg');
        }
    }]);

    return MainNav;
}();

var PageNavigate = function () {
    function PageNavigate() {
        _classCallCheck(this, PageNavigate);

        this.pages = [];
        this.canGo = true;
        this.currentPageNum = 1;
        this.currentPage;
        this.nextPage;
        this.nextpagenum;
        this.navtopage;

        this.scrollEvent();
        this.clickEvent();

        this.allpages();
        this.maxpage = this.pages.length;

        this.navigating();
    }

    // get all pages


    _createClass(PageNavigate, [{
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
        key: 'navigating',
        value: function navigating() {

            // Gsap
            var tl = new TimelineMax();
            console.log('tl', tl);

            this.navtopage = PubSub.subscribe('gotopage', function (msg, data) {
                // console.log(msg, data);
                var currentPage = void 0,
                    nextPage = void 0;

                //  Changes page
                data.pages.filter(function (page, i) {
                    page.dataset.page == data.to ? page.classList.add('is-active', 'open-menu-js') : page.classList.remove('is-active', 'open-menu-js');
                    page.dataset.page == data.to ? nextPage = page : true;
                    page.dataset.page == data.from ? currentPage = page : true;
                    console.log('i: ', i, 'currentPage: ', currentPage, 'nextPage: ', nextPage);
                });

                if (data.to > data.from) {
                    tl.fromTo(currentPage, 0.5, { x: '-50%', opacity: '1' }, { x: '-200%' }).to(currentPage, 0.1, { opacity: '0' }).fromTo(nextPage, 0.5, { x: '100%', opacity: '0' }, { x: '-50%', opacity: '1' });
                }
                if (data.to < data.from) {
                    tl.fromTo(currentPage, 0.5, { x: '-50%', opacity: '1' }, { x: '200%' }).to(currentPage, 0.1, { opacity: '0' }).fromTo(nextPage, 0.5, { x: '-200%', opacity: '0' }, { x: '-50%', opacity: '1' });
                }

                // Changes Url
                data.pages.find(function (page) {
                    return page.dataset.page == data.to ? window.location.hash = page.dataset.pagename : false;
                });
                // data.pages.find( page => page.dataset.page == data.to ? history.pushState({}, page.dataset.pagename, page.dataset.pagename) : false );
            });
        }
    }]);

    return PageNavigate;
}();

var menu = new MainNav();
menu.init();

var navtopage = new PageNavigate();