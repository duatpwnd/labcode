import { createStore, applyMiddleware } from "redux";
//createStore는 Store를 만들어주는 역할을 해준다. applyMiddleware는 redux에 middleware를 추가해주는 역할을 해준다.
import { composeWithDevTools } from "redux-devtools-extension"; // reudx 액션, 디스패치 같은 상태를 확인할 수 있는 역할
import createSagaMiddleware from "redux-saga"; // saga를 쓰기 위해 불러줌
import rootReducer from "src/reducers";
import rootSaga from "src/sagas";

const sagaMiddleware = createSagaMiddleware(); // saga 미들웨어를 생성합니다.

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga); // saga 실행

export default store;
