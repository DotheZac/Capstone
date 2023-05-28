import jsonParser from 'json-parser';
import fs from 'fs';

export function getFoodNames(callback) {
  const filePath = 'parser/src/assets/recipe.json';

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('파일을 읽는 도중 오류가 발생했습니다:', err);
      return;
    }

    const parsedData = jsonParser.parse(data);

    const resultLength = parsedData.result.length;
    const foodNames = [];

    for (let i = 0; i < resultLength; i++) {
      let food = parsedData.result[i];
      let classInfoLength = food.class_info.length;
      for (let j = 0; j < classInfoLength; j++) {
        let foodInfo = food.class_info[j];
        let foodName = foodInfo.food_name;
        foodNames.push(foodName);
      }
    }

    callback(foodNames);
  });
}
