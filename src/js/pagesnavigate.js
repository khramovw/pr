
class PageNavigate {

    constructor () {
        this.scrollEvent();
        this.clickEvent();
        this.canGo = true;
        this.curentPage = 1;
        this.maxpage = 3;

    }

    scrollEvent() {
        window.addEventListener('wheel', e => {

            if( !this.canGo ) return;
            this.canGo = false;

            let direction = e.wheelDeltaY < 0 ? 1 : -1 ;

            let newpage = this.curentPage + (direction);

            if( newpage > this.maxpage ) newpage = 1;
            if( newpage < 1 ) newpage = this.maxpage;

            this.curentPage = newpage;
            console.log(typeof direction, this.curentPage);

            setTimeout( () => {
                this.canGo = true;
            }, 1300)

        }, {passive: true})
    };
    clickEvent() {};
}

let navtopage = new PageNavigate();