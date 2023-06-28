const cardMain = document.getElementsByClassName('js-card-container')[0]
const card = document.getElementsByClassName('js-card')
const openCardAdd = document.getElementsByClassName('js-open-add-card')[0]
const modal = document.getElementsByClassName('js-modal')[0]
const image = document.getElementsByClassName('js-preview-image')[0]
const color = document.getElementsByClassName('js-color')[0]
let inputs = document.getElementsByClassName('js-input')
inputs = [...inputs]
const save = document.getElementsByClassName('js-card-save')[0]

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

closeAddTagTriggerEvents('focusin','click')


class WebCard {
    constructor(title, subtitle, description, tags, icon, color, link, isFavorite){
        this.title = title || 'titulo'
        this.subtitle = subtitle || 'subtitulo'
        this.description = description || 'descricão'
        this.tags = tags || []
        this.icon = icon || './assets/icon.svg'
        this.color = color || '#111221'
        this.link = link || 'https://github.com/rcnald'
        this.isFavorite = isFavorite || false
    }
}

const addedTags = ['HTML','CSS','JS']

let cardPreview = {}

const cardes = []

cardes.push(new WebCard('Figma','Desktop','no description',['JS'], './assets/icon.svg', '#211221', 'https://link', true))

const createTags = (tagType, hasCloseButton, isSquare) => {
    const tag = document.createElement('li')
    tag.className = `o-tag o-tag--${tagType}`

    const tagNameBlind = document.createElement('span')
    tagNameBlind.className = "sr-only"

    const tagButton = document.createElement('button')
    tagButton.className = `o-tag__button ${isSquare ? `o-tag__button--square` : ``} js-tag`
    setAttributes(tagButton, ['aria-label',`Remover ${tagType} da lista de tags`], ['title',`Remover ${tagType} da lista de tags`])

    const tagName = document.createElement('span')
    tagName.className = "o-tag__name"
    tagName.textContent = `${tagType}`

    tag.appendChild(tagNameBlind)
    tag.appendChild(tagButton)
    tagButton.appendChild(tagName)

    if(hasCloseButton){
        setAttributes(tagButton, [`${isSquare ? `data-action` : `data-action`}`,'removeTagCard'], ['data-tagName',`${tagType}`])

        const tagClose = document.createElement('i')
        tagClose.className = "o-tag__close fa-solid fa-xmark"

        tagButton.appendChild(tagClose)
    }else{
        setAttributes(tagButton, [`${isSquare ? `data-action` : `data-action`}`,'addTagCard'], ['data-tagName',`${tagType}`])
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

    let remainTags = addedTags.filter(tag => !card.tags.includes(tag));

    remainTags.forEach(tag => {
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
    setAttributes(cardVisit, ['aria-label',`Visitar site ${card.title}`], ['href',`${card.link}`], ['target','_blank'])
    cardVisit.textContent = "Visitar"

    const save = document.createElement('input')
    save.className = `o-save ${card.isFavorite ? `fa-solid` : `fa-regular`} fa-regular fa-bookmark`
    setAttributes(save,['data-action','save'], ['aria-label',`adicionar ${card.title} como favorito`], ['aria-checked',`false`], ['type','checkbox'])

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

const createTagsPreview = () => {
    const tagContainer = document.getElementsByClassName('js-tag-container')[0]
    const containerTags = document.getElementsByClassName('js-tags-square')[0]
    const tags = document.getElementsByClassName('js-container-tags-square')[0]
    const title = document.getElementsByClassName('js-card-title')[0]
    const subtitle = document.getElementsByClassName('js-card-subtitle')[0]
    const description = document.getElementsByClassName('js-card-description')[0]

    tagContainer.innerHTML = ""
    containerTags.innerHTML = ""
    tags.innerHTML = ""

    if(!cardPreview.title) cardPreview.title = 'Title'
    title.textContent = cardPreview.title

    if(!cardPreview.subtitle) cardPreview.subtitle = 'Type'
    subtitle.textContent = cardPreview.subtitle

    if(!cardPreview.description) cardPreview.description = 'Here you can write, a basic description about the website'
    description.textContent = cardPreview.description

    cardPreview.tags.forEach(tag => {
        tags.appendChild(createTags(tag,true,true))
        tagContainer.appendChild(createTags(tag))
    })

    image.style = `--image-color:${cardPreview.color}`

    let remainTags = addedTags.filter(tag => !cardPreview.tags.includes(tag));

    remainTags.forEach(tag => {
        containerTags.appendChild(createTags(tag,false,true))
    })
}

const renderCards = () => {
    cardMain.innerHTML = ""

    cardes.forEach((card,i) => {
        cardMain.appendChild(createCards(card,i))
    })
}

const renderPreview = () => {
    

    createTagsPreview()
}

openCardAdd.addEventListener('click',() => {
    cardPreview = new WebCard('Title','Type','Here you can write, a basic description about the website',[],'./assets/icon.svg','#60a5fa','https://github/rcnald',false)
   
    const iconName = document.getElementsByClassName('js-icon-name')[0]
    setAttributes(iconName,['aria-label',"Nenhum ícone selecionado"])
    iconName.textContent = "Nenhum icone selecionado"

    let defaultTexts = ['title','subtitle','description']
    defaultTexts.forEach(text => {
        modal.getElementsByClassName(`js-card-${text}`)[0].textContent = cardPreview[text]
    })

    image.style = `--image-color:${cardPreview.color}`
    color.value = `${cardPreview.color}`
    save.classList.toggle(`${cardPreview.isFavorite ? `fa-solid` : `fa-regular`}`)
    inputs.forEach(input => {
        input.value = ""
    })

    modal.showModal()
    renderPreview()
})

modal.addEventListener('cancel', (event) => {
    event.preventDefault();
})

modal.addEventListener('click', e => {
    const target = e.target
    const action = target.getAttribute('data-action')

    let panel = e.target.closest('.js-panel')

    const actions = {
        closeModal(){
            modal.close()
        },
        addTagOpen(){
            const AddTag = panel.getElementsByClassName('js-add-tag')[0]
            AddTag.setAttribute('open','')
            target.setAttribute('aria-expanded','true')
        },
        addTagClose(){
            const AddTag = panel.getElementsByClassName('js-add-tag')[0]
            closeAddTag(AddTag)
        },
        addTagCard(){
            const tagName = target.getAttribute('data-tagname')
            cardPreview.tags.push(tagName)
            renderPreview()
        },
        removeTagCard(){
            const tagName = target.getAttribute('data-tagname')
            cardPreview.tags.splice(cardPreview.tags.indexOf(tagName),1)
            renderPreview()
        },
        save(){
            cardes.push(cardPreview)
            modal.close()
            renderCards()
        }
    }

    if(actions[action]) actions[action]()
})

modal.addEventListener('input', e => {
    const target = e.target
    const action = target.getAttribute('data-action')
    const text = target.getAttribute('data-text')

    const actions = {
        input(){
            cardPreview[text] = target.value
        },
        color(){
            cardPreview.color = target.value
        },
        icon(){
            const [file] = target.files
            cardPreview.icon = URL.createObjectURL(file)
            
            document.getElementsByClassName('js-preview-icon')[0].src = URL.createObjectURL(file)

            const iconName = document.getElementsByClassName('js-icon-name')[0]
            setAttributes(iconName,['aria-label',`${target.files[0].name} selecionado`])
            iconName.textContent = `${target.files[0].name}`
        },
        favorite(){
            cardPreview.isFavorite = !cardPreview.isFavorite
            if(cardPreview.isFavorite){
                save.classList.add(`fa-solid`)
                save.classList.remove(`fa-regular`)
            }else{
                save.classList.remove(`fa-solid`)
                save.classList.add(`fa-regular`)
            }
        }
    }

    if(actions[action]) actions[action]()

    renderPreview()
})

cardMain.addEventListener('click', e => {
    const target = e.target
    const action = target.getAttribute('data-action')

    if(!action) return

    let currentCard = e.target.closest('.js-card')
    let currentCardIndex = [...card].indexOf(currentCard)

    const actions = {
        addTagOpen(){
            let addTags = document.getElementsByClassName('js-add-tag')
            addTags = [...addTags]
            
            addTags.forEach(tag => {
                closeAddTag(tag,true)
            }) 
            
            let currentAddTag = currentCard.getElementsByClassName('js-add-tag')[0]
            currentAddTag.setAttribute('open','')
            target.setAttribute('aria-expanded','true')
        },
        addTagClose(){
            const currentAddTag = currentCard.getElementsByClassName('js-add-tag')[0]
            closeAddTag(currentAddTag)
        },
        addTagCard(){
            const currentTag = target.getAttribute('data-tagname')
            cardes[currentCardIndex].tags.push(currentTag)
            renderCards()
        },
        removeTagCard(){
            const currentTag = target.getAttribute('data-tagname')
            cardes[currentCardIndex].tags.splice(cardes[currentCardIndex].tags.indexOf(currentTag),1)
            renderCards()
        },
        save(){
            cardes[currentCardIndex].isFavorite = !cardes[currentCardIndex].isFavorite
            renderCards()
        }
    }

    if(actions[action]) actions[action]()
})

renderCards()
