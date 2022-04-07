import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

// В данном примере метод join позволяет соеденить homedir(моя корневая папка) и конкретно название файла, который мы хотит создать 
const filePath = join(homedir(), 'weather-data.json');

const saveKey = async (key, value) => {
  let data = {};

  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }

  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
}

const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }

  return undefined;
}

const isExist = async (path) => {
  try {
    // Метод stat проверяет есть ли в файле какая-то запись и если есть то проходит, нет - падает
    await promises.stat(path);
    return true;
  } catch (error) {
    return false;
  }
}

export { saveKey, getKeyValue  };
// {
//   // Отображает последний асположений файл или папку
//   console.log(basename(filePath));
//   // Отображает полный путь к последнему файлу или папке
//   console.log(dirname(filePath));
//   // Отображает расширение последнего файла
//   console.log(extname(filePath));
//   // Показывает первый файлл относительно второго файла
//   console.log(relative(filePath, dirname(filePath)));
//   // Отображает булевое значение абсолютности пути
//   console.log(isAbsolute(filePath));
//   // Resolve показывает какой будет путь при определенно заданом значении выйти из папки или войти(для примера)
//   console.log(resolve('..'));
//   // Показывает какой сепаратор(разедлитель между путями) у нашей ос
//   console.log(sep);
// }
