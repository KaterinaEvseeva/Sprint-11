import './pages/style.css';
import {Api} from './API';
import {Card} from './Card';
import {CardList} from './CardList';
import {FormValidator} from './FormValidator';
import {Popup} from './Popup';
import {UserInfo} from './UserInfo';

  const placesList = document.querySelector('.places-list');
  const openButton = document.querySelector('.user-info__button');
  const editButton = document.querySelector('.user-info__button_edit');
  const closeButton = document.querySelector('.popup__close');
  const closeButtonEdit = document.querySelector('.popup__close_edit');
  const form = document.forms.new;
  const editForm = document.forms.edit;
  const popupClosePhoto = document.querySelector('.popup__close_photo');
  const card = new Card();
  const cardCloseImage = new Card(document.querySelector('.popup__close_photo'));
  const popupNewPlace = new Popup(document.querySelector('.popup'));
  const popupEditProfile = new Popup(document.querySelector('.popup__edit-profile'));
  const formValidator = new FormValidator(document.querySelector('.popup__edit-profile'));
  const formValidatorCard = new FormValidator(document.querySelector('.popup__edit-card'));
  const api = new Api({
    baseUrl: (NODE_ENV === 'production' ? 'https://praktikum.tk/cohort9' : 'http://praktikum.tk/cohort9'),
    headers: {
      authorization: '1c40e787-d2f1-4812-aa9b-77e6ef33e269',
      'Content-Type': 'application/json'
    }
   });

  const userInfo = new UserInfo(
    editForm, document.querySelector('.user-info__name'),
    document.querySelector('.user-info__job'),
    document.querySelector('.user-info__photo'),
    api);

  const cardList = new CardList(placesList, card, form, api, userInfo);

  window.onload = function () {
    userInfo.userInfoLoad(this.userName, this.userData, this.avatar);
    formValidator.setEventListeners()
    formValidatorCard.setEventListeners();
  }
  api.getInitialCards()
    .then(data => cardList.render(data))
    .catch(err => {
      console.log(`Ошибка: ${err}`);
    });

  placesList.addEventListener('click', card.like);

  placesList.addEventListener('click', card.remove);

  document.forms.new.addEventListener('submit', (event) => {
    event.preventDefault(event);
    cardList.addCard(event);
    popupNewPlace.close(popupNewPlace);
    event.target.reset();
  })

  openButton.addEventListener('click', () => {
    popupNewPlace.open();
  });

  closeButton.addEventListener('click', () => {
    popupNewPlace.close();
  });

  editButton.addEventListener('click', () => {
    popupEditProfile.open();
    userInfo.setUserInfo();
  });

  closeButtonEdit.addEventListener('click', () => {
    popupEditProfile.close();
  });

  popupClosePhoto.addEventListener('click', () => {
    cardCloseImage.closeImage();
  })

  document.querySelector('.popup').addEventListener('submit', function (event) {
    if (event.type === 'submit' || event.key === 'Escape') {
      popupNewPlace.close();
    }
  });

  document.querySelector('#edit_form').addEventListener('submit', (event) => {
    event.preventDefault(event);
    const userName = event.target.querySelector('#nameValidation').value;
    const userData = event.target.querySelector('.popup__input_type_data').value;
    api.updateUserInfoApi(userName, userData)
      .then(data => {
        userInfo.updateUserInfo(data);
        popupEditProfile.close(popupEditProfile);
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      });
  })


