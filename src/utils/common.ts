import { useEffect } from "react";

// return yyyy mm dd
export const getFormatDate = (date) => {
  const year = date.getFullYear(); //yyyy
  let month = 1 + date.getMonth(); //M
  month = month >= 10 ? month : "0" + month; //month 두자리로 저장
  let day = date.getDate(); //d
  day = day >= 10 ? day : "0" + day; //day 두자리로 저장
  return year + "." + month + "." + day; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
};
// get base64 url
export const getBase64 = (fileObj) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileObj);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  });
};
// 이메일 정규식
export const emailReg =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
export const emailRegExp = (data, property, stateHandler, validation) => {
  console.log(data, property);
  stateHandler(data);
  if (emailReg.test(data[property]) == false) {
    validation("올바른 형식의 이메일 주소가 아닙니다.");
    return false;
  } else {
    validation("");
    return true;
  }
};
// 비밀번호 정규식
export const passwordReg = /^.*(?=.)(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
export const passwordRegExp = (data, property, stateHandler, validation) => {
  stateHandler(data);
  if (passwordReg.test(data[property]) == false) {
    validation("비밀번호가 올바르지 않습니다.");
    return false;
  } else {
    validation("");
    return true;
  }
};
// 전화번호 정규식
export const phoneReg = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
export const phoneRegExp = (data, property, stateHandler, validation) => {
  stateHandler(data);
  if (phoneReg.test(data[property]) == false) {
    validation("올바른 번호의 형식이 아닙니다.");
    return false;
  } else {
    validation("");
    return true;
  }
};
// 홈페이지 정규식

export const homePageReg = new RegExp(
  "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
  "i"
);
export const homePageRegExp = (data, property, stateHandler, validation) => {
  stateHandler(data);
  if (homePageReg.test(data[property]) == false) {
    validation("올바른 주소가 아닙니다.");
    return false;
  } else {
    validation("");
    return true;
  }
};
// 사업자번호 정규식
export const checkCorporateRegistrationNumber = (value) => {
  const valueMap = value
    .replace(/-/gi, "")
    .split("")
    .map((item) => {
      return parseInt(item, 10);
    });
  if (valueMap.length == 10) {
    const multiply = [1, 3, 7, 1, 3, 7, 1, 3, 5];
    let checkSum = 0;
    for (let i = 0; i < multiply.length; ++i) {
      checkSum += multiply[i] * valueMap[i];
    }
    checkSum += parseInt(String((multiply[8] * valueMap[8]) / 10), 10);
    return Math.floor(valueMap[9]) === (10 - (checkSum % 10)) % 10;
  }
  return false;
};
export const registerNumberRegExp = (
  data,
  property,
  stateHandler,
  validation
) => {
  const numberReg = /^[0-9-]{2,20}[0-9]$/;
  stateHandler(data);
  if (numberReg.test(data[property]) == false) {
    validation("올바른 번호의 형식이 아닙니다.");
    return false;
  } else {
    if (!checkCorporateRegistrationNumber(data[property].replaceAll("-", ""))) {
      validation("올바른 번호의 형식이 아닙니다.");
      return false;
    } else {
      validation("");
      return true;
    }
  }
};
export const convertURLtoFile = async (url: string) => {
  if (url != null) {
    const response = await fetch(url + "?not-from-cache-please");
    const data = await response.blob();
    const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
    const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
    const metadata = { type: `image/${ext}` };
    return new File([data], filename!, metadata);
  }
};
// 윈도우 스크롤 바닥 감지 함수
let isLastPage = false;
// 엘리먼트 스크롤 바닥 감지 함수
export const elementScrollDetect = (element, stateHandler, getList) => {
  const { target } = element;
  if (
    target.clientHeight + Math.ceil(target.scrollTop) >= target.scrollHeight &&
    isLastPage == false
  ) {
    console.log("t스크롤바닥감지됬따");
    stateHandler((prev) => {
      getList(prev + 1, "").then((result) => {
        console.log("result", result);
        if (result.length == 0) {
          isLastPage = true;
        } else {
          isLastPage = false;
        }
      });
      return prev + 1;
    });
  }
};
export const preloadImg = (images) => {
  images.map((image) => {
    const img = new Image();
    img.src = image;
  });
};
