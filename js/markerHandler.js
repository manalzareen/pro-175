var modelList = [];
AFRAME.registerComponent("markerhandler", {
  init: async function () {
    var compounds = await this.getCompounds();

    this.el.addEventListener("markerFound", () => {
      var elementName = this.el.getAttribute("model_name");
      var barcodeValue = this.el.getAttribute("value");
      elementsArray.push({ model_name: modelName, barcode_value: barcodeValue });

      model[barcodeValue]["model"].map(item => {
        var model = document.querySelector(`#${item.model_name}-${barcodeValue}`);
        model.setAttribute("visible", false);
      });

      var item = document.querySelector(`#${modelName}-${barcodeValue}`);
      item.setAttribute("visible", true);

    });

    this.el.addEventListener("markerLost", () => {
      var modelName = this.el.getAttribute("model_name");
      var index = modelsArray.findIndex(x => x.model_name === modelName);
      if (index > -1) {
        modelsArray.splice(index, 1);
      }
    });
  },

  isModelPresentInArray:function(arr,val){
    for (var i of arr){
      if(i.model_name === val){
        return true;
      }
    }
    return false; 
  },


  tick:async  function () {

    if(modelList.length > 1){
    var isBaseModelPresent = this.isBaseModelPresent(modelList,"base");
    var messageText = document.querySelector("#message-text");
    
    if (!isBaseModelPresent){
      messageText.setAttribute("visible",true);
    }else {
      if(models === null){
        models = await this.getModels();
      }
      messageText.setAttribute("visible",false);
      this.placeTheModel("road",models);
      this.placeTheModel("car",models);
      this.placeTheModel("building1",models);
      this.placeTheModel("building2",models);
      this.placeTheModel("building3",models);
      this.placeTheModel("tree",models);
      this.placeTheModel("sun",models);

    }
    }
  },
  getDistance: function (elA, elB) {
    return elA.object3D.position.distanceTo(elB.object3D.position);
  },
  
  getModelGeometry: function(models, modelName) {
    var barcodes = Object.keys(models);
    for (var barcode of barcodes){
      if(models[barcode].model_name === modelName) {
        return{
          position :models[barcode]["placement_position"],
          rotation :models[barcode]["placement_rotation"],
         scale:models[barcode]["placement_scale"],
         model_url: models[barcode]["model_url"]
        }
      }
    }
  },
  
  
 
});
