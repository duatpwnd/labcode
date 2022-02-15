const apiUrl = {
  signIn: "/adm/v1/users/login", // 로그인
  project: "/adm/v1/projects", // 프로젝트 리스트 조회, 생성, 수정
  team: "/adm/v1/teams", // 팀 리스트 조회, 수정
  products: "/adm/v1/products", // 제품 생성, 수정, 조회
  createInquiries: "/adm/v1/inquiries", // 문의 생성
  versions: "/adm/v1/versions", // 버전리스트
  countries: "/adm/v1/countries", // 귝가리스트
  industries: "/adm/v1/industries", // 산업리스트
  embeddingTypes: "/adm/v1/products/embedding-types", // 임베딩 타입
  channelTypes: "/adm/v1/products/channel-types", // 채널리스트
  scales: "/adm/v1/products/scales", // 코드크기 조회
  alphas: "/adm/v1/products/alphas", // 적용세기 조회
  categories: "/adm/v1/categories", // 대분류 & 소분류 리스트 조회 & 생성
  mainCategories: "/adm/v1/main-categories", // 대분류 조회
  subCategories: "/adm/v1/sub-categories", // 소분류 생성
  productInfos: "/adm/v1/product-infos", // 제품정보 조회, 수정, 삭제
  productInfosGroups: "/adm/v1/product-info-groups", // 제품정보 그룹조회
};
export default apiUrl;
