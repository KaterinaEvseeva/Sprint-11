export class UserInfo {
    constructor(form, userName, userData, avatar, api) {
      this.form = form;
      this.userName = userName;
      this.userData = userData;
      this.avatar = avatar;
      this.api = api;
    }

    userInfoLoad() {
      this.api.getUserInfoFromServer()
      .then((res) => {
            this.userName.textContent= res.name;
            this.userData.textContent= res.about;
            this.avatar.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch(err => {
      console.log(`Ошибка в userInfoLoad: ${err}`);
    });

    }

    setUserInfo() {
    this.form.userName.value = this.userName.textContent;
    this.form.userData.value = this.userData.textContent;
 
   }
    updateUserInfo(data) {
    this.userName.textContent = data.name;
    this.userData.textContent = data.about;
    }
  }

