const { Aeroporto } = require("../classe/Aeroporto");
const { lerArquivo, salvarArquivo } = require("../promise");

const serverAeroportoPut = (req, res) => {
  var body = "";
  req.on("data", function (chunk) {
    body += chunk;
  });
  req.on("end", function () {
    const aeroportos = JSON.parse(body);
    const aeroporto = new Aeroporto(
      aeroportos.id,
      aeroportos.nome,
      aeroportos.codigo,
      aeroportos.endereco
    );
    console.log(aeroporto.getDadosCompletos());
    const aeroportoJson = JSON.stringify(aeroporto);
    salvarArquivo(`1A${aeroporto.id}.json`, JSON.stringify(aeroporto));
    res.writeHead(202, {
      "Content-Type": "application/json",
    });
    res.end(aeroportoJson);
  });
};

exports.serverAeroportoPut = serverAeroportoPut;
