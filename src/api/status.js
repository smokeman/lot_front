const status = {
    __begin: 0,
    __login: 1,
    __new: 2,
    __ing: 3,
    __joined: 4,
    __ending: 5,
    __end_wait:9,
    __end: 6,
    wine_owner:{
        // 管理员
        // 存－－－－－－
        // 初始化
        __begin:0,
        // 点击存酒
        __new:1,
        // 点击保存
        __saveing:2,
        // 保存完毕－后台获得wine_id－用于生成二维码
        __saveed:3,
        // 玩家扫描完成通知管理员
        __scaned:4,
        // 取－－－－－
        // 扫码取酒完成显示
        __pulled:5,
        // 完成取酒点击取－改变状态-并显示当日取酒单
        __end:6
    },
    wine_actor:{
        // 玩家－存
        // 初始化
        __begin:0,
        // 扫码后展示清单
        __scaned:1,
        // 确认后改变状态update
        __updateing:2,
        // 修改状态完成后告诉管理员办理成功
        __updated:3
    }
}

module.exports = status