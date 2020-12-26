<template>
  <div class="v-body">
    <canvas :width="canvas_width"
            :height="canvas_height"
            id="canvas"
            v-show="show_canvas"
            ref="canvasElement">
    </canvas>
    <img :src="sys"
         @click="openScan"
         class="btn-sys" />
  </div>
</template>

<script>
export default {
name: "Agent",
  data() {
    return {
      show_canvas: false,
      canvas_width: 100,
      canvas_height: 200,
      sys: null,

    }
  },
  methods: {
    //获取navigator 浏览器所有插件元素 调用摄像头 然后调用 requestAnimationFrame()方法,学过three就应该知道的
    openScan() {
      const videoParam={ video: { facingMode: { exact: 'environment' } } };
      navigator.mediaDevices.getUserMedia(videoParam).then((stream) => {
        this.video.srcObject=stream;
        this.video.setAttribute('playsinline',true);
        this.video.play();
        requestAnimationFrame(this.tick); r1
      })
    },
    //这里是截取canvas中的图形然后用jsqr进行解析如果解析出来就用canvas画上线然后在跳转至需要的页面
    //这里可以根据自己的需求改
    tick() {
      if(this.video.readyState===this.video.HAVE_ENOUGH_DATA) {
        this.show_canvas=true;
        this.canvas_height=this.video.videoHeight;
        this.canvas_width=this.video.videoWidth;
        !this.canvas2d&&(this.canvas2d=this.$refs.canvasElement.getContext('2d'));
        this.canvas2d.drawImage(this.video,0,0,this.canvas_width,this.canvas_height);
        var imageData=this.canvas2d.getImageData(0,0,this.canvas_width,this.canvas_height);
        var code=jsQR(imageData.data,imageData.width,imageData.height,{
          inversionAttempts: 'dontInvert'
        });
        if(code) {
          this.drawLine(code.location.topLeftCorner,code.location.topRightCorner,'#FF3B58');
          this.drawLine(code.location.topRightCorner,code.location.bottomRightCorner,'#FF3B58');
          this.drawLine(code.location.bottomRightCorner,code.location.bottomLeftCorner,'#FF3B58');
          this.drawLine(code.location.bottomLeftCorner,code.location.topLeftCorner,'#FF3B58');
          this.outputData=code.data;
          window.location.href=this.outputData
        } else {
          this.outputData=undefined;
        }
      }
      requestAnimationFrame(this.tick);
    },
    //这个就是canvas的函数了
    drawLine(begin,end,color) {
      this.canvas2d.beginPath();
      this.canvas2d.moveTo(begin.x,begin.y);
      this.canvas2d.lineTo(end.x,end.y);
      this.canvas2d.lineWidth=4;
      this.canvas2d.strokeStyle=color;
      this.canvas2d.stroke();
    }
  },
  // mounted() {
  //   this.openScan()
  // }
}
</script>

<style scoped>

</style>