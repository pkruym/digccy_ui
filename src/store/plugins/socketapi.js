import { SocketAPI } from "@/assets/js/WsApi2";

// import { pullAll } from "lodash";

export default function createSocketAPI() {
  return store => {
    const findNameSpaceArr = path => {
      let arr = [];
      for (let i = 0; i < path.length; i++) {
        if (path[i] == "") continue;
        if (path[i] == "simulate") {
          arr.push("actual");
        } else {
          arr.push(path[i].toLowerCase());
        }
        if (store._modules.get(arr) === undefined) {
          arr.pop();
          break;
        }
      }
      return arr;
    };

    const littleCamelName = str => {
      var str = str.replace(/-(\w)/g, function($, $1) {
        return $1.toUpperCase();
      });
      return str;
    };

    const pullAll=(arr1,arr2)=>{
      let res=[];
        arr1.forEach((d) => {
          if(!arr2.includes(d))
            {
              res.push(d)
            }
        });
        return res
    }

    /*
            /push/tradeRecord
            /push/account
            /push/commodity
            /push/contract
        */
    SocketAPI.on("onPush", (router, acctype, data) => {
      let nameSpaceArr = findNameSpaceArr([acctype || "", router]);
      if (nameSpaceArr.length > 0) {
        let header = nameSpaceArr.join("/") + "/";

        let mutName = header + "mutOnPush";
        let actName = header + "actOnPush";

        if (store._mutations[mutName]) {
          store.commit(mutName, data);
        }
        if (store._actions[actName]) {
          store.dispatch(actName, data);
        }
      }
    });

    SocketAPI.on("defaultCallback", (cmd, data, message) => {
      let path = cmd.split("/").splice(1);
      let nameSpaceArr = findNameSpaceArr(path);
      if (nameSpaceArr.length > 0) {
        // 有对应模块。。加上 set小驼峰格式
        path=  pullAll(path, nameSpaceArr);
        if (path.indexOf("simulate") != -1) {
          path= pullAll(path, ["simulate"]);
        }
        // xxx/aaa/setIxxxMbbbb
        let header = nameSpaceArr.join("/") + "/";
        let mutName = header + littleCamelName("mut-" + path.join("-"));
        let actName = header + littleCamelName("act-" + path.join("-"));
        console.log("推送推送wwwwwwwwwwwwwwwwwwwwwww", mutName, data);
        // 调用
        if (store._mutations[mutName]) {
          // console.log("推送推送nnnnnnnnnnnnnnnnnnnnnn", mutName, data);
          store.commit(mutName, [data, message, cmd]);
        }
        if (store._actions[actName]) {
          store.dispatch(actName, [data, message, cmd]);
        }
      }
    });
  };
}
