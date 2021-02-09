 class Processor {

    static Process(data){
        var rowsplitter = data.split("\r\n")
        var rows = [];

        rowsplitter.forEach(row => {
            var arr = row.split(",")
            rows.push(arr);
        });

        return rows;
        
    }

 }

 module.exports = Processor;