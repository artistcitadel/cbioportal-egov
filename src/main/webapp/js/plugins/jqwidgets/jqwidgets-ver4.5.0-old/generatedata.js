function generatedata(rowscount, hasNullValues) {
    // prepare the data
    var data = new Array();
    if (rowscount == undefined) rowscount = 100;
    var section =
    [
        "코호트연구", "단면연구", "사례-대조연구"
    ];

    var qualificationNum =
    [
        "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ];

    var yn =
    [
        "O", "X"
    ];
    
    var ynChk =
        [
            "승인대기", "승인완료", ""
        ];

    for (var i = 0; i < rowscount; i++) {
        var row = {};

        row["id"] = i;
        row["section"] = section[Math.floor(Math.random() * 3)];
        row["qualification"] = row["section"] + qualificationNum[Math.floor(Math.random() * 9)];
        row["item"] = yn[Math.floor(Math.random() * 2)];
        row["save"] = yn[Math.floor(Math.random() * 2)];
        row["review"] = yn[Math.floor(Math.random() * 2)];
        row["req"] = yn[Math.floor(Math.random() * 2)];
        row["yn"] = ynChk[Math.floor(Math.random() * 3)];

       
        data[i] = row;
    }
    
    var myData = [{'TotalRows':100, 'Rows':''}];
    myData[0]['Rows'] = data;

    return myData;
}