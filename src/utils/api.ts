const apiUrl = {
  signIn: "/adm/v1/users/login", // 로그인
  project: "/adm/v1/projects", // 프로젝트 리스트 조회, 생성, 수정
  team: "/adm/v1/teams", // 팀 리스트 조회, 수정
  products: "/adm/v1/products", // 상품 조회, 리스트
  createInquiries: "/adm/v1/inquiries", // 문의 생성
  versions: "/adm/v1/versions", // 버전리스트
  countries: "/adm/v1/countries", // 귝가리스트
  industries: "/adm/v1/industries", // 산업리스트
  embeddingTypes: "/adm/v1/products/embedding-types", // 임베딩 타입
  channelTypes: "/adm/v1/products/channel-types", // 채널리스트
  scales: "/adm/v1/products/scales", // 코드크기 조회
  alphas: "/adm/v1/products/alphas", // 적용세기 조회
};
export default apiUrl;
