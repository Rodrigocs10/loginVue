import HTTPStatus from "http-status";

function tratarValidacaoServidor(errorResponse, bag) {
  if (errorResponse.response.status == HTTPStatus.BAD_REQUEST) {
    errorResponse.response.data.errors
      .map(obj => ({ field: obj.fieldName, msg: obj.message }))
      .forEach(element => {
        bag.add(element);
      });
  }
}
// Só para desativar warning, caso tenha algum a função para export default substituir o null por ela
export default tratarValidacaoServidor;
