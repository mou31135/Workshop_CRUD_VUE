<template>
<div class="container fluid">
  <br />
  <div>
    <div class="card">
      <div class="card-header">
        <h2>รายการอาหาร</h2>
      </div>
      <div class="card-body">
        <table class="table table-hover">
          <thead>
            <tr>
              <th style="width: 8.33%">ลำดับ</th>
              <th style="width: 10%">รายการอาหาร</th>
              <th style="width: 31.66%">รูปภาพ</th>
              <th style="width: 10%%">ราคา</th>
              <th style="width: 31.66%">การดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(food,index) in $store.getters.arr_foods" :key="index">
              <td>{{ index + 1 }}</td>
              <td v-if="index !== editIndex">{{ food.name }}</td>
              <td v-if="index !== editIndex"> <img v-bind:src="food.picture" width="200px"></td>
              <td v-if="index !== editIndex">{{ food.price }}</td>
              <td v-if="index !== editIndex">
                <button type="button" class="btn btn-danger mr-2" v-on:click="deleteFood(index,food._id)">ลบ</button>
                <button type="button" class="btn btn-warning" v-on:click="openEdit(index,food)">แก้ไข</button>
              </td>

              <td v-if="index === editIndex">
                <input type="text" :value="food.name" class="form-control" v-on:change="name = $event.target.value" />
              </td>
              <td v-if="index === editIndex">
                <img v-if="imageData.length <= 0" v-bind:src="food.picture" width="200px">
                <div class="image-preview" v-if="imageData.length > 0">
                  <img class="preview" :src="imageData" width="200px">
                </div>
                <input type="file"  @change="previewImage" v-on:change="picture = $event.target.value" accept="image/*">
              </td>
              <td v-if="index === editIndex">
                <input type="number" :value="food.price" class="form-control" v-on:change="price = $event.target.value" />
              </td>
              <td v-if="index === editIndex">
                <button type="button" class="btn btn-success mr-2" v-on:click="editFood(food._id)">ยืนยัน</button>
                <button type="button" class="btn btn-secondary" v-on:click="closeEdit(index)">ยกเลิก</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      editIndex: -1,
      name: "",
      price: 0,
      imageData: ""
    };
  },
  created() {
    this.fetchFood();
  },
  methods: {
    fetchFood() {
      this.$store.dispatch("fetchFood");
    },
    deleteFood(index, _id) {
      let n_dat = {
        index: index,
        _id: _id
      };
      this.$store.dispatch("deleteFood", n_dat);
    },
    openEdit(index, food) {
      this.editIndex = index;
      this.name = food.name;
      this.price = food.price;
    },
    closeEdit(index) {
      this.editIndex = index - 1;
      this.name = "";
      this.imageData = "";
      this.price = 0;
    },
    editFood(_id) {
      let payload = {
        index: this.editIndex,
        _id: _id,
        name: this.name,
        picture: this.imageData,
        price: this.price
      };
      this.$store.dispatch("editFood", payload).then(this.closeEdit());
    },
    previewImage: function(event) {
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.imageData = e.target.result;
        }
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    }
  }
};
</script>
