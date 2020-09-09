---
title: "[Vue] 세상에서 제일 쉬운 드래그앤드랍"
excerpt: "Javascript"
categories:
  - Javascript
---

![스크린샷 2020-08-19 오후 6.55.54.png_1597830993959](https://firebasestorage.googleapis.com/v0/b/twl-image-storage.appspot.com/o/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202020-08-19%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%206.55.54.png_1597830993959?alt=media&token=298da6e6-9ed7-490a-9776-a6728c990237)

## intro

드롭다운으로 이미지를 불러오고 이를 스토리지에 저장, 프로필 이미지를 변경하는 동시에 저장된 url을 리턴하는 과정을 구현하고자 한다. 스토리지는 파이어베이스를 활용하였고 DB에는 해당 스토리지 url을 저장함으로써 DB에 저장되는 데이터의 부하를 줄이고자 하였다. 



#### 패키지 다운로드

```bash
$ npm i vue2-dropzone
```



#### data

```javascript
data() {
    return {
      images: null,
    };
  },
```



## 드롭다운 파일존 사용하기

### template

- 매번 드롭존을 노출하지 않고 사용자가 클릭을 했을 경우에만 드롭존 노출
- `afterComplete` 매서드 실행을 통해 이미지를 스토리지에 저장하고 
- 프로필을 변경한 이후
- 백앤드에 변경된 url 변경 요청

```html
<img v-if="userInfo.userInfo.img" :src="userInfo.userInfo.img" />
<div>
  <div v-if="this.userInfo.userInfo.email === this.$store.state.username">
    <i @click="toggleDropZone" class="far fa-plus-square dropzone-icon"></i>
  </div>
</div>

<div v-if="dropzoneOptions" class="dropZone dropZoneDisabled">
  <vue2-dropzone
     ref="imgDropZone"
     id="customdropzone"
     :options="dropzoneOptions"
     @vdropzone-complete="afterComplete"
     />
</div>
```



### script

- 사용자가 일치하지 않으면 매서드를 실행하지 않는다. 
- 드롭존 div의 `img` 태그를 찾는다. 
- 파일명 중복을 방지하기 위해 uuid로 이미지명을 설정한다. 
- 스토리지로 파일을 저장한다. 
- url을 뽑아내고 이를 활용 및 백앤드에 전송한다.

```javascript
import firebase from "firebase";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

components: {
  vue2Dropzone,
}

methods: {
  toggleDropZone() {
      if (this.userInfo.userInfo.email === this.$store.state.username) {
        const dropZone = document.querySelector(".dropZone");
        dropZone.classList.toggle("dropZoneDisabled");
        this.openDropZone = !this.openDropZone;
      } else console.log(false);
    },
    async afterComplete(upload) {
      // 파일과 관련된 메타데이터, blob를 설정하고 스토리지로 전송
      let imageName = uuid.v1();
      const div = document.querySelector(".picture");
      const imgField = div.querySelector("img");
      this.isLoading = true;
      try {
        let file = upload;
        const metaData = {
          contentType: "image/png",
        };
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`images/${imageName}.png`);
        await imageRef.put(file, metaData);
        // 이미지 url 추출 후 해당 파일로 프로필 변경
        const downloadURL = await imageRef.getDownloadURL();
        this.images = downloadURL;
        imgField.src = this.images;
        // 백앤드에 이미지 수정 요청
        changeImg(downloadURL, this.id_token)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
      this.$refs.imgDropZone.removeFile(upload);
    }
}
```
