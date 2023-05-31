<template>
  <div>
    <h1>Food List</h1>
    <ul>
      <li v-for="food in foodInfos" :key="food.foodName">{{ food.foodName }}
        <ul>
          <li>칼로리: {{ food.foodCalorie }}</li>
          <li>탄수화물: {{ food.foodCarb }}</li>
          <li>단백질: {{ food.foodProtein }}</li>
          <li>지방: {{ food.foodFat }}</li>
        </ul>
      </li>
    </ul>
    <input type="file" @change="handleFileSelect" accept=".json">
  </div>
</template>

<script>
export default {
  name: 'JSONParser',
  data() {
    return {
      foodInfos: []
    };
  },
  methods: {
    handleFileSelect(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const contents = e.target.result;
        this.processFileContents(contents);
      };

      reader.readAsText(file);
    },
    processFileContents(contents) {
      try {
        const parsedData = JSON.parse(contents);
        const resultLength = parsedData.result.length;
        const foodInfos = [];

        for (let i = 0; i < resultLength; i++) {
          let food = parsedData.result[i];
          let classInfoLength = food.class_info.length;
          for (let j = 0; j < classInfoLength; j++) {
            let foodInfo = food.class_info[j];
            let foodName = foodInfo.food_name;
            let foodNut = foodInfo.food_nutrients['1회제공량당_영양성분'];
            let foodCalorie = foodNut['열량(kcal)'];
            let foodCarb = foodNut['탄수화물']['총량(g)']
            let foodProtein = foodNut['단백질(g)']
            let foodFat = foodNut['지방']['총량(g)']

            foodInfos.push({ foodName, foodCalorie,foodCarb, foodProtein, foodFat });
            
          }
        }

        this.foodInfos = foodInfos;
      } catch (error) {
        console.error('파일을 처리하는 도중 오류가 발생했습니다:', error);
      }
    }
  }
}
</script>