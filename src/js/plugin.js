/* js */
function arrToObj(arr) {
    return [].slice.call(arr);
}

class OpenContactForm {

    constructor (element, btn) {
        this.contactform = element;
        this.arropenform = arrToObj(btn);
    }

    // open first in form contact in home
    formopen (){
        this.arropenform.find( el => el.addEventListener('click', () => this.contactform.classList.toggle('opened-form')));
    }

    // open sidebar
    openSidebar () {
        this.arropenform.find( el => el.addEventListener('click', () => {
            this.contactform.classList.toggle('opened-form');
            el.classList.toggle('opened-form');
        }));
    }

}

// Numbers things counter
class CounterProduct{
    constructor (btn) {
        this.btn = btn;
        this.bntGroup = arrToObj (btn);
    }

    start () {
        this.bntGroup.some(el => el.addEventListener('click', e => this.foo(e)));
    }

    foo (e) {
        let count = Number(e.target.closest('.wrap-count').querySelector('.count-number').value);

        e.target.matches('.count-minus') ? count-- : false;
        e.target.matches('.count-plus') ? count++ : false;

        if ( count <= 0 || isNaN(count) ) count = 1;

        e.target.closest('.wrap-count').querySelector('.count-number').value = count;

    }
}
// Card items
class Getactiveitemcard {

    constructor(element) {
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
    title () {
        let self = this;
        this.setActiveCardMaterial ();
        this.switchwindow ();
    }

    // Init
    color () {
        this.setActiveCardColor ();
    }

    setResultTitle () {
        this.resultTitle.textContent = this.activeItemsTitle ;
        this.resultImgTitleMaterialModal.textContent = this.activeItemsTitle;
        $('#materialCardsModal').modal('hide');
    }

    setResultImg () {
        this.resultImgSrc.attributes[0].value = this.activeItemsColor;
        this.resultImgSrceModal.attributes[0].value = this.activeItemsColor;
        this.resultImgTitle.textContent = this.activeItemsColorTitle;
        this.resultImgTitleModal.textContent = this.activeItemsColorTitle;
    }

    // Get title
    getActiveCardTitle () {
        this.arrItems.filter( item => {
            item.matches('.selected') ?
                this.activeItemsTitle =  item.children[0].children[0].children[1].innerHTML :
                false;
        });
        this.setResultTitle ();
    }

    // Get color
    getActiveCardColor () {
        this.arrItems.filter( item => {
            item.matches('.selected') ?
                this.activeItemsColor = item.children[0].children[0].children[0].attributes[0].value : 'false';
            item.matches('.selected') ?
                this.activeItemsColorTitle = item.children[0].children[1].children[0].innerHTML : 'false';
            console.log(this.activeItemsColor, this.activeItemsColorTitle);
        });
        this.setResultImg ();
    }

    // Set color
    setActiveCardColor () {
        this.setActiveCard(() => this.getActiveCardColor());
    }

    // Set material
    setActiveCardMaterial () {
        this.setActiveCard(() => this.getActiveCardTitle());

    }

    //Toggle set active item
    setActiveCard (i) {
        this.arrItems.find( item => item.addEventListener('click', () => {
            this.resetActiveCard ();
            !item.matches('.selected') ? item.classList.add('selected') : false;
            i();
        }));
    }

    // Reset active item
    resetActiveCard () {
        this.arrItems.filter( item => item.classList.remove('selected'));
    }

    switchwindow () {
        this.resultTitleModal.addEventListener('click', () => $('#colorCardsModal').modal('hide'));
    }
}
// Cart
class DeletItemInCart {
    constructor (btn) {
        this.btncloseitem = btn;
        this.arrbtncloseitem = arrToObj(btn);
        this.valuecounter = ''
    }

    init () {
        this.arrbtncloseitem.filter( el => {
            el.addEventListener('click', e => {

                this.valuecounter = e.path[2].children[0].children[1].value;

                // If element deleted set input value = 0
                e.path[2].children[0].children[1].value = 0;

                // Deleted card onclick
                e.path[5].classList.toggle('deleted');

            })
        });
    }
}
// Sidebar
class OpenCloseForm {
    constructor (){
        this.menuForm = document.body.querySelector('.menu-form');
        this.sidebarBtn = document.body.querySelector('.sidebar-btn');
        this.actionsBtns = arrToObj(document.body.querySelectorAll('.form-container .actions-btn-js'));
        this.formInputs = arrToObj(document.body.querySelectorAll('.ordering-form-inputs'));
        this.formBtns = arrToObj(document.body.querySelectorAll('.btn-toggle-js'));
    }


    // Click to btn in header for open sidebar
    openSidebar () {
        this.sidebarBtn.addEventListener('click', () => {
            this.menuForm.classList.toggle('opened-form');
            this.sidebarBtn.classList.toggle('opened-form');
            if (this.formInputs[0].matches('.d-none')) {
                this.formInputs.filter( el => el.classList.toggle('d-none'));
                this.formBtns.filter( btn => btn.classList.toggle('d-none'));
            }
        })
    }

    // Click to узнать больше in sidebar
    toggleForm () {
        this.actionsBtns.find( btnjs => btnjs.addEventListener('click', () => {
            if (!this.formInputs[0].matches('.d-none')){
                this.formInputs.filter( el => el.classList.toggle('d-none'));
                this.formBtns.filter( btn => btn.classList.toggle('d-none'));
            }
        }));
    }

    initial () {
        this.openSidebar ();
        this.toggleForm ();
    }

}
class CloseForm {
    constructor (section, btn){
        this.section = section;
        this.btn = btn;
    }

    onCloseForm () {
        window.addEventListener('scroll',() => {
            if (this.section.matches('.opened-form'))  this.section.classList.remove('opened-form');
            if (this.btn.matches('.opened-form'))  this.btn.classList.remove('opened-form')
        });
    }
}

let openCloseForm   = new OpenCloseForm();
let getMaterial     = new Getactiveitemcard(document.querySelectorAll('.material-cards-item'));
let getColor        = new Getactiveitemcard(document.querySelectorAll('.color-cards-item'));
let getContact      = new OpenContactForm( document.body.querySelector('.input-wrapper'), document.body.querySelectorAll('.actions-btn-js'));
let counter         = new CounterProduct(document.querySelectorAll('.wrap-count button'), document.querySelector('.count-number'));
let openedSidebar   = new OpenContactForm(document.body.querySelector('.menu-form'),document.body.querySelectorAll('.sidebar-btn'));
let closeForm       = new CloseForm(document.body.querySelector('.menu-form'), document.body.querySelector('.sidebar-btn'));
let deletcard       = new DeletItemInCart(document.querySelectorAll('.ordering-item .wrap-close-icon'));
