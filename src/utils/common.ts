export const getFormatDate = (date) => {
  const year = date.getFullYear(); //yyyy
  let month = 1 + date.getMonth(); //M
  month = month >= 10 ? month : "0" + month; //month 두자리로 저장
  let day = date.getDate(); //d
  day = day >= 10 ? day : "0" + day; //day 두자리로 저장
  return year + "." + month + "." + day; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
};
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
