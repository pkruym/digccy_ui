import i18n from "../../lang";

class H5PhoneCodeShow {
  constructor(countDown) {
    this.showContent = true;
    this.content = i18n.tc("send.sendCode");
    this._countDown = countDown || 60;
    this.countDown = this._countDown;
    this.timer = null;
  }

  decCountDown() {
    this.countDown--;
    if (this.countDown > 0) {
      this.timer = setTimeout(this.decCountDown.bind(this), 1000);
    } else {
      this.showContent = true;
      this.countDown = this._countDown;
    }
  }

  click() {
    if (this.showContent) {
      this.showContent = false;
      this.content = i18n.tc("send.resetCode");
      this.timer = setTimeout(this.decCountDown.bind(this), 1000);
    }
  }

  clear() {
    this.countDown = 60;
    this.showContent = true;
    this.timer && clearTimeout(this.timer);
  }
}

export let pcsRegister = new H5PhoneCodeShow();
export let pcsForget = new H5PhoneCodeShow();
export let pcsBindCard = new H5PhoneCodeShow();
export let pcsPayPwd = new H5PhoneCodeShow();
export let pcsPwd = new H5PhoneCodeShow();
