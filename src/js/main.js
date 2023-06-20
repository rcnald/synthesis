const cardMain = document.getElementsByClassName('js-card-container')[0]

const closeAddTag = (addTag, isNotOnlyOne) => {
    addTag.removeAttribute('open')
    addTag.parentElement.querySelector('.js-add-open').setAttribute('aria-expanded','false')
    
    if(isNotOnlyOne) return

    addTag.setAttribute('closing','')
    setTimeout(() => {
        addTag.removeAttribute('closing')
    },300)
} 

const closeAddTagOutside = e => {
    let isAddTagOpen = document.querySelectorAll('.js-add-tag[open]')
    isAddTagOpen = [...isAddTagOpen]
    
    if(!isAddTagOpen) return
    
    const target = e.target
    let buttons = document.querySelectorAll('.js-add-open')
    buttons = [...buttons]

    const isAddTag = target.closest('.js-add-tag')

    const isAddButton = buttons.some(button => {
        return target === button
    })
    
    if(!isAddTag && !isAddButton){
        isAddTagOpen.forEach(tag => {
            closeAddTag(tag)
        })
    }
}

const closeAddTagTriggerEvents = function() {
    const events = [...arguments]

    events.forEach(e => {
        document.addEventListener(e, closeAddTagOutside)
    });

}

const setAttributes = function (element) {
    const attributes = [...arguments]

    attributes.forEach(attribute => {
        if(Array.isArray(attribute)) element.setAttribute(...attribute)
    })
}

