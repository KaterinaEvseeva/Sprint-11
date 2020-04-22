export class Card {
  constructor(link, name) {
    this.link = link;
    this.name = name;
  }

  like(event) {
    if (event.target.classList.contains('place-card__like-icon')) {
      event.target.classList.toggle('place-card__like-icon_liked');
    }
  };
  remove(event) {
    if (event.target.closest('.place-card__delete-icon')) {
      const cardElement = event.target.closest('.place-card');
      document.querySelector('.places-list').removeChild(cardElement);
    }
  }

  create(linkValue, nameValue) {
    /*  Можно лучше:
    *  Альтернативный способ создания карточки. При нем не требуется создавать вручную все
    * Вы можете реализовать функцию, которая сразу же возвращает “кусок” разметки. Это решает проблему постоянного createElement DOM-элементов.
     function getTemplate(data){
       const template = `<div class="place-card">
                   <div class="place-card__image" style="background: url(${data.link})">
                     <button class="place-card__delete-icon"></button>
                   </div>
                   <div class="place-card__description">
                     <h3 class="place-card__name">${data.name}</h3>
                     <button class="place-card__like-icon"></button>
                   </div>
                 </div>`
     return template;
     }
    *  Этот кусок разметки в дальнейшем можно вставить в DOM, воспользовавшись методом insertAdjacentHTML().
    *  https: //developer.mozilla.org/ru/docs/Web/API/Element/insertAdjacentHTML
    *    pointElement.insertAdjacentHTML('afterend', getTemplate(data));
    */
    const cardElement = document.createElement('div');
    const imageElement = document.createElement('div');
    const deleteIconElement = document.createElement('button');
    const descriptionElement = document.createElement('div');
    const nameElement = document.createElement('h3');
    const likeIconElement = document.createElement('button');

    cardElement.classList.add('place-card');
    imageElement.classList.add('place-card__image');
    imageElement.style.backgroundImage = 'url(' + linkValue + ')';
    deleteIconElement.classList.add('place-card__delete-icon');
    descriptionElement.classList.add('place-card__description');
    nameElement.classList.add('place-card__name');
    nameElement.textContent = nameValue;
    likeIconElement.classList.add('place-card__like-icon');

    const placesList = document.querySelector('.places-list');
    placesList.appendChild(cardElement);
    cardElement.appendChild(imageElement);
    cardElement.appendChild(descriptionElement);
    imageElement.appendChild(deleteIconElement);
    descriptionElement.appendChild(nameElement);
    descriptionElement.appendChild(likeIconElement);


    cardElement.addEventListener('click', this.openImage.bind(this));

    return cardElement;
  }

  openImage(event) {

    if (event.target.classList.contains('place-card__image')) {
      const imagePath = event.target.getAttribute('style');
      document.querySelector('.popup__photo').classList.add('popup_is-opened');
      document.querySelector('.popup__content-photo').setAttribute('style', imagePath);
    }
  }

  closeImage() {
    document.querySelector('.popup__photo').classList.remove('popup_is-opened');
    document.querySelector('.popup__content-photo').removeAttribute('style', this.imagePath);

  }
}
