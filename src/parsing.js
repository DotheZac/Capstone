const jsonParser = require('json-parser');
const fs = require('fs');

// 파일 경로 설정, 여기에서 json파일 위치 설정해줘야 됨
const filePath = 'parser/src/assets/recipe.json';

// 파일 읽기
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('파일을 읽는 도중 오류가 발생했습니다:', err);
        return;
    }

    const parsedData = jsonParser.parse(data);

    // result 확인
    if (!parsedData.result || parsedData.result.length === 0) {
        console.error('결과가 없습니다.');
        return;
    }
    // 첫 번째 음식 사진 정보 가져오기, 해당 사진에는 짜장면과 단무지가 있어서 이건 짜장면 가져온것
    const firstResult = parsedData.result[0];

    // 첫 번째 결과의 음식 정보 가져오기, class_info의 인덱스값에 따라 짜장면, 짜장밥등을 가져옴
    const foodInfo = firstResult.class_info[0];

    // 음식 이름 가져오기
    const foodName = foodInfo.food_name;
    console.log('음식 이름:', foodName);

    // 음식 영양성분 정보 가져오기
    const nutrients = foodInfo.food_nutrients;
    console.log('음식 영양성분 정보:', nutrients);

    // 음식의 1회 제공량당 열량 정보 가져오기
    const servingCalories = nutrients['1회제공량당_영양성분']['열량(kcal)'];
    console.log('1회 제공량당 열량:', servingCalories);

    // 음식의 100g당 탄수화물 정보 가져오기
    const carbPer100g = nutrients['100g당_영양성분']['탄수화물']['총량(g)'];
    console.log('100g당 탄수화물:', carbPer100g);

    const protinPer100g = nutrients['100g당_영양성분']['단백질(g)'];
    console.log('100g당 단백질:', protinPer100g);

//  const secondResult = parsedData.result[1];

});