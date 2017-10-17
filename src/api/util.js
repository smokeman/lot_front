// item,value 格式转换成json
exports.strToJsonArr = (str) => {
    str = "名称,数量," + str
    var arr = []
    var json = {}
    str.split(',').forEach((el,index)=>{
        if(index % 2 == 0){
            json = {}
            json["label"] = el
        }else{
            json["value"] = el
            arr.push(json)
        }
    })
    
    return arr
}

// 获得剩余天数
exports.getRemain = (dateStr) => {
    // dateStr:'2017-01-01'
    var nowYear = new Date().getFullYear()
    var nowMonth = new Date().getMonth() + 1
    var nowDay = new Date().getDate()

    var dateArr = dateStr.split('-')
    var listYear = parseInt(dateArr[0])
    var listMonth = parseInt(dateArr[1])
    var listDay = parseInt(dateArr[2])

    return (listYear - nowYear)*365 + (listMonth - nowMonth) * 30 + (listDay - nowDay)
}