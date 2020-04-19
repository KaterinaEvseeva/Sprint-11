class CardList {
  constructor(container, card, addForm, api, userInfo) {
    this.container = container;
    this.card = card;
    this.addForm = addForm;
    this.api = api;
    this.userInfo = userInfo;
    //this.cards = [];
  }

  addCard() {
    event.preventDefault();
    const linkValue = this.addForm.elements.link.value;
    const nameValue = this.addForm.elements.name.value;
    this.cardElement = this.card.create(linkValue, nameValue);
  }

  render(data) {
    for (const value of data) {
      this.data = data;
      let nameValue = value.name;
      let linkValue = value.link;
      const cardElement = this.card.create(linkValue, nameValue);
    }
  }
}