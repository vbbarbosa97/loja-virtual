import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from "./categories.action";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";
import { DocumentData } from "firebase/firestore";

export function* fetchCategoriesAsync() {
  try {
    // para aguardar a chamada utilizar o call
    const categoriesArray: DocumentData[] = yield call(
      getCategoriesAndDocuments
    );

    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  // o all() informa para aguardar a execução de tudo ate o final
  yield all([call(onFetchCategories)]);
}

// fork(), realiza uma operação não bloqueante com a função passada
// take(), pausa as operações até receber uma redux action
// race(), executa Effects simultaneamente, e cancela todos quando um efeito retorna seu resultado
// call(), executa uma função. Se essa função retornar uma Promise, ele irá pausar a Saga até a Promise ser resolvida
// put(), despacha uma redux action
// select(), executa uma função seletora que irá buscar dados do estado global do Redux
// takeLatest(), irá executar as operações recebidas, porém, irá retornar apenas o valor da última. Se a mesma operação for enviada mais de uma vez, elas serão ignoradas, exceto a última (ex: click -> loadUser, usuário clica 4 vezes no botão (ele é legal né, quer testar sua app), apenas a função enviada no último click será executada/retornado o valor, as outras serão ignoradas)
// takeEvery(), irá retornar os valores de todas as operações recebidas
