const initMenu = (burgerSelector,navSelector = '.nav') => {
    let burger = document.querySelector(burgerSelector);
    let nav = document.querySelector(navSelector);
    burger.addEventListener('click', (e)=>{
        burger.classList.toggle(`${burgerSelector.split('.')[1]}--active`);
        nav.classList.toggle(`${navSelector.split('.')[1]}--active`);
    })

}

const menuInMotion = (menuSelector = ".header")=>{
    let menu = document.querySelector(menuSelector)
    window.addEventListener('scroll',e=>{
        if(pageYOffset > 150){
            menu.classList.contains(`${menuSelector.split('.')[1]}--inmotion`)? "":
                menu.classList.add(`${menuSelector.split('.')[1]}--inmotion`)
        } else {
            !menu.classList.contains(`${menuSelector.split('.')[1]}--inmotion`)? "":
                menu.classList.remove(`${menuSelector.split('.')[1]}--inmotion`)
        }
    })
}

const initScrollToAnchors = (linkSelector = ".nav__item") => {
    let links = document.querySelectorAll(linkSelector);
    let targetArrayHash = []
    links.forEach(item =>{
      item.addEventListener('click',e=>{
          e.preventDefault();
          item.classList.contains(`nav__item--active`)? "":
              item.classList.add(`nav__item--active`)
          let elem = document.querySelector(e.target.hash);
          let posY = elem.getBoundingClientRect().top + pageYOffset;
          console.log(pageYOffset);
          window.scrollTo({
              top: posY,
              behavior:"smooth"
          })
      })
    })
    window.addEventListener('scroll',e=>{
        links.forEach((item,index)=>{
            !item.classList.contains(`nav__item--active`)? "":
                item.classList.remove(`nav__item--active`)
            let elem = document.querySelector('#' + item.href.split('#')[1])
            let elemPos = elem.getBoundingClientRect().top + pageYOffset;
            let elemHeight = elem.getBoundingClientRect().height;
            if(pageYOffset > elemPos - 50 && pageYOffset < elemPos+elemHeight){
                item.classList.contains(`nav__item--active`)? "":
                    item.classList.add(`nav__item--active`)
            } else {
                !item.classList.contains(`nav__item--active`)? "":
                    item.classList.remove(`nav__item--active`)
            }
        })
    })
}

initMenu('.burger-wrapper');
menuInMotion('.header');
initScrollToAnchors('.nav__item');