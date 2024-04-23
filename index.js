import { encoded, translations } from './data.js'

function decodeFields(encodedData, translations) {
  const decodedData = []
  const uniqueIds = new Set() //для хранения id

  //перебираем объекты из encoded
  encodedData.forEach(item => {
    const decodedItem = {}

    //перебираем ключи объекта
    Object.keys(item).forEach(key => {
      if (
        key.endsWith('Id') &&
        !['groupId', 'service', 'formatSize', 'ca'].includes(key)
      ) {
        const translationKey = item[key]
        const decodedValue = translations[translationKey] || translationKey
        decodedItem[key] = decodedValue //расшифровываем значение и добавляем его в объект
        uniqueIds.add(translationKey) //добавляем id в список уникальных идентификаторов
      } else {
        //если ключ не заканчивается на Id или нет в списек исключений оставляем значение неизменным
        decodedItem[key] = item[key]
      }
    })

    decodedData.push(decodedItem) //расшифрованный объект в итоговый список
  })

  return { decodedData, uniqueIds: Array.from(uniqueIds) } //расшифрованные данные и список уникальных id
}

console.log("Let's rock")
console.log(encoded, translations)

console.log(decodeFields(encoded, translations))