cardMain.addEventListener('click', e => {
    const target = e.target
    const action = e.target.getAttribute('data-action')

    if(!action) return

    let currentCard = e.target.closest('.js-card')

    const actions = {
        addTagOpen(){
            let addTags = document.getElementsByClassName('js-add-tag')
            addTags = [...addTags]

            addTags.forEach(tag => {
                closeAddTag(tag,true)
            }) 

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


class WebCard {
    constructor(title, subtitle, description, tags, icon, color, link, isFavorite){
        this.title = title
        this.subtitle = subtitle
        this.description = description
        this.tags = tags || []
        this.icon = icon || './assets/icon.svg'
        this.color = color || '#111221'
        this.link = link || 'https://github.com/rcnald'
        this.isFavorite = isFavorite || false
    }
}

const addedTags = ['HTML','CSS','JS']

const cardes = []

cardes.push(new WebCard('Figma','Desktop','no description',['JS'], './assets/icon.svg', '#211221', 'https://link', true))

const createTags = (tagType, hasCloseButton) => {
    const tag = document.createElement('li')
    tag.className = `o-tag o-tag--${tagType}`

    const tagNameBlind = document.createElement('span')
    tagNameBlind.className = "sr-only"

    const tagButton = document.createElement('button')
    tagButton.className = "o-tag__button"
    setAttributes(tagButton, ['aria-label',`Remover ${tagType} da lista de tags`], ['title',`Remover ${tagType} da lista de tags`])

    const tagName = document.createElement('span')
    tagName.className = "o-tag__name"
    tagName.textContent = `${tagType}`

    tag.appendChild(tagNameBlind)
    tag.appendChild(tagButton)
    tagButton.appendChild(tagName)

    if(hasCloseButton){
        const tagClose = document.createElement('i')
        tagClose.className = "o-tag__close fa-solid fa-xmark"

        tagButton.appendChild(tagClose)
    }

    return tag
}

const createCards = (card, i) => {
    const cards = document.createElement('article')
    cards.className = "c-card js-card"

    const cardContent = document.createElement('div')
    cardContent.className = "c-card__content"

    const cardHeader = document.createElement('div')
    cardHeader.className = "c-card__header" 

    const cardTitle = document.createElement('h1')
    cardTitle.className = "c-card__title"
    cardTitle.textContent = `${card.title}` 

    const cardSubtitle = document.createElement('h2')
    cardSubtitle.className = "c-card__type"
    cardSubtitle.textContent = `${card.subtitle}` 

    const cardTags = document.createElement('ul')
    cardTags.className = "c-card__tags c-card__tags--row"

    card.tags.forEach(tag => {
         cardTags.appendChild(createTags(tag, true))
    })

    const cardAddTags = document.createElement('li')
    cardAddTags.className = "o-tag o-tag--add"

    const cardAddButton = document.createElement('button')
    cardAddButton.className = "o-tag__button o-tag__button--add js-add-open"
    setAttributes(cardAddButton, ['data-action','addTagOpen'], ['id',`add-tags-${i}`], ['aria-expanded',`false`], ['aria-label','adicionar mais uma tag ao card'], ['aria-controls',`tags-${i}`])
    cardAddButton.textContent = "tag +"

    const cardAddContainer = document.createElement('div')
    cardAddContainer.className = "c-card__add-tag c-card__add-tag--row js-add-tag"
    setAttributes(cardAddContainer, ['data-action','addTag'], ['id',`tags-${i}`], ['aria-labelledby',`add-tags-${i}`])

    const cardWrapper = document.createElement('div')
    cardWrapper.className = "c-card__wrapper"

    const cardTitleSmall = document.createElement('h3')
    cardTitleSmall.className = "c-card__title c-card__title--small"
    cardTitleSmall.textContent = "Escolher tags"

    const cardClose = document.createElement('button')
    cardClose.className = "c-card__close fa-solid fa-xmark"
    setAttributes(cardClose, ['data-action','addTagClose'], ['aria-label','fechar janela que adiciona tags ao card'])

    const cardContainer = document.createElement('ul')
    cardContainer.className = "c-card__container"

    addedTags.forEach(tag => {
        cardContainer.appendChild(createTags(tag))
    })

    const cardDescription = document.createElement('p')
    cardDescription.className = "c-card__description"
    cardDescription.textContent = `${card.description}`

    const cardImage = document.createElement('picture')
    cardImage.className = "c-card__image"
    setAttributes(cardImage, ['aria-hidden','true'], ['style',`--image-color:${card.color}`])

    const cardIcon = document.createElement('img')
    cardIcon.className = "c-card__icon"
    setAttributes(cardIcon, ['src',`${card.icon}`], ['alt',`Icone do site ${card.title}`])

    const line = document.createElement('hr')
    line.className = "o-line c-card__line"

    const cardWrapperFade = document.createElement('div')
    cardWrapperFade.className = "c-card__wrapper c-card__wrapper--fade"

    const cardVisit = document.createElement('a')
    cardVisit.className = "c-card__button"
    setAttributes(cardVisit, ['aria-label',`Visitar site ${card.title}`], ['href',`${card.link}`])
    cardVisit.textContent = "Visitar"

    const save = document.createElement('input')
    save.className = `o-save fa-regular fa-bookmark`
    setAttributes(save, ['aria-label',`adicionar ${card.title} como favorito`], ['aria-checked',`false`], ['type','checkbox'])

    cards.appendChild(cardContent)
    cardContent.appendChild(cardHeader)
    cardHeader.appendChild(cardTitle)
    cardHeader.appendChild(cardSubtitle)
    cardContent.appendChild(cardTags)
    cardTags.appendChild(cardAddTags)
    cardAddTags.appendChild(cardAddButton)
    cardAddTags.appendChild(cardAddContainer)
    cardAddContainer.appendChild(cardWrapper)
    cardWrapper.appendChild(cardTitleSmall)
    cardWrapper.appendChild(cardClose)
    cardAddContainer.appendChild(cardContainer)
    cardContent.appendChild(cardDescription)
    cardContent.appendChild(cardImage)
    cardImage.appendChild(cardIcon)
    cardContent.appendChild(line)
    cardContent.appendChild(cardWrapperFade)
    cardWrapperFade.appendChild(cardVisit)
    cardWrapperFade.appendChild(save)

    return cards
}

const renderCards = () => {
    cardes.forEach((card,i) => {
        cardMain.appendChild(createCards(card,i))
    })
}
renderCards()