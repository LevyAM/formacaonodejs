var Reader = require("./Reader");
var Writer = require("./Writer");
var Processor = require("./Processor");
var Table = require("./Table");
var HtmlParser = require("./HtmlParser");
var PDFWriter = require("./PDFWriter")


var reader = new Reader();
var writer = new Writer();

async function main() {
    var dados = await reader.Read("./users.csv");
    var dadosProcessados = Processor.Process(dados);
    var usuarios = new Table(dadosProcessados);
    var html = await HtmlParser.Parse(usuarios)
    writer.Write(Date.now() + ".html", html);
    PDFWriter.WritePDF(Date.now() + ".pdf",html);
}

main();