const cardContainer = document.getElementsByClassName('js-card-container')[0]

const closeAddTag = (addTag) => {
    addTag.removeAttribute('open')
    addTag.setAttribute('closing','')
    addTag.parentElement.querySelector('.js-add-open').setAttribute('aria-expanded','false')
    setTimeout(() => {
        addTag.removeAttribute('closing')
    },300)
} 

const closeAddTagOutside = e => {
    const isAddTagOpen = document.querySelector('.js-add-tag[open]')
    
    if(!isAddTagOpen) return
    
    const target = e.target
    const button = document.querySelector('.js-add-open')
    
    const isAddTag = target.closest('.js-add-tag')
    const isAddButton = target === button
    
    if(!isAddTag && !isAddButton){
        closeAddTag(isAddTagOpen)
    }
}

const closeAddTagTriggerEvents = function() {
    const events = [...arguments]

    events.forEach(e => {
        document.addEventListener(e, closeAddTagOutside)
    });

}

cardContainer.addEventListener('click', e => {
    const target = e.target
    const action = e.target.getAttribute('data-action')

    if(!action) return

    let currentCard = e.target.closest('.js-card')

    const actions = {
        addTagOpen(){
            const currentAddTag = currentCard.getElementsByClassName('js-add-tag')[0]
            currentAddTag.setAttribute('open','')
            target.setAttribute('aria-expanded','true')
        },
        addTagClose(){
            const currentAddTag = currentCard.getElementsByClassName('js-add-tag')[0]
            closeAddTag(currentAddTag)
        },
    }

    if(actions[action]) actions[action]()
})

closeAddTagTriggerEvents('focusin','click')


class WebCard{
    constructor(title, subtitle, description, tags, icon, color, link, isFavorite){
        this.title = title
        this.subtitle = subtitle
        this.description = description
        this.tags = tags || {}
        this.icon = icon 
        this.color = color || '#111221'
        this.link = link || 'https://github.com/rcnald'
        this.isFavorite = isFavorite || false
    }
}

const cards = []

const createCards = () => {
    const card = document.createElement('article')
    card.className = "c-card js-card"

    const cardContent = document.createElement('div')
    cardContent.className = "c-card__content"

    const cardHeader = document.createElement('div')
    cardHeader.className = "c-card__header" 

    const cardTitle = document.createElement('h1')
    cardTitle.className = "c-card__title" 

    const cardSubtitle = document.createElement('h2')
    cardSubtitle.className = "c-card__subtitle"

    const cardTags = document.createElement('ul')
    cardTags.className = "c-card__tags c-card__tags--row"
}

const createTags = tags => {
    if(!tags) return

    const tag = document.createElement('li')
    tag.className = `o-tag o-tag--`

    const tagNameBlind = document.createElement('span')
    tagNameBlind.className = "sr-only"

    const tagButton = document.createElement('button')
    tagButton.className = "o-tag__button"
    tagButton.setAttribute('aria-label',`Remover  da lista de tags`)
    tagButton.setAttribute('title',`Remover  da lista de tags`)

    const tagName = document.createElement('span')
    tagName.className = "o-tag__name"

    const tagClose = document.createElement('i')
    tagClose.className = "o-tag__close fa-solid fa-xmark"
}

const renderCards = () => {

}