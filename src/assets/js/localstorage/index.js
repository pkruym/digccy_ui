export let Storage = {
    setString: (key, value) => {
        window.localStorage.setItem(key, value)
    },
    getString: (key, value) => {
        return window.localStorage.getItem(key, value)
    },
    delString: (key) => {
        window.localStorage.removeItem(key)
    }
}

export let getUserFlag = (key) => {
    return Storage.getString("UserSelected_" + key) == "true" ? true : false;
}
export let setUserFlag = (key, bSelected) => {
    Storage.setString("UserSelected_" + key, bSelected ? "true" : "false")
}
export let Diskinfo={
    save: (diskstatus) => {
        return Storage.setString("t_diskinfo", `${diskstatus}`)
    },
}
export let AccountStorage = {
    save: ({account, password}) => {
        return Storage.setString("yt_acc_pwd", `${account}|${password}`)
    },
    load: () => {
        let str = Storage.getString("yt_acc_pwd")
        let acc = ''
        let pwd = ''
        if (str) {
            [acc, pwd] = str.split('|')
            if (!acc) {
                acc = ''
            }
            if (!pwd) {
                pwd = ''
            }
        }
        return { account: acc, password: pwd }
    }
}

