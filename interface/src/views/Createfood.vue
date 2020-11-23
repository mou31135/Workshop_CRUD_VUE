<template>
<div class="container fluid">
  <br />
  <div>
    <div class="card">
      <div class="card-header">
        <h2>เพิ่มรายการอาหาร</h2>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="Create_Food()">
          <div class="form-group">
            <label>ชื่ออาหาร</label>
            <input type="text" class="form-control" placeholder="ระบุรายการอาหาร" v-model="name" />

          </div>
          <div class="form-group">
            <label>ราคาอาหาร</label>
            <input type="number" class="form-control" placeholder="ระบุราคาอาหาร" v-model="price" />
          </div>
          <div class="form-group">
            <label>รูป</label>
            <input type="file" @change="previewImage" accept="image/*">
            <div class="image-preview" v-if="imageData.length > 0">
              <img class="preview" :src="imageData">
            </div>
          </div>
          <button type="submit" class="btn btn-primary">เพิ่มรายการอาหาร</button>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      price: 0,
      imageData: ""
    };
  },
  methods: {
    Create_Food() {
      if (this.name) {
        let n_dat = {
          name: this.name,
          price: this.price,
          picture: this.imageData,

        };
        this.$store.dispatch("addFood", n_dat);
      }
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
