/* js */
// history.pushState({}, 'home', 'home');
function htmlcolToObj(arr) {
    return [].slice.call(arr);
}
class MainNav {
    constructor () {
        this.menubtn = document.querySelector('.menu-js');
        this.menulistitem = document.querySelector('.menu-items-js');
        this.navitems = htmlcolToObj(document.querySelectorAll('.menu-items-js ul li'));
        // this.content = document.querySelector('.open-menu-js');
        this.pubsub = PubSub.subscribe('one', function (msg, data) {
            console.log(msg, data);
        });
    }
    init () {
        this.toggleOpenMenu();
        this.setactive();
    }
    toggleOpenMenu () {
        this.menubtn.addEventListener('click', e => {
            e.preventDefault();
            this.content = document.querySelector('.open-menu-js');
            this.menubtn.classList.toggle('open-menu');
            this.menulistitem.classList.toggle('open-menu');
            this.content.classList.toggle('open-menu');
        });
    }
    setactive () {
        this.navitems.some( el => {
            el.addEventListener('click', link => {
                this.resetactive();
                link.target.parentElement.classList.add('active-item');
                PubSub.publish('one', '--');
                console.log('msg-publish');
            })
        })
    }
    resetactive () {
        this.navitems.filter( el => el.classList.remove('active-item'));
        this.pubsub;

        console.log('msg');
    }

}

class PageNavigate {

    constructor () {
        this.pages = [];
        this.canGo = true;
        this.currentPageNum = 1;
        this.currentPage;
        this.newpagenum;
        this.navtopage;

        this.scrollEvent();
        this.clickEvent();

        this.allpages();
        this.maxpage = this.pages.length;

        this.navigating ();

    }

    // get all pages
    allpages () {
        htmlcolToObj(document.querySelectorAll('.content')).filter( el => el.dataset.page ? this.pages.push(el) : true);
    }

    // scrolling page navigation
    scrollEvent() {
        window.addEventListener('wheel', e => {

            // delayed event for touchpad
            if( !this.canGo ) return;
            this.canGo = false;

            // get direction
            let direction = e.wheelDeltaY < 0 ? 1 : -1 ;

            // get number of next page
            this.newpagenum = this.currentPageNum + (direction);

            // set infinity scroll
            if( this.newpagenum > this.maxpage ) this.newpagenum = 1;
            if( this.newpagenum < 1 ) this.newpagenum = this.maxpage;

            PubSub.publish('gotopage', { from: this.currentPageNum, to: this.newpagenum, pages: this.pages});

            // set number of current page
            this.currentPageNum = this.newpagenum;

            setTimeout( () => {
                this.canGo = true;
            }, 1300);

        }, {passive: true})
    };

    // click
    clickEvent() {};

    navigating () {
        this.navtopage = PubSub.subscribe('gotopage', function (msg, data) {
            // console.log(msg, data);

            //  Changes page
            data.pages.filter( page => {
                page.dataset.page == data.to ? page.classList.add('is-active', 'open-menu-js') : page.classList.remove('is-active', 'open-menu-js');
            });

            // Changes Url
            data.pages.find( page => page.dataset.page == data.to ? history.pushState({}, page.dataset.pagename, page.dataset.pagename) : false );

        });
    }
}

let menu = new MainNav();
menu.init();

let navtopage = new PageNavigate();
