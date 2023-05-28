<template>
  <div>
    <h1>Food List</h1>
    <ul>
      <li v-for="food in foodNames" :key="food">{{ food }}</li>
    </ul>
    <input type="file" @change="handleFileSelect" accept=".json">
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  data() {
    return {
      foodNames: []
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

        this.foodNames = foodNames;
      } catch (error) {
        console.error('파일을 처리하는 도중 오류가 발생했습니다:', error);
      }
    }
  }
}
</script>
