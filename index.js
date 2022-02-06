const csv = require('fast-csv')
const fs = require('fs')

function prepareData(data) {
  return {
    name: data['Nome'],
    age: data['Idade'],
    email: data['Email'],
    address: data['endereço']
  }
}

function readFile(fileStream) {
  console.log('Leitura dos dados')
  const userData = [];

  return new Promise(resolve => {
    fileStream.pipe(csv.parse({
        headers: true
      }))
      .on('data', data => userData.push(prepareData(data)))
      .on('end', () => resolve(userData));
  })
}

async function start() {
  try {
    console.log('Inicio do processo!')

    const fileStream = fs.createReadStream(__dirname + '/csv/data.csv')

    const userData = await readFile(fileStream)

    console.log('Criação do JSON')
    fs.writeFileSync(__dirname + '/json/data.json', JSON.stringify(userData))

    console.log('Dados processados!')
  } catch (e) {
    console.error(e)
  }
}

start()