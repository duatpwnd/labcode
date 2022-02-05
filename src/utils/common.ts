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
  stateHandler(data);
  if (emailReg.test(data[property]) == false) {
    validation("올바른 형식의 이메일 주소가 아닙니다.");
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
export const homePageReg = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/;
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
// 숫자만 정규식
export const numberReg = /^[0-9-]{2,20}[0-9]$/;
export const numberRegExp = (data, property, stateHandler, validation) => {
  stateHandler(data);
  if (numberReg.test(data[property]) == false) {
    validation("올바른 번호의 형식이 아닙니다.");
    return false;
  } else {
    validation("");
    return true;
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
