import * as phone from "./phone";
import * as f from "./fillzero";
import * as table from "./table";
import * as currency from "./currency";
import times from "./time";

export default {
  phoneHide: phone.phoneHide,
  fillzero: f.fillzero,
  fillFixed2: f.fillFixed2,
  fillFixed: f.fillFixed,
  state: table.state,
  minus2head: currency.minus2head,
  formatTime: times.formatTime
};
